import React, { useEffect, useState } from "react";
import useSocialInteraction from "../../hooks/useSocialInteraction";
import useVisitedPlace from "../../hooks/useVisitedPlace";
import ExposureIncidents from "./ExposureIncidents";
import ViewModeButton from "./ViewModeButton";
import './Overview.scss';
import OverviewChart from "./OverviewChart";
import { OverviewCovidDataModel } from "../../models/OverviewCovidDataModel";
import { getDivider, summarize } from "../../shared/overview-data-helper";
import useDateRange from "../../hooks/useDateRange";

type ViewMode = "interactions" | "places";

const Overview = () => {
  const [mode, setMode] = useState<ViewMode>("interactions")
  const { interactions } = useSocialInteraction();
  const { places } = useVisitedPlace();
  const { currentDateRange } = useDateRange();
  const [overview, setOverview] = useState<OverviewCovidDataModel[]>([]);
  
  useEffect(() => {
    if (mode === "interactions") {
      setOverview(summarize(interactions, getDivider(currentDateRange.range), currentDateRange.endDate));
    } else {
      setOverview(summarize(places, getDivider(currentDateRange.range), currentDateRange.endDate));
    }
  }, [interactions, places, mode, currentDateRange])

  return (
    <>
      <div className="overview-container">
        <div className="overview-header">
          <ExposureIncidents />
          <div className="mode-buttons">
            <ViewModeButton title="Total Social Interactions"
              count={interactions.length}
              buttonClass="social-interaction"
              isActive={mode === "interactions"}
              onClick={() => setMode("interactions")} />
            <ViewModeButton title="Total Visited Places"
              count={places.length}
              buttonClass="visited-place"
              isActive={mode === "places"}
              onClick={() => setMode("places")} />
          </div>
        </div>
        <div className="overview-chart-body">
          <OverviewChart data={overview} />
        </div>
      </div>
    </>
  )
}

export default Overview;