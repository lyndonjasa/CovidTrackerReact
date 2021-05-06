import { DateRange } from './DateRange';
import moment from "moment";
import { LAST_SEVEN_DAYS } from "../../shared/date-range";

export interface DateRangeState {
  dateRange: DateRange
}

export const initialState: DateRangeState = {
  dateRange: {
    endDate: moment().endOf('day').toDate(),
    startDate: moment().subtract(7, 'days').startOf('day').toDate(),
    range: LAST_SEVEN_DAYS.range,
    display: moment().subtract(7, 'days').startOf('day').format('MM/DD/yyyy') + ' - ' + moment().endOf('day').format('MM/DD/yyyy'),
    icon: LAST_SEVEN_DAYS.icon
  }
}