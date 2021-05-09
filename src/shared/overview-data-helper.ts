import { OverviewCovidDataModel } from './../models/OverviewCovidDataModel';
import { CovidDataModel } from './../models/CovidDataModel';
import moment from 'moment';
import * as ranges from './date-range';

export type divider = "day" | "week" | "month" | "year" | "twoWeeks";

export const getDivider = (range: string): divider => {
  switch (range) {
    case ranges.LAST_SEVEN_DAYS.range:
      return "week"
    case ranges.MONTH.range:
      return "month"
    case ranges.YEAR.range:
      return "year"
    case ranges.ALL_TIME.range:
      return "twoWeeks"
    default:
      return "day"
  }
} 

export const summarize = (data: CovidDataModel[], 
  divisionUnit: divider,
  baseDate: Date): OverviewCovidDataModel[] => {
  const overview: OverviewCovidDataModel[] = [];

  if (divisionUnit === "day") {
    const model: OverviewCovidDataModel = {
      date: moment(baseDate).format('MMM DD, yyyy'),
      exposed: data.filter(d => d.isExposed).length,
      notExposed: data.filter(d => !d.isExposed).length
    };

    overview.push(model);
  } else if (divisionUnit === "week") {
    // loop 7 to count one week
    for (let index = 0; index < 7; index++) {
      const dayStart = moment().subtract(index, "day").startOf('day').toDate();
      const dayEnd = moment().subtract(index, "day").endOf('day').toDate();

      const exposures = data.filter(d => new Date(d.date) >= dayStart && new Date(d.date) <= dayEnd);

      const exposure: OverviewCovidDataModel = {
        date: moment().subtract(index, "day").format('MMM DD'),
        exposed: exposures.filter(e => e.isExposed).length,
        notExposed: exposures.filter(e => !e.isExposed).length
      }

      overview.unshift(exposure);
    }
  } else if (divisionUnit === "month") {
    const daysInMonth = moment(baseDate).daysInMonth();
    const lastDayOfMonth = moment(baseDate).endOf('month');

    for (let index = 0; index < daysInMonth; index++) {
      const dayStart = moment(lastDayOfMonth).subtract(index, "day").startOf('day').toDate();
      const dayEnd = moment(lastDayOfMonth).subtract(index, "day").endOf('day').toDate();

      const exposures = data.filter(d => new Date(d.date) >= dayStart && new Date(d.date) <= dayEnd);

      const exposure: OverviewCovidDataModel = {
        date: moment(lastDayOfMonth).subtract(index, "day").format('DD'),
        exposed: exposures.filter(e => e.isExposed).length,
        notExposed: exposures.filter(e => !e.isExposed).length
      }

      overview.unshift(exposure);
    }
  } else if (divisionUnit === "year") {
    const lastDayOfYear = moment(baseDate).endOf('year');

    for (let index = 0; index < 12; index++) {
      const dayStart = moment(lastDayOfYear).subtract(index, "month").startOf('month').startOf('day').toDate();
      const dayEnd = moment(lastDayOfYear).subtract(index, "month").endOf('month').endOf('day').toDate();

      const exposures = data.filter(d => new Date(d.date) >= dayStart && new Date(d.date) <= dayEnd);

      const exposure: OverviewCovidDataModel = {
        date: moment(lastDayOfYear).subtract(index, "month").format('MMM'),
        exposed: exposures.filter(e => e.isExposed).length,
        notExposed: exposures.filter(e => !e.isExposed).length
      }

      overview.unshift(exposure);
      
    }
  } else {
    // 2 weeks = 14 days
    for (let index = 0; index < 14; index++) {
      const dayStart = moment().subtract(index, "day").startOf('day').toDate();
      const dayEnd = moment().subtract(index, "day").endOf('day').toDate();

      const exposures = data.filter(d => new Date(d.date) >= dayStart && new Date(d.date) <= dayEnd);

      const exposure: OverviewCovidDataModel = {
        date: moment().subtract(index, "day").format('MM/DD'),
        exposed: exposures.filter(e => e.isExposed).length,
        notExposed: exposures.filter(e => !e.isExposed).length
      }

      overview.unshift(exposure);
    }
  }

  return overview;
}