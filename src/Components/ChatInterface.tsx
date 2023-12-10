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
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  dataSources,
  currentUser,
  userToken,
  connectionId,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [ambiguities, setAmbiguities] = useState<
    AmbiguousColumns | BaseAmbiguities | undefined
  >(undefined);
  const [sql, setSql] = useState<string>();
  const [confidenceScore, setConfidenceScore] = useState<number>();
  const [showInput, setShowInput] = useState<boolean>(true);

  useEffect(() => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        text:
          dataSources[0].name === "tutorial_data"
            ? "Use the input box or click on the starter question below:"
            : "Ask a question about your data.",
        isUserMessage: false,
      },
    ]);

    if (dataSources[0].name === "tutorial_data") {
      sleep(1000).then(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "Find all the dates and cost per conversion where the cost per conversion was higher for google than facebook",
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

  useEffect(() => {
    if (sql !== undefined) {
      setShowInput(false);
    }
  }, [sql]);

  const clearMessages = () => {
    setSql(undefined);
    setConfidenceScore(undefined);
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

  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const buttonClick = (buttonText: string) => {
    setInputValue(buttonText);
  };

  const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue) {
      return;
    }
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
          setMessages([
            ...messages,
            {
              text: inputValue,
              isUserMessage: true,
            },
            {
              text: undefined,
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
        })
        .catch((error: Error) => {
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

    // sleep(1000).then(() => {
    //   setMessages((prevMessages) => [
    //     ...prevMessages,
    //     {
    //       text: "Checking for ambiguities...",
    //       isUserMessage: false,
    //       loading: true,
    //     },
    //   ]);
    // });

    // let ambiguitiesBody: Body_check_ambiguous_columns_query_check_ambiguous_columns_post =
    //   {
    //     data_sources: dataSources,
    //     ambiguities: ambiguities,
    //   };

    // DefaultService.checkAmbiguousColumnsQueryCheckAmbiguousColumnsPost(
    //   inputValue,
    //   ambiguitiesBody
    // ).then((response: AmbiguousColumns | BaseAmbiguities | string) => {
    //   if (typeof response === "object" && response !== null) {
    //     setAmbiguities(response);
    //     setMessages([
    //       ...messages,
    //       {
    //         text: inputValue,
    //         isUserMessage: true,
    //       },
    //     ]);
    //     setMessages([
    //       ...messages,
    //       {
    //         text: response.statement,
    //         isUserMessage: false,
    //       },
    //     ]);
    //   } else {
    // setMessages([
    //   ...messages,
    //   { text: inputValue, isUserMessage: true },
    //   {
    //     text: "No ambiguities found. Working on the question. Can take 45 seconds...",
    //     isUserMessage: false,
    //     loading: true,
    //   },
    // ]);
    //     if (connectionId) {
    //       const requestBody: QuestionRequest = {
    //         db_connection_id: connectionId,
    //         question: response,
    //       };
    //       QuestionsService.answerQuestion(true, false, requestBody)
    //         .then((response: Response) => {
    //           setSql(response.sql_query);
    //           setConfidenceScore(response.confidence_score);
    //           setMessages([
    //             ...messages,
    //             {
    //               text: inputValue,
    //               isUserMessage: true,
    //             },
    //             {
    //               text: undefined,
    //               data: response.sql_query_result?.rows,
    //               columns: [
    //                 ...new Set(
    //                   response.sql_query_result?.rows.flatMap((record) =>
    //                     Object.keys(record)
    //                   )
    //                 ),
    //               ],
    //               isUserMessage: false,
    //               tableName: dataSources[0].name,
    //               currentUser: currentUser,
    //               userToken: userToken,
    //               dataSource: dataSources[0],
    //             },
    //           ]);
    //         })
    //         .catch((error: Error) => {
    //           setShowInput(true);
    //           setMessages([
    //             ...messages,
    //             {
    //               text: inputValue,
    //               isUserMessage: true,
    //             },
    //             {
    //               text: "Sorry, I was unable to answer this question. Please tweak your question and try again. Using specific column names from your selected table can help me improve the accuracy of my query.",
    //               isUserMessage: false,
    //             },
    //           ]);
    //         });
    //     }
    //   }
    // });
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
      {showInput && (
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
              className="absolute mt-0 top-0 right-0 rounded-l h-full min-h-20 px-3"
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
