import React, { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import {
  DefaultService,
  DataSourceInDB,
  QueryResults,
  AmbiguousColumns,
  BaseAmbiguities,
  Body_check_ambiguous_columns_query_check_ambiguous_columns_post,
} from "../vizoApi";
import { Message } from "./Message";

export interface ChatInterfaceProps {
  dataSources: DataSourceInDB[];
}

interface Message {
  isUserMessage: boolean;
  text?: string;
  data?: any;
  columns?: string[];
  loading?: boolean;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  dataSources,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Ask a question about your data. Try to use specific column names to improve the accuracy of your query...",
      isUserMessage: false,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [ambiguities, setAmbiguities] = useState<
    AmbiguousColumns | BaseAmbiguities | undefined
  >(undefined);

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
            text: "No more ambiguities found. Creating SQL query...",
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
                  },
                  {
                    text: "Ask a new question...",
                    isUserMessage: false,
                  },
                ]);
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
          <Message index={index} {...message} />
        ))}
      </div>
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
    </div>
  );
};
