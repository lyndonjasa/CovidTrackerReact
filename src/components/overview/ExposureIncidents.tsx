import React, { useEffect, useState } from 'react';
import useSocialInteraction from '../../hooks/useSocialInteraction';
import useVisitedPlace from '../../hooks/useVisitedPlace';
import './ExposureIncidents.scss';

const ExposureIncidents = () => {
  const { interactions } = useSocialInteraction();
  const { places } = useVisitedPlace();
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const exposedInteractions = interactions.filter(i => i.isExposed).length;
    const exposedPlaces = places.filter(i => i.isExposed).length;

    setTotalCount(exposedInteractions + exposedPlaces);
  }, [interactions, places])

  return (
    <>
      <div className="exposure-incidents">
        <div className="exposure-incident">
          Total Interaction Exposures
          <div className="exposure-count">{interactions.filter(i => i.isExposed).length}</div>
        </div>
        <div className="exposure-incident">
          Total Place Exposures
          <div className="exposure-count">{places.filter(i => i.isExposed).length}</div>
        </div>
        <div className="exposure-incident">
          Total Exposure Incidents
          <div className="exposure-count grand-total">{totalCount}</div>
        </div>
      </div>
    </>
  )
}

export default ExposureIncidents;