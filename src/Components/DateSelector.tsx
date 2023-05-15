import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateSelectorProps {
  startDate: Date;
  endDate: Date;
  handleStartDateClick: (date: Date) => void;
  handleEndDateClick: (date: Date) => void;
}

export const DateSelector: React.FC<DateSelectorProps> = ({
  startDate,
  endDate,
  handleStartDateClick,
  handleEndDateClick,
}) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <span style={{ marginRight: "20px" }}>Select date range:</span>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <DatePicker selected={startDate} onChange={handleStartDateClick} />
        <div style={{ width: "30px" }}></div>
        <DatePicker selected={endDate} onChange={handleEndDateClick} />
      </div>
    </div>
  );
};
