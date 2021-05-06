import { DateRangeState } from './../store/DateRange/DateRangeState';
import { useDispatch, useSelector } from "react-redux";
import { DateRange } from '../store/DateRange/DateRange';
import * as actions from '../store/DateRange/DateRangeActions';

const useDateRange = () => {
  const currentDateRange = useSelector<DateRangeState>(
    (state) => state.dateRange
  ) as DateRange;

  const dispatch = useDispatch();

  const lastSevenDays = () => {
    dispatch(actions.setToLastSevenDays());
  }

  const today = () => {
    dispatch(actions.setToToday())
  }
  
  const allTime = () => {
    dispatch(actions.setToAllTime())
  }

  return {
    currentDateRange,
    lastSevenDays,
    today,
    allTime
  };
}

export default useDateRange;