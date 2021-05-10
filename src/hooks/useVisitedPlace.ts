import { VisitedPlaceState } from './../store/VisitedPlaces/VisitedPlaceState';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import useDateRange from './useDateRange';
import { FetchPlace, PostPlace, RemovePlace, SavePlace } from '../store/VisitedPlaces/VisitedPlaceActions';
import { CovidDataModel } from '../models/CovidDataModel';
import moment from 'moment';

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
  const [hasPlaceExposure, setHasPlaceExposure] = useState(false);
  const [placeOptions, setPlaceOptions] = useState<string[]>([]);
  const { currentDateRange } = useDateRange();

  useEffect(() => {
    const filteredPlaces = totalPlaces.filter(i => new Date(i.date) >= currentDateRange.startDate &&
                                              new Date(i.date) <= currentDateRange.endDate);
    setPlaces(filteredPlaces);

    const startDate = moment().subtract(13, 'days').startOf('day').toDate();
    const endDate = moment().endOf('day').toDate();

    const exposure = totalPlaces.some(i => new Date(i.date) >= startDate &&
                                              new Date(i.date) <= endDate && 
                                              i.isExposed)
    setHasPlaceExposure(exposure);
    setPlaceOptions(totalPlaces.map(p => p.name));
  }, [totalPlaces, currentDateRange]);

  const fetchPlaces = () => {
    dispatch(FetchPlace());
  }

  const addPlace = (data: CovidDataModel) => {
    dispatch(PostPlace(data))
  }

  const deletePlace = (id: string) => {
    dispatch(RemovePlace(id))
  }

  const savePlace = (data: CovidDataModel) => {
    dispatch(SavePlace(data));
  }

  return {
    places,
    loading,
    fetchPlaces,
    addPlace,
    deletePlace,
    savePlace,
    hasPlaceExposure,
    placeOptions
  }
}

export default useVisitedPlace;