import { Dialog, DialogTitle, makeStyles } from "@material-ui/core";
import React from "react";
import useDateRange from "../../../hooks/useDateRange";
import DateRangeButton from "./DateRangeButton";
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
  const { lastSevenDays, today, currentDateRange } = useDateRange();
  const classes = useStyles();

  const buttons: DateButtons[] = [
    {
      icon: '7',
      text: 'Last 7 Days',
      handleClick: () => {
        lastSevenDays();
        handleCloseDialog();
      },
      selected: currentDateRange.icon === '7'
    },
    {
      icon: '&infin;',
      text: 'All Time',
      handleClick: () => {},
      selected: currentDateRange.icon === '&infin;'
    },
    {
      icon: 'T',
      text: 'Today',
      handleClick: () => {
        today();
        handleCloseDialog();
      },
      selected: currentDateRange.icon === 'T'
    },
    {
      icon: 'M',
      text: 'Month',
      handleClick: () => {},
      selected: currentDateRange.icon === 'M'
    },
    {
      icon: 'Y',
      text: 'Year',
      handleClick: () => {},
      selected: currentDateRange.icon === 'Y'
    },
    {
      icon: 'S',
      text: 'Select Date',
      handleClick: () => {},
      selected: currentDateRange.icon === 'S'
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