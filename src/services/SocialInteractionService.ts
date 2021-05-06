import { CovidDataModel } from './../models/CovidDataModel';

export const getInteractions = (): CovidDataModel[] => {
  return []; 
}

export const getInteraction = (id: string): CovidDataModel => {
  return new CovidDataModel('', new Date(), 0, true);
}