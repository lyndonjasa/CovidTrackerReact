import { useEffect } from 'react';
import { CovidDataModel } from './../models/CovidDataModel';
import { useDispatch, useSelector } from 'react-redux';
import { FetchInteraction } from "../store/SocialInteraction/SocialInteractionActions";
import { useState } from 'react';
import useDateRange from './useDateRange';

const useSocialInteraction = () => {
  const totalInteractions = useSelector<any>(
    (state) => state.socialInteractionReducer.interactions
  ) as CovidDataModel[];

  const dispatch = useDispatch();

  const [interactions, setInteractions] = useState(totalInteractions);
  const { currentDateRange } = useDateRange();

  useEffect(() => {
    const filteredInteractions = totalInteractions.filter(i => new Date(i.date) >= currentDateRange.startDate &&
                                                          new Date(i.date) <= currentDateRange.endDate);
    console.log(filteredInteractions);
    setInteractions(filteredInteractions);
  }, [totalInteractions, currentDateRange]);
  
  const fetchInteractions = () => {
    dispatch(FetchInteraction());
  }

  return {
    interactions,
    fetchInteractions
  }
}

export default useSocialInteraction;