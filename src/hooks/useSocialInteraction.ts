import { CovidDataModel } from './../models/CovidDataModel';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FetchInteraction, PostInteraction, RemoveInteraction } from "../store/SocialInteraction/SocialInteractionActions";
import { useState } from 'react';
import useDateRange from './useDateRange';
import { SocialInteractionState } from '../store/SocialInteraction/SocialInteractionState';

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
  const { currentDateRange } = useDateRange();

  useEffect(() => {
    const filteredInteractions = totalInteractions.filter(i => new Date(i.date) >= currentDateRange.startDate &&
                                                          new Date(i.date) <= currentDateRange.endDate);

    setInteractions(filteredInteractions);
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

  return {
    interactions,
    loading,
    fetchInteractions,
    addInteraction,
    deleteInteraction
  }
}

export default useSocialInteraction;