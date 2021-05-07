import { CovidDataModel } from './../../models/CovidDataModel';
import { Dispatch, Action } from "redux";
import { getInteractions } from "../../services/SocialInteractionService";
import * as actions from "./ActionTypes";
import { CustomAction } from "./CustomAction";

export function FetchInteraction() {
  return function (dispatch: Dispatch<Action>) {
    dispatch(FetchInteractionsRequest());
    getInteractions()
      .then(r => dispatch(FetchInteractions(r)))
  }
}

export function FetchInteractionsRequest(): Action {
  return {
    type: actions.FETCH_INTERACTIONS_REQUEST
  };
}

export function FetchInteractions(interactions: CovidDataModel[]): CustomAction {
  return {
    type: actions.FETCH_INTERACTIONS,
    payload: {
      interactions: interactions
    }
  }
}