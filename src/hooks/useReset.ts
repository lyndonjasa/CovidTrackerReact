import { useDispatch } from 'react-redux';
import { ResetData } from "../services/ResetService";
import { ResetInteractionRequest, ResetInteractoin } from '../store/SocialInteraction/SocialInteractionActions';
import { ResetPlaces, ResetPlacesRequest } from '../store/VisitedPlaces/VisitedPlaceActions';

const useReset = () => {
  const dispatch = useDispatch();

  const resetData = () => {
    dispatch(ResetPlacesRequest());
    dispatch(ResetInteractionRequest())

    ResetData().then(r => {
      dispatch(ResetPlaces());
      dispatch(ResetInteractoin())
    });
  }

  return {
    resetData
  }
}

export default useReset;