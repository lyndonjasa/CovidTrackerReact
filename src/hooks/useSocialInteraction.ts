import { summarize, getDivider } from './../shared/overview-data-helper';
import { OverviewCovidDataModel } from './../models/OverviewCovidDataModel';
import { CovidDataModel } from './../models/CovidDataModel';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FetchInteraction, PostInteraction } from "../store/SocialInteraction/SocialInteractionActions";
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
  const [interactionsOverview, setInteractionsOverview] = useState<OverviewCovidDataModel[]>([]);
  const { currentDateRange } = useDateRange();

  useEffect(() => {
    const filteredInteractions = totalInteractions.filter(i => new Date(i.date) >= currentDateRange.startDate &&
                                                          new Date(i.date) <= currentDateRange.endDate);

    setInteractions(filteredInteractions);
    setInteractionsOverview(summarize(filteredInteractions, getDivider(currentDateRange.range), currentDateRange.endDate));

    console.log(summarize(filteredInteractions, getDivider(currentDateRange.range), currentDateRange.endDate));
  }, [totalInteractions, currentDateRange]);
  
  const fetchInteractions = () => {
    dispatch(FetchInteraction());
  }

  const addInteraction = (data: CovidDataModel) => {
    dispatch(PostInteraction(data))
  }

  return {
    interactions,
    interactionsOverview,
    loading,
    fetchInteractions,
    addInteraction
  }
}

export default useSocialInteraction;