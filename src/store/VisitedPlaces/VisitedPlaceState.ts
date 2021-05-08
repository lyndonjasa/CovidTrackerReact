import { CovidDataModel } from './../../models/CovidDataModel';

export interface VisitedPlaceState {
  loading?: boolean;
  places: CovidDataModel[];
}

export const initialState: VisitedPlaceState = {
  loading: true,
  places: []
}