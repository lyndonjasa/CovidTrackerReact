import { CovidDataModel } from './../models/CovidDataModel';
import { useDispatch, useSelector } from 'react-redux';
import { FetchInteraction } from "../store/SocialInteraction/SocialInteractionActions";

const useSocialInteraction = () => {
  const interactions = useSelector<any>(
    (state) => state.socialInteractionReducer.interactions
  ) as CovidDataModel[];

  const dispatch = useDispatch();
  
  const fetchInteractions = () => {
    dispatch(FetchInteraction());
  }

  return {
    interactions,
    fetchInteractions
  }
}

export default useSocialInteraction;