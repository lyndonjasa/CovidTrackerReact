import { CovidDataModel } from './../../models/CovidDataModel';
import { Dispatch, Action } from "redux";
import { deleteInteraction, getInteractions, saveInteraction } from "../../services/SocialInteractionService";
import * as actions from "./ActionTypes";
import { CustomAction } from "./CustomAction";
import { SocialInteractionPostRequest } from '../../services/messages/SocialInteractionPostRequest';
import moment from 'moment';

export function FetchInteraction() {
  return function (dispatch: Dispatch<Action>) {
    dispatch(FetchInteractionsRequest());
    getInteractions()
      .then(r => dispatch(FetchInteractions(r)))
  }
}

function FetchInteractionsRequest(): Action {
  return {
    type: actions.FETCH_INTERACTIONS_REQUEST
  };
}

function FetchInteractions(interactions: CovidDataModel[]): CustomAction {
  return {
    type: actions.FETCH_INTERACTIONS,
    payload: {
      interactions: interactions
    }
  }
}

export function PostInteraction(interaction: CovidDataModel) {
  const request: SocialInteractionPostRequest = {
    date: moment(interaction.date).startOf('day').toDate(),
    hours: interaction.hours,
    isSocialDistancing: !interaction.isExposed,
    name: interaction.name
  }

  return function (dispatch: Dispatch<Action>) {
    dispatch(PostInteractionRequest());
    saveInteraction(request)
      .then(r => dispatch(AddInteraction(r)));
  }
}

function PostInteractionRequest(): Action {
  return {
    type: actions.ADD_INTERACTIONS_REQUEST
  }
}

function AddInteraction(interaction: CovidDataModel): CustomAction {
  return {
    type: actions.ADD_INTERACTION,
    payload: {
      interaction: interaction
    }
  }
}

export function RemoveInteraction(id: string) {
  return function (dispatch: Dispatch<any>) {
    dispatch(DeleteInteractionRequest());
    deleteInteraction(id)
      .then(r => dispatch(DeleteInteraction(id)))
  }
}

function DeleteInteractionRequest(): Action {
  return {
    type: actions.REMOVE_INTERACTION_REQUEST
  }
}

function DeleteInteraction(id: string): CustomAction {
  return {
    type: actions.REMOVE_INTERACTION,
    payload: {
      interactionId: id
    }
  }
}