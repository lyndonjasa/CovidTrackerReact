import { DateRange } from './DateRange';
import { Action } from "redux";

export interface CustomAction extends Action {
  payload: {
    dateRange: DateRange;
  };
}