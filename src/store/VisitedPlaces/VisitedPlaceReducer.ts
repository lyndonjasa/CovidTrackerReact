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
      case actions.REMOVE_PLACE_REQUEST:
        return { ...state, loading: true }
      case actions.REMOVE_PLACE:
        return {
          ...state,
          loading: false,
          places: state.places.filter(i => i.id !== action.payload.placeId)
        }
      case actions.UPDATE_PLACE_REQUEST:
        return { ...state, loading: true }
      case actions.UPDATE_PLACE:
        return {
          ...state,
          loading: false,
          places: state.places.map(i => i.id === action.payload.place.id ?
            {
              ...i,
              name: action.payload.place.name,
              date: action.payload.place.date,
              hours: action.payload.place.hours,
              isExposed: action.payload.place.isExposed
            } : { ...i }
          )
        }
      case actions.RESET_DATA_REQUEST:
        return { ...state, loading: true }
      case actions.RESET_DATA:
        return { ...state, loading: false, places: [] }
    default:
      return state;
  }
}

export default reducer;