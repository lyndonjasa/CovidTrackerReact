import { CustomAction } from './CustomAction';
import { DateRangeState, initialState } from './DateRangeState';
import { Reducer } from "redux";
import { UPDATE_RANGE } from './ActionTypes';

const reducer: Reducer<DateRangeState, CustomAction> = (
  state: DateRangeState = initialState,
  action: CustomAction
) => {
  switch(action.type) {
    case UPDATE_RANGE:
      return { ...state, dateRange: action.payload.dateRange };
    default: 
      return state;
  }
}

export default reducer;