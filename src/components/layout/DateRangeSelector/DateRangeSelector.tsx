import moment from "moment";
import React, { useState } from "react";
import DateRangeDialog from "./DateRangeDialog";
import './DateSelector.scss';

const DateRangeSelector = () => {
  const currentDate = moment().format('MM/DD/yyyy');
  const [open, setOpen] = useState(false);
  const handleCloseDialog = () => {
    setOpen(false);
  }

  return (
    <>
      <div className="date-selector-container" onClick={() => setOpen(true)}>
        <div className="date-selector-icon-container">&infin;</div>
        <div className="date-selector-value">{currentDate}</div>
      </div>
      <DateRangeDialog open={open} handleCloseDialog={handleCloseDialog}></DateRangeDialog>
    </>
  );
}

export default DateRangeSelector;