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
        Total Exposure Incidents
        <div className="exposure-count">{totalCount}</div>
      </div>
    </>
  )
}

export default ExposureIncidents;