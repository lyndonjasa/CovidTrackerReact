import { Alert, AlertTitle } from '@material-ui/lab';
import React from "react";
import useSocialInteraction from "../../hooks/useSocialInteraction";
import useVisitedPlace from "../../hooks/useVisitedPlace";
import './NotificationAlerts.scss';

type Props = {
  open: boolean;
}

const NotificationAlerts: React.FC<Props> = (props: Props) => {
  const { open } = props;
  const { hasInteractionExposure } = useSocialInteraction();
  const { hasPlaceExposure } = useVisitedPlace();

  return (
    <>
      {
        open &&
        <div className="floating-alert-div">
          {
            !hasInteractionExposure &&
            <div className="alerts">
              <Alert severity="success">
                <AlertTitle>Great</AlertTitle>
                You are maintaining proper social distancing. Keep it up!
              </Alert>
            </div>
          }
          {
            hasInteractionExposure &&
            <div className="alerts">
              <Alert severity="error">
                <AlertTitle>Warning</AlertTitle>
                You did not practice social distancing for the last 14 days. Stay at home and maintain 1-2 meters away from other people
              </Alert>
            </div>
          }
          {
            !hasPlaceExposure &&
            <div className="alerts">
              <Alert severity="success">
                <AlertTitle>Great</AlertTitle>
                Thank you for helping to stop spread the virus by staying at home.
              </Alert>
            </div>
          }
          {
            hasPlaceExposure &&
            <div className="alerts">
              <Alert severity="error">
                <AlertTitle>Warning</AlertTitle>
                You have been exposed to a crowded place for the last 14 days. Try to avoid crowded places to minimize your exposure risk.
              </Alert>
            </div>
          }
        </div>
      }
    </>
  )
}

export default NotificationAlerts;