import { UPDATE_RANGE } from './ActionTypes';
import { CustomAction } from './CustomAction';
import { DateRange } from './DateRange';
import { initialState } from './DateRangeState';
import moment from "moment";
import { TODAY } from '../../shared/date-range';

export function setToLastSevenDays(): CustomAction {
  return {
    payload: initialState,
    type: UPDATE_RANGE
  };
}

export function setToToday(): CustomAction {
  const dateRange: DateRange = {
    startDate: moment().startOf('day').toDate(),
    endDate: moment().endOf('day').toDate(),
    icon: 'T',
    range: TODAY,
    display: moment().format('MM/DD/yyyy')
  };

  return {
    payload: {
      dateRange
    },
    type: UPDATE_RANGE
  };
}