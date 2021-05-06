import { Dialog, DialogTitle, makeStyles } from "@material-ui/core";
import React from "react";
import useDateRange from "../../../hooks/useDateRange";
import DateRangeButton from "./DateRangeButton";
import * as ranges from '../../../shared/date-range';
import './DateRangeDialog.scss';

type Props = {
  open: boolean;
  handleCloseDialog: () => void;
};

type DateButtons = {
  icon: string;
  text: string;
  handleClick: () => void;
  selected: boolean;
};

const useStyles = makeStyles({
  center: {
    textAlign: 'center'
  }  
});

const DateRangeDialog: React.FC<Props> = (props: Props) => {
  const { open, handleCloseDialog } = props;
  const { lastSevenDays, today, allTime, currentDateRange } = useDateRange();
  const classes = useStyles();

  const buttons: DateButtons[] = [
    {
      icon: ranges.LAST_SEVEN_DAYS.icon,
      text: 'Last 7 Days',
      handleClick: () => {
        lastSevenDays();
        handleCloseDialog();
      },
      selected: currentDateRange.icon === ranges.LAST_SEVEN_DAYS.icon
    },
    {
      icon: ranges.ALL_TIME.icon,
      text: 'All Time',
      handleClick: () => {
        allTime();
        handleCloseDialog();
      },
      selected: currentDateRange.icon === ranges.ALL_TIME.icon
    },
    {
      icon: ranges.TODAY.icon,
      text: 'Today',
      handleClick: () => {
        today();
        handleCloseDialog();
      },
      selected: currentDateRange.icon === ranges.TODAY.icon
    },
    {
      icon: ranges.MONTH.icon,
      text: 'Month',
      handleClick: () => {},
      selected: currentDateRange.icon === ranges.MONTH.icon
    },
    {
      icon: ranges.YEAR.icon,
      text: 'Year',
      handleClick: () => {},
      selected: currentDateRange.icon === ranges.YEAR.icon
    },
    {
      icon: ranges.CUSTOM_DATE.icon,
      text: 'Select Date',
      handleClick: () => {},
      selected: currentDateRange.icon === ranges.CUSTOM_DATE.icon
    }
  ];
  
  return (
    <>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle className={classes.center}>Select Date Range</DialogTitle>
        <div className="date-range-dialog-buttons">
          {
            buttons.map(b => 
              <DateRangeButton 
                icon={b.icon} 
                text={b.text} 
                selected={b.selected}
                handleDateRangeClick={b.handleClick}
                key={b.icon}>
              </DateRangeButton>
            )
          }
        </div>
      </Dialog>
    </>
  );
}

export default DateRangeDialog;