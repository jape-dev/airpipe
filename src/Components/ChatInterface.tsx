import React, { useEffect, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import { DefaultService, Prompt, ChainResult } from "../vizoApi";
import { Chart } from "./ChartComponent";
import { ChartSelector } from "./ChartSelector";

export interface ChatInterfaceProps {
  tableName: string;
}

interface Message {
  isUserMessage: boolean;
  text: string;
  data?: any;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ tableName }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Ask a question about your data...",
      isUserMessage: false,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [chartOption, setChartOption] = useState<string>("");
  const [chartSelectOpen, setChartSelectOpen] = useState(false);

  const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue) {
      return;
    }
    setInputValue("");
    const prompt: Prompt = {
      prompt: inputValue,
      table: tableName,
    };
    setMessages([...messages, { text: inputValue, isUserMessage: true }]);
    DefaultService.askQuestionQueryAskQuestionPost(prompt)
      .then((result: ChainResult) => {
        console.log(result);
        setMessages([
          ...messages,
          {
            text: inputValue,
            isUserMessage: true,
          },
          {
            text: result.answer,
            data: result.json_result,
            isUserMessage: false,
          },
        ]);
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
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 overflow-y-auto">
        {messages.map((message, index) => (
          <>
            <div
              key={index}
              className={`flex ${
                message.isUserMessage ? "justify-end" : "justify-start"
              } mt-4`}
            >
              <div
                className={`bg-teal-500 rounded-lg p-2 max-w-md ${
                  message.isUserMessage
                    ? "bg-gray-500 text-white"
                    : "bg-teal-500 text-white"
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </div>

            {message.data && message.data.length > 0 && (
              <ChartSelector
                chartOption={chartOption}
                setChartOption={setChartOption}
                isOpen={chartSelectOpen}
                setIsOpen={setChartSelectOpen}
              />
            )}
            {chartOption && message.data && chartSelectOpen === false && (
              <div key={index} className="flex justify-start mt-4">
                <Chart data={message.data} chartType={chartOption} />
              </div>
            )}
          </>
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
