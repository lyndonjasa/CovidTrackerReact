import { DateRangeState } from './../store/DateRange/DateRangeState';
import { useDispatch, useSelector } from "react-redux";
import { DateRange } from '../store/DateRange/DateRange';
import { setToLastSevenDays, setToToday } from '../store/DateRange/DateRangeActions';

const useDateRange = () => {
  const currentDateRange = useSelector<DateRangeState>(
    (state) => state.dateRange
  ) as DateRange;

  const dispatch = useDispatch();

  const lastSevenDays = () => {
    dispatch(setToLastSevenDays());
  }

  const today = () => {
    dispatch(setToToday())
  }

  return {
    currentDateRange,
    lastSevenDays,
    today
  };
}

export default useDateRange;