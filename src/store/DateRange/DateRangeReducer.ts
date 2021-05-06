import { DateRangeState, initialState } from './DateRangeState';
import { Reducer, Action } from "redux";

const reducer: Reducer<DateRangeState, Action> = (
  state: DateRangeState = initialState,
  action: Action
) => {
  switch(action.type) {
    default: 
      return state;
  }
}

export default reducer;