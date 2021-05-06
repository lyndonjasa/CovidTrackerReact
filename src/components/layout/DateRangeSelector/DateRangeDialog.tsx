import { Dialog, DialogTitle, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import useDateRange from "../../../hooks/useDateRange";
import DateRangeButton from "./DateRangeButton";
import * as ranges from '../../../shared/date-range';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { DatePickerView } from '@material-ui/pickers/DatePicker/DatePicker';
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

type Mode = 'Y' | 'M' | 'C';

const DateRangeDialog: React.FC<Props> = (props: Props) => {
  const { open, handleCloseDialog } = props;
  const { lastSevenDays, today, allTime, month, year, customDate, currentDateRange } = useDateRange();
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
      handleClick: () => {
        setViews(['year','month']);
        setMode('M');
        setOpenDatePicker(true);
      },
      selected: currentDateRange.icon === ranges.MONTH.icon
    },
    {
      icon: ranges.YEAR.icon,
      text: 'Year',
      handleClick: () => {
        setViews(['year']);
        setMode('Y')
        setOpenDatePicker(true);
      },
      selected: currentDateRange.icon === ranges.YEAR.icon
    },
    {
      icon: ranges.CUSTOM_DATE.icon,
      text: 'Select Date',
      handleClick: () => {
        setViews(['year', 'month', 'date']);
        setMode('C');
        setOpenDatePicker(true);
      },
      selected: currentDateRange.icon === ranges.CUSTOM_DATE.icon
    }
  ];

  const [date, setDate] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [views, setViews] = useState<DatePickerView[]>(['year', 'month', 'date']);
  const [mode, setMode] = useState<Mode>('C');

  const handleDateChange = (date: any) => {
    setDate(date);
    setOpenDatePicker(false);

    switch(mode) {
      case 'C':
        customDate(date);
        break;
      case 'M':
        month(date);
        break;
      default:
        year(date);
        break;
    }

    handleCloseDialog();
  }
  
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
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker 
          open={openDatePicker} 
          value={date}
          views={views}
          onChange={handleDateChange}
          onClose={() => setOpenDatePicker(false)}
          TextFieldComponent={() => null}>
        </DatePicker>
      </MuiPickersUtilsProvider>
    </>
  );
}

export default DateRangeDialog;