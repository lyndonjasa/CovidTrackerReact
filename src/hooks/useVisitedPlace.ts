import { VisitedPlaceState } from './../store/VisitedPlaces/VisitedPlaceState';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import useDateRange from './useDateRange';
import { FetchPlace, PostPlace } from '../store/VisitedPlaces/VisitedPlaceActions';
import { CovidDataModel } from '../models/CovidDataModel';
import { OverviewCovidDataModel } from '../models/OverviewCovidDataModel';
import { getDivider, summarize } from '../shared/overview-data-helper';

const useVisitedPlace = () => {
  const state = useSelector<any>(
    (state) => {
      const reducerState = state.visitedPlaceReducer as VisitedPlaceState;

      return reducerState;
    }
  ) as VisitedPlaceState;

  const { places: totalPlaces, loading } = state;

  const dispatch = useDispatch();

  const [places, setPlaces] = useState(totalPlaces);
  const [placesOverview, setPlacesOverview] = useState<OverviewCovidDataModel[]>([]);
  const { currentDateRange } = useDateRange();

  useEffect(() => {
    const filteredPlaces = totalPlaces.filter(i => new Date(i.date) >= currentDateRange.startDate &&
                                              new Date(i.date) <= currentDateRange.endDate);

    setPlaces(filteredPlaces);
    setPlacesOverview(summarize(filteredPlaces, getDivider(currentDateRange.range), currentDateRange.endDate));
  }, [totalPlaces, currentDateRange]);

  const fetchPlaces = () => {
    dispatch(FetchPlace());
  }

  const addPlace = (data: CovidDataModel) => {
    dispatch(PostPlace(data))
  }

  return {
    places,
    placesOverview,
    loading,
    fetchPlaces,
    addPlace
  }
}

export default useVisitedPlace;