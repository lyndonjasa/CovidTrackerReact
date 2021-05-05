import React from "react";
import './DateSelector.scss';

const DateSelector = () => {
  const currentDate = new Date();

  return (
    <div className="date-selector-container">
      {currentDate.toLocaleDateString()}
    </div>
  );
}

export default DateSelector;