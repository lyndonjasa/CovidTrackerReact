import { useDispatch, useSelector } from "react-redux";
import { DateRange } from '../store/DateRange/DateRange';
import * as actions from '../store/DateRange/DateRangeActions';

const useDateRange = () => {
  const currentDateRange = useSelector<any>(
    (state) => state.dateRangeReducer.dateRange
  ) as DateRange;

  const dispatch = useDispatch();

  const lastSevenDays = () => {
    dispatch(actions.setToLastSevenDays());
  }

  const today = () => {
    dispatch(actions.setToToday())
  }
  
  const lastTwoWeeks = () => {
    dispatch(actions.setToTwoWeeks())
  }

  const month = (date: Date) => {
    dispatch(actions.setToMonth(date));
  }

  const year = (date: Date) => {
    dispatch(actions.setToYear(date));
  }

  const customDate = (date: Date) => {
    dispatch(actions.setCustomDate(date));
  }

  return {
    currentDateRange,
    lastSevenDays,
    today,
    lastTwoWeeks,
    month,
    year,
    customDate
  };
}

export default useDateRange;