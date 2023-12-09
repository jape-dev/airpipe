import { useState } from "react";
import { ResponsiveContainer } from "recharts";

export interface ChartSelectorProps {
  chartOption: string;
  setChartOption: React.Dispatch<React.SetStateAction<string>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ChartSelector: React.FC<ChartSelectorProps> = ({
  chartOption,
  setChartOption,
  isOpen,
  setIsOpen,
}) => {
  const options = [
    "area",
    "bar",
    "line",
    "composed",
    "scatter",
    "pie",
    "radar",
    "radialBar",
    "treemap",
    "funnel",
  ];

  const handleOptionClick = (option: string) => {
    setChartOption(option);
    setIsOpen(false);
  };

  return (
    <>
      <button
        className="bg-teal-500 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-xl mr-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {chartOption || "Select chart"}
      </button>
      {isOpen && (
        <ResponsiveContainer width="100%" height={325}>
          <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {options.map((option) => (
                <button
                  key={option}
                  className={`block px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left ${
                    chartOption === option ? "bg-teal-500 text-white" : ""
                  }`}
                  role="menuitem"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </ResponsiveContainer>
      )}
    </>
  );
};
