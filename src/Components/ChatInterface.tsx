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
  text: string;
  data?: any;
  columns?: string[];
  loading?: boolean;
  dataSource?: any;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  dataSources,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Ask a question about your data...",
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
      { text: "Loading...", isUserMessage: false, loading: true },
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
      console.log("response", response);
      if (typeof response === "object" && response !== null) {
        setAmbiguities(response);
        setMessages([
          ...messages,
          {
            text: response.statement,
            isUserMessage: false,
          },
        ]);
      } else {
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
                console.log(result.results);
                setMessages([
                  ...messages,
                  {
                    text: inputValue,
                    isUserMessage: true,
                  },
                  {
                    text: "text",
                    data: result.results,
                    columns: result.columns,
                    isUserMessage: false,
                    dataSource: dataSources[0].table_name,
                  },
                ]);
              })
              .catch((err) => {
                console.log(err);
                setMessages([
                  ...messages,
                  { text: inputValue, isUserMessage: true },
                  {
                    text: "I'm sorry, I don't understand. Please try again.",
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
