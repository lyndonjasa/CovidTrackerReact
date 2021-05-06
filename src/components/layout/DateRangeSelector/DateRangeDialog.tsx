import { Dialog, DialogTitle, makeStyles } from "@material-ui/core";
import React from "react";
import DateRangeButton from "./DateRangeButton";
import './DateRangeDialog.scss';

type Props = {
  open: boolean;
  handleCloseDialog: () => void;
};

type DateButtons = {
  icon: string;
  text: string;
};

const useStyles = makeStyles({
  center: {
    textAlign: 'center'
  }  
});

const DateRangeDialog: React.FC<Props> = (props: Props) => {
  const { open, handleCloseDialog } = props;
  const classes = useStyles();

  const buttons: DateButtons[] = [
    {
      icon: '7',
      text: 'Last 7 Days'
    },
    {
      icon: '&infin;',
      text: 'All Time'
    },
    {
      icon: 'T',
      text: 'Today'
    },
    {
      icon: 'M',
      text: 'Month'
    },
    {
      icon: 'Y',
      text: 'Year'
    },
    {
      icon: 'S',
      text: 'Select Date'
    }
  ];
  
  return (
    <>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle className={classes.center}>Select Date Range</DialogTitle>
        <div className="date-range-dialog-buttons">
          {
            buttons.map(b => 
              <DateRangeButton icon={b.icon} text={b.text} selected={false} key={b.icon}></DateRangeButton>
            )
          }
        </div>
      </Dialog>
    </>
  );
}

export default DateRangeDialog;