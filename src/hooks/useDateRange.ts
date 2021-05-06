import { DateRangeState } from './../store/DateRange/DateRangeState';
import { useSelector } from "react-redux";
import { DateRange } from '../store/DateRange/DateRange';

const useDateRange = () => {
  const currentDateRange = useSelector<DateRangeState>(
    (state) => state.dateRange
  ) as DateRange;

  return {
    currentDateRange
  };
}

export default useDateRange;