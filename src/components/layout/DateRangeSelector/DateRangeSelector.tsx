import React, { useState } from "react";
import useDateRange from "../../../hooks/useDateRange";
import DateRangeDialog from "./DateRangeDialog";
import './DateSelector.scss';

const DateRangeSelector = () => {
  const { currentDateRange } = useDateRange();
  const { display, icon } = currentDateRange;
  const [open, setOpen] = useState(false);
  const handleCloseDialog = () => {
    setOpen(false);
  }

  return (
    <>
      <div className="date-selector-container" onClick={() => setOpen(true)}>
        <div className="date-selector-icon-container" dangerouslySetInnerHTML={{ __html: icon }}></div>
        <div className="date-selector-value">{display}</div>
      </div>
      <DateRangeDialog open={open} handleCloseDialog={handleCloseDialog}></DateRangeDialog>
    </>
  );
}

export default DateRangeSelector;