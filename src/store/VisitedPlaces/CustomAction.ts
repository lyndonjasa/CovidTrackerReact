import { CovidDataModel } from './../../models/CovidDataModel';
import { Action } from "redux";

export interface CustomAction extends Action {
  payload: {
    places?: CovidDataModel[];
    place?: CovidDataModel;
    placeId?: string
  };
}