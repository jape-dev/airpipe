import React, { useEffect, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import {
  DefaultService,
  DataSourceInDB,
  AmbiguousColumns,
  BaseAmbiguities,
  Body_check_ambiguous_columns_query_check_ambiguous_columns_post,
  User,
  View,
  CurrentResults,
} from "../vizoApi";
import { ChatMessage } from "./Message";

import { QuestionsService, QuestionRequest, Response } from "../dataHeraldApi";

export interface ChatInterfaceProps {
  dataSources: DataSourceInDB[];
  currentUser?: User;
  userToken: string;
  connectionId?: string;
  showInput: boolean;
  setShowInput: React.Dispatch<React.SetStateAction<boolean>>;
  scanComplete?: boolean;
}

interface ChatMessage {
  isUserMessage: boolean;
  text?: string;
  data?: any;
  columns?: string[];
  loading?: boolean;
  tableName?: any;
  currentUser?: User;
  userToken?: string;
  dataSource?: DataSourceInDB;
  question?: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  dataSources,
  currentUser,
  userToken,
  connectionId,
  showInput,
  setShowInput,
  scanComplete,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [sql, setSql] = useState<string>();
  const [confidenceScore, setConfidenceScore] = useState<number>();

  useEffect(() => {
    if (scanComplete) {
      setMessages([
        {
          text: "Tuning complete. Ask a question about your data.",
          isUserMessage: false,
        },
      ]);
    } else {
      setMessages([
        {
          text: "Safely tuning model to your data. Please wait...",
          isUserMessage: false,
          loading: true,
        },
      ]);
    }
  }, [scanComplete]);

  // useEffect(() => {
  //   clearMessages();
  // }, [dataSources]);

  const clearMessages = () => {
    setSql(undefined);
    setConfidenceScore(undefined);
    setShowInput(true);
    setMessages([
      {
        text:
          dataSources[0].name === "tutorial_data"
            ? "Use the input box or click on the starter question below:"
            : "Ask a question about your data.",
        isUserMessage: false,
      },
    ]);
  };

  const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue) {
      return;
    }
    setShowInput(false);
    setInputValue("");
    setMessages([...messages, { text: inputValue, isUserMessage: true }]);
    setMessages([
      ...messages,
      { text: inputValue, isUserMessage: true },
      {
        text: "Working. Estimated time: 45 seconds.",
        isUserMessage: false,
        loading: true,
      },
    ]);
    if (connectionId) {
      const requestBody: QuestionRequest = {
        db_connection_id: connectionId,
        question: inputValue,
      };
      QuestionsService.answerQuestion(true, false, requestBody)
        .then((response: Response) => {
          setSql(response.sql_query);
          setConfidenceScore(response.confidence_score);
          if (response.sql_generation_status === "VALID") {
            setMessages([
              ...messages,
              {
                text: inputValue,
                isUserMessage: true,
              },
              {
                text: undefined,
                question: inputValue,
                data: response.sql_query_result?.rows,
                columns: [
                  ...new Set(
                    response.sql_query_result?.rows.flatMap((record) =>
                      Object.keys(record)
                    )
                  ),
                ],
                isUserMessage: false,
                tableName: dataSources[0].name,
                currentUser: currentUser,
                userToken: userToken,
                dataSource: dataSources[0],
              },
            ]);
            setShowInput(false);
          } else {
            setShowInput(true);
            setMessages([
              ...messages,
              {
                text: inputValue,
                isUserMessage: true,
              },
              {
                text: "Sorry, I was unable to answer this question. Please tweak your question and try again. Using specific column names from your selected table can help me improve the accuracy of the query.",
                isUserMessage: false,
              },
            ]);
          }
        })
        .catch((error: Error) => {
          console.log(error);
          setShowInput(true);
          setMessages([
            ...messages,
            {
              text: inputValue,
              isUserMessage: true,
            },
            {
              text: "Sorry, I was unable to answer this question. Please tweak your question and try again. Using specific column names from your selected table can help me improve the accuracy of my query.",
              isUserMessage: false,
            },
          ]);
        });
    }
  };

  return (
    <div className="flex flex-col flex-grow">
      <div className="flex-1">
        {messages.map((message, index) => (
          <ChatMessage
            index={index}
            clearMessages={clearMessages}
            {...message}
            sql={sql}
            confidenceScore={confidenceScore}
          />
        ))}
      </div>
      {showInput === true && (
        <form className="flex mt-4 " onSubmit={handleInputSubmit}>
          <div className="flex-1 relative flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full bg-white border border-gray-400 shadow-md mt-0 py-2 px-4 rounded-md text-left cursor-pointer focus:outline-none h-full"
              placeholder="Ask a question here..."
            />
            <button
              type="submit"
              className="absolute mt-0 top-0 right-0 rounded-l h-full px-3"
              disabled={!inputValue}
            >
              <PaperAirplaneIcon className="h-6 w-6 text-gray-700 hover:text-teal-500" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
