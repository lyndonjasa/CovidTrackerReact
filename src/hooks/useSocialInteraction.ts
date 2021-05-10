import { CovidDataModel } from './../models/CovidDataModel';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FetchInteraction, PostInteraction, RemoveInteraction, SaveInteraction } from "../store/SocialInteraction/SocialInteractionActions";
import { useState } from 'react';
import useDateRange from './useDateRange';
import { SocialInteractionState } from '../store/SocialInteraction/SocialInteractionState';
import moment from 'moment';

const useSocialInteraction = () => {
  const state = useSelector<any>(
    (state) => {
      const reducerState = state.socialInteractionReducer as SocialInteractionState;

      return reducerState;
    }
  ) as SocialInteractionState;

  const { interactions: totalInteractions, loading } = state;

  const dispatch = useDispatch();

  const [interactions, setInteractions] = useState(totalInteractions);
  const [hasInteractionExposure, setHasInteractionExposure] = useState(false);
  const { currentDateRange } = useDateRange();

  useEffect(() => {
    const filteredInteractions = totalInteractions.filter(i => new Date(i.date) >= currentDateRange.startDate &&
                                                          new Date(i.date) <= currentDateRange.endDate);

    setInteractions(filteredInteractions);

    const startDate = moment().subtract(13, 'days').startOf('day').toDate();
    const endDate = moment().endOf('day').toDate();

    const exposure = totalInteractions.some(i => new Date(i.date) >= startDate &&
                                              new Date(i.date) <= endDate && 
                                              i.isExposed)
    setHasInteractionExposure(exposure);
  }, [totalInteractions, currentDateRange]);
  
  const fetchInteractions = () => {
    dispatch(FetchInteraction());
  }

  const addInteraction = (data: CovidDataModel) => {
    dispatch(PostInteraction(data))
  }

  const deleteInteraction = (id: string) => {
    dispatch(RemoveInteraction(id));
  }

  const updateInteraction = (interaction: CovidDataModel) => {
    dispatch(SaveInteraction(interaction))
  }

  return {
    interactions,
    loading,
    fetchInteractions,
    addInteraction,
    deleteInteraction,
    updateInteraction,
    hasInteractionExposure
  }
}

export default useSocialInteraction;