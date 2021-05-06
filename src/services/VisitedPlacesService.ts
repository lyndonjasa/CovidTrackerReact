import { CovidDataModel } from './../models/CovidDataModel';

export const getPlaces = (): CovidDataModel[] => {
  return [];
}

export const getPlace = (id: string): CovidDataModel => {
  return new CovidDataModel('', new Date(), 0, true);
}