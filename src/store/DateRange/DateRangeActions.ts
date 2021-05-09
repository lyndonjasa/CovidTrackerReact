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

export function setToTwoWeeks(): CustomAction {
  const dateRange: DateRange = {
    startDate: moment().subtract(13, 'days').startOf('day').toDate(),
    endDate: moment().endOf('day').toDate(),
    icon: ranges.ALL_TIME.icon,
    range: ranges.ALL_TIME.range,
    display: moment().subtract(13, 'days').startOf('day').format('MM/DD/yyyy') + ' - ' + moment().endOf('day').format('MM/DD/yyyy')
  };

  return {
    payload: {
      dateRange
    },
    type: UPDATE_RANGE
  };
}

export function setToMonth(date: Date): CustomAction {
  const dateRange: DateRange = {
    startDate: moment(date).startOf('month').startOf('day').toDate(),
    endDate: moment(date).endOf('month').endOf('day').toDate(),
    icon: ranges.MONTH.icon,
    range: ranges.MONTH.range,
    display: moment(date).format('MMMM yyyy')
  };

  return {
    payload: {
      dateRange
    },
    type: UPDATE_RANGE
  };
}

export function setToYear(date: Date): CustomAction {
  const dateRange: DateRange = {
    startDate: moment(date).startOf('year').startOf('day').toDate(),
    endDate: moment(date).endOf('year').endOf('day').toDate(),
    icon: ranges.YEAR.icon,
    range: ranges.YEAR.range,
    display: moment(date).format('yyyy')
  };

  return {
    payload: {
      dateRange
    },
    type: UPDATE_RANGE
  };
}

export function setCustomDate(date: Date): CustomAction {
  const dateRange: DateRange = {
    startDate: moment(date).startOf('day').toDate(),
    endDate: moment(date).endOf('day').toDate(),
    icon: ranges.CUSTOM_DATE.icon,
    range: ranges.CUSTOM_DATE.range,
    display: moment(date).format('MMMM DD yyyy')
  };

  return {
    payload: {
      dateRange
    },
    type: UPDATE_RANGE
  };
}