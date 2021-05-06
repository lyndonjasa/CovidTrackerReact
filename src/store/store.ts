import { createStore } from 'redux';
import DateRangeReducer from './DateRange/DateRangeReducer';

export default function configureState() {
  return createStore(DateRangeReducer);
}