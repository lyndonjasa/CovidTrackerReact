import { CustomAction } from './CustomAction';
import { Reducer } from "redux";
import { initialState, SocialInteractionState } from './SocialInteractionState';
import * as actions from './ActionTypes';

const reducer: Reducer<SocialInteractionState, CustomAction> = 
  (state: SocialInteractionState = initialState,
  action: CustomAction
) => {
  switch (action.type) {
    case actions.FETCH_INTERACTIONS_REQUEST:
      return {
        loading: true,
        interactions: []
      };
    case actions.FETCH_INTERACTIONS:
      return {
        loading: false,
        interactions: action.payload.interactions
      }
    case actions.ADD_INTERACTIONS_REQUEST:
      return { ...state, loading: true }
    case actions.ADD_INTERACTION:
      return {
        ...state,
        loading: false,
        interactions: [...state.interactions, action.payload.interaction]
      }
    default:
      return state;
  }
}

export default reducer;