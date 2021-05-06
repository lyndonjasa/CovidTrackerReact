import React from "react";
import ActionButton from "./ActionButtons";
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import RoomIcon from '@material-ui/icons/Room';
import './Dashboard.scss';

const Dashboard = () => {
  return (
    <>
      <div className="action-buttons">
        <ActionButton text="Add Social Interactions" count={0} icon={<AccessibilityIcon />}></ActionButton>
        <ActionButton text="Add Visited Places" count={0} icon={<RoomIcon />}></ActionButton>
      </div>
    </>
  )
}

export default Dashboard;