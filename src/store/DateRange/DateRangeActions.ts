import { UPDATE_RANGE } from './ActionTypes';
import { CustomAction } from './CustomAction';
import { DateRange } from './DateRange';
import { initialState } from './DateRangeState';
import moment from "moment";
import * as ranges from '../../shared/date-range';

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
    icon: ranges.TODAY.icon,
    range: ranges.TODAY.range,
    display: moment().format('MM/DD/yyyy')
  };

  return {
    payload: {
      dateRange
    },
    type: UPDATE_RANGE
  };
}

export function setToAllTime(): CustomAction {
  const dateRange: DateRange = {
    startDate: undefined,
    endDate: undefined,
    icon: ranges.ALL_TIME.icon,
    range: ranges.ALL_TIME.range,
    display: 'All Time'
  };

  return {
    payload: {
      dateRange
    },
    type: UPDATE_RANGE
  };
}