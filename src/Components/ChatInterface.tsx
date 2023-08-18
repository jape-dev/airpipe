import React, { useEffect, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import {
  DefaultService,
  DataSourceInDB,
  QueryResults,
  AmbiguousColumns,
  BaseAmbiguities,
  Body_check_ambiguous_columns_query_check_ambiguous_columns_post,
  User,
  Message,
  Conversation,
} from "../vizoApi";
import { ChatMessage } from "./Message";

export interface ChatInterfaceProps {
  dataSources: DataSourceInDB[];
  currentUser?: User;
}

interface ChatMessage {
  isUserMessage: boolean;
  text?: string;
  data?: any;
  columns?: string[];
  loading?: boolean;
  tableName?: any;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  dataSources,
  currentUser,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [ambiguities, setAmbiguities] = useState<
    AmbiguousColumns | BaseAmbiguities | undefined
  >(undefined);
  const [results, setResults] = useState<Object[]>([]);

  useEffect(() => {
    // if the last message contains data attribute or last message text starts with "I'm sorry"
    if (
      messages.length > 0 &&
      (messages[messages.length - 1].data !== undefined ||
        messages[messages.length - 1].text?.startsWith("I'm sorry"))
    ) {
      commitMessages();
    }
  }, [messages]);

  useEffect(() => {
    const welcomeMessage =
      dataSources[0].name === "tutorial_data"
        ? "Welcome to Airpipe! Here you can ask questions about your data and let the AI do the hard work for you. Try to use specific column names from the table to improve the accuracy of your query..."
        : "Ask a question about your data. Try to use specific column names from the table to improve the accuracy of your query...";

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: welcomeMessage, isUserMessage: false },
    ]);

    if (dataSources[0].name === "tutorial_data") {
      sleep(1000).then(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "Use the input box below, or use one of our starter questions:",
            isUserMessage: false,
          },
        ]);
      });
      sleep(1000).then(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "Find all the dates where the cost per conversion was higher for google than facebook",
            isUserMessage: false,
            clickable: true,
            clickAction: buttonClick,
          },
          {
            text: "What date had the highest cost per click?",
            isUserMessage: false,
            clickable: true,
            clickAction: buttonClick,
          },
        ]);
      });
    }
  }, []);

  useEffect(() => {
    clearMessages();
  }, [dataSources]);

  const clearMessages = () => {
    setResults([]);
    setMessages([
      {
        text: "Ask a question about your data. Try to use specific column names from the table to improve the accuracy of your query...",
        isUserMessage: false,
      },
    ]);
  };

  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const buttonClick = (buttonText: string) => {
    setInputValue(buttonText);
  };

  const commitMessages = () => {
    const messagesDB: Message[] = [];
    messages.map((message) => {
      let m: Message = {
        text: message.text,
        is_user_message: message.isUserMessage,
        current_user: currentUser,
        data: message.data,
        columns: message.columns,
        table_name: message.tableName,
      };
      messagesDB.push(m);
    });
    let conversation: Conversation = {
      messages: messagesDB,
    };
    // DefaultService.saveQueryConversationSavePost(conversation).catch((e) => {
    //   console.log(e);
    // });
  };

  const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue) {
      return;
    }
    setInputValue("");
    setMessages([
      ...messages,
      { text: inputValue, isUserMessage: true },
      {
        text: "Checking for ambiguities...",
        isUserMessage: false,
        loading: true,
      },
    ]);

    let ambiguitiesBody: Body_check_ambiguous_columns_query_check_ambiguous_columns_post =
      {
        data_sources: dataSources,
        ambiguities: ambiguities,
      };

    DefaultService.checkAmbiguousColumnsQueryCheckAmbiguousColumnsPost(
      inputValue,
      ambiguitiesBody
    ).then((response: AmbiguousColumns | BaseAmbiguities | string) => {
      if (typeof response === "object" && response !== null) {
        setAmbiguities(response);
        setMessages([
          ...messages,
          {
            text: inputValue,
            isUserMessage: true,
          },
          {
            text: response.statement,
            isUserMessage: false,
          },
        ]);
      } else {
        setMessages([
          ...messages,
          { text: inputValue, isUserMessage: true },
          {
            text: "No ambiguities found. Working on the question. Can take 30 seconds...",
            isUserMessage: false,
            loading: true,
          },
        ]);
        // No more ambiguities.
        DefaultService.dinSqlQueryDinSqlPost(response, dataSources)
          .then((sql: string) => {
            if (messages[messages.length - 1].loading) {
              messages.pop();
            }
            setMessages([
              ...messages,
              {
                text: inputValue,
                isUserMessage: true,
              },
            ]);

            DefaultService.runQueryQueryRunQueryGet(sql)
              .then((result: QueryResults) => {
                setMessages([
                  ...messages,
                  {
                    text: inputValue,
                    isUserMessage: true,
                  },
                  {
                    text: undefined,
                    data: result.results,
                    columns: result.columns,
                    isUserMessage: false,
                    tableName: dataSources[0].name,
                  },
                ]);
                setResults(result.results);
              })
              .catch((err) => {
                setMessages([
                  ...messages,
                  { text: inputValue, isUserMessage: true },
                  {
                    text: "I'm sorry, I wasn't able to figure out how to answer this. Please tweak your question and try again.",
                    isUserMessage: false,
                  },
                ]);
              });
          })
          .catch((err) =>
            setMessages([
              ...messages,
              { text: inputValue, isUserMessage: true },
              {
                text: "I'm sorry, I don't understand. Please try again.",
                isUserMessage: false,
              },
            ])
          );
      }
    });
  };

  return (
    <div className="flex flex-col flex-grow">
      <div className="flex-1">
        {messages.map((message, index) => (
          <ChatMessage
            index={index}
            clearMessages={clearMessages}
            {...message}
          />
        ))}
      </div>
      {results.length === 0 && (
        <form className="flex mt-4 " onSubmit={handleInputSubmit}>
          <div className="flex-1 relative flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full bg-white border border-gray-400 shadow-md mt-0 py-2 px-4 rounded-md text-left cursor-pointer focus:outline-none h-full"
            />
            <button
              type="submit"
              className="absolute mt-0 top-0 right-0 rounded-l h-full min-h-20 px-3"
            >
              <PaperAirplaneIcon className="h-6 w-6 text-gray-700 hover:text-teal-500" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
