import { Dispatch, Action } from 'redux';
import { CovidDataModel } from '../../models/CovidDataModel';
import { getPlaces, savePlace } from "../../services/VisitedPlacesService";
import { CustomAction } from './CustomAction';
import * as actions from './ActionTypes';
import { VisitedPlacePostRequest } from '../../services/messages/VisitedPlacePostRequest';

export function FetchPlace() {
  return function (dispatch: Dispatch<Action>) {
    dispatch(FetchPlacesRequest());
    getPlaces()
      .then(r => dispatch(FetchPlaces(r)))
  }
}

function FetchPlacesRequest(): Action {
  return {
    type: actions.FETCH_PLACES_REQUEST
  };
}

function FetchPlaces(places: CovidDataModel[]): CustomAction {
  return {
    type: actions.FETCH_PLACES,
    payload: {
      places
    }
  }
}

export function PostPlace(place: CovidDataModel) {
  const request: VisitedPlacePostRequest = {
    date: place.date,
    hours: place.hours,
    isCrowded: place.isExposed,
    place: place.name
  }

  return function (dispatch: Dispatch<Action>) {
    dispatch(PostPlaceRequest());
    savePlace(request)
      .then(r => dispatch(AddPlace(r)));
  }
}

function PostPlaceRequest(): Action {
  return {
    type: actions.ADD_PLACE_REQUEST
  }
}

function AddPlace(place: CovidDataModel): CustomAction {
  return {
    type: actions.ADD_PLACE,
    payload: {
      place
    }
  }
}