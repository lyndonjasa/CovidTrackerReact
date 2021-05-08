import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import DateRangeReducer from './DateRange/DateRangeReducer';
import SocialInteractionReducer from './SocialInteraction/SocialInteractionReducer';
import VisitedPlaceReducer from './VisitedPlaces/VisitedPlaceReducer';

const reducers = combineReducers({ 
  dateRangeReducer: DateRangeReducer,
  socialInteractionReducer: SocialInteractionReducer,
  visitedPlaceReducer: VisitedPlaceReducer
});

export default function configureState() {
  return createStore(reducers, applyMiddleware(thunk));
}