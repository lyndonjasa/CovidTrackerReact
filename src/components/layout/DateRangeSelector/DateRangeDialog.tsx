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
};

const useStyles = makeStyles({
  center: {
    textAlign: 'center'
  }  
});

const DateRangeDialog: React.FC<Props> = (props: Props) => {
  const { open, handleCloseDialog } = props;
  const { lastSevenDays, today } = useDateRange();
  const classes = useStyles();

  const buttons: DateButtons[] = [
    {
      icon: '7',
      text: 'Last 7 Days',
      handleClick: () => {
        lastSevenDays();
        handleCloseDialog();
      }
    },
    {
      icon: '&infin;',
      text: 'All Time',
      handleClick: () => {}
    },
    {
      icon: 'T',
      text: 'Today',
      handleClick: () => {
        today();
        handleCloseDialog();
      }
    },
    {
      icon: 'M',
      text: 'Month',
      handleClick: () => {}
    },
    {
      icon: 'Y',
      text: 'Year',
      handleClick: () => {}
    },
    {
      icon: 'S',
      text: 'Select Date',
      handleClick: () => {}
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
                selected={false}
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