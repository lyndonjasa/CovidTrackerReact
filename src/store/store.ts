import { createStore, combineReducers } from 'redux';
import DateRangeReducer from './DateRange/DateRangeReducer';

const reducers = combineReducers({ dateRangeReducer: DateRangeReducer });

export default function configureState() {
  return createStore(reducers);
}