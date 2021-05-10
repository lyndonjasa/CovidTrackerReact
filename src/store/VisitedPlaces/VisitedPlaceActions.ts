import { Dispatch, Action } from 'redux';
import { CovidDataModel } from '../../models/CovidDataModel';
import { deletePlace, getPlaces, putPlace, savePlace } from "../../services/VisitedPlacesService";
import { CustomAction } from './CustomAction';
import * as actions from './ActionTypes';
import { VisitedPlacePostRequest } from '../../services/messages/VisitedPlacePostRequest';
import moment from 'moment';

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
    date: moment(place.date).startOf('day').toDate(),
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

export function RemovePlace(id: string) {
  return function (dispatch: Dispatch<any>) {
    dispatch(DeletePlaceRequest());
    deletePlace(id)
      .then(r => dispatch(DeletePlace(id)))
  }
}

function DeletePlaceRequest(): Action {
  return {
    type: actions.REMOVE_PLACE_REQUEST
  }
}

function DeletePlace(id: string): CustomAction {
  return {
    type: actions.REMOVE_PLACE,
    payload: {
      placeId: id
    }
  }
}

export function SavePlace(place: CovidDataModel) {
  const request: VisitedPlacePostRequest = {
    date: moment(place.date).startOf('day').toDate(),
    hours: place.hours,
    isCrowded: place.isExposed,
    place: place.name
  }

  return function (dispatch: Dispatch<any>) {
    dispatch(UpdatePlaceRequest())
    putPlace(request, place.id)
      .then(r => dispatch(UpdatePlace(r)));
  }
}

function UpdatePlaceRequest(): Action {
  return {
    type: actions.UPDATE_PLACE_REQUEST
  }
}

function UpdatePlace(place: CovidDataModel): CustomAction {
  return {
    type: actions.UPDATE_PLACE,
    payload: {
      place
    }
  }
}