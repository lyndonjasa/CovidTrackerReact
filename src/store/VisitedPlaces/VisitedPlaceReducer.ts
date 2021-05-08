import { Reducer } from 'redux';
import { CustomAction } from "./CustomAction";
import { initialState, VisitedPlaceState } from "./VisitedPlaceState";
import * as actions from './ActionTypes';

const reducer: Reducer<VisitedPlaceState, CustomAction> = 
  (state: VisitedPlaceState = initialState,
  action: CustomAction
) => {
  switch (action.type) {
    case actions.FETCH_PLACES_REQUEST:
      return {
        loading: true,
        places: []
      };
    case actions.FETCH_PLACES:
      return {
        loading: false,
        places: action.payload.places
      }
    case actions.ADD_PLACE_REQUEST:
      return { ...state, loading: true }
    case actions.ADD_PLACE:
      return {
        ...state,
        loading: false,
        places: [...state.places, action.payload.place]
      }
    default:
      return state;
  }
}

export default reducer;