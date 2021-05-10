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
    case actions.REMOVE_INTERACTION_REQUEST:
      return { ...state, loading: true }
    case actions.REMOVE_INTERACTION:
      return {
        ...state,
        loading: false,
        interactions: state.interactions.filter(i => i.id !== action.payload.interactionId)
      }
    case actions.UPDATE_INTERACTION_REQUEST:
      return { ...state, loading: true }
    case actions.UPDATE_INTERACTION:
      return {
        ...state,
        loading: false,
        interactions: state.interactions.map(i => i.id === action.payload.interaction.id ?
          {
            ...i,
            name: action.payload.interaction.name,
            date: action.payload.interaction.date,
            hours: action.payload.interaction.hours,
            isExposed: action.payload.interaction.isExposed
          } : { ...i }
        )
      }
    default:
      return state;
  }
}

export default reducer;