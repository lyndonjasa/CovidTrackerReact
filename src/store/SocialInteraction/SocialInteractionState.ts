import { CovidDataModel } from './../../models/CovidDataModel';

export interface SocialInteractionState {
  loading?: boolean;
  interactions: CovidDataModel[];
}

export const initialState: SocialInteractionState = {
  loading: false,
  interactions: []
}