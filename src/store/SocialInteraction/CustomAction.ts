import { CovidDataModel } from './../../models/CovidDataModel';
import { Action } from "redux";

export interface CustomAction extends Action {
  payload: {
    interactions?: CovidDataModel[];
    interaction?: CovidDataModel;
    interactionId?: string
  };
}