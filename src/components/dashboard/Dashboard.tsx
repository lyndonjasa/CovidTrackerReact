import React, { useState } from "react";
import ActionButton from "./ActionButtons";
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import RoomIcon from '@material-ui/icons/Room';
import './Dashboard.scss';
import DonutChart from "./DonutChart";

const Dashboard = () => {
  const socialInteractionTitle = 'Social Interactions'
  const visitedPlacesTitle = 'Visited Places';
  const [isInteractionsActive, setIsInteractionsActive] = useState(true);

  return (
    <>
      <div className="action-buttons">
        <ActionButton text="Add Social Interactions" count={0} icon={<AccessibilityIcon />}></ActionButton>
        <div>
          <div className="chart-header" onClick={() => setIsInteractionsActive(!isInteractionsActive)}>
            {
              isInteractionsActive && (
                <>
                  <div className="header-text">{socialInteractionTitle}</div>
                  <div className="header-sub-text">{visitedPlacesTitle}</div>
                </>
              )
            }
            {
              !isInteractionsActive && (
                <>
                  <div className="header-text">{visitedPlacesTitle}</div>
                  <div className="header-sub-text">{socialInteractionTitle}</div>
                </>
              )
            }
          </div>
          <DonutChart></DonutChart>
        </div>
        <ActionButton text="Add Place Exposure" count={0} icon={<RoomIcon />}></ActionButton>
      </div>
    </>
  )
}

export default Dashboard;