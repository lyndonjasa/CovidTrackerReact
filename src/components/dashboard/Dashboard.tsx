import React, { useEffect, useState } from "react";
import ActionButton from "./ActionButtons";
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import RoomIcon from '@material-ui/icons/Room';
import './Dashboard.scss';
import DonutChart from "./DonutChart";
import { SummarizedCovidDataModel } from "../../models/SummarizedCovidDataModel";
import CovidDataForm from "./CovidDataForm";
import useSocialInteraction from "../../hooks/useSocialInteraction";

interface CovidFormDetails {
  title: string;
  nameDisplayText: string;
  exposureDisplayText: string;
};

const Dashboard = () => {
  const socialInteractionTitle = 'Social Interactions'
  const visitedPlacesTitle = 'Visited Places';
  const [isInteractionsActive, setIsInteractionsActive] = useState(true);
  const [formDetails, setFormDetails] = useState<CovidFormDetails>({
    title: 'Add Social Interaction',
    nameDisplayText: 'Name',
    exposureDisplayText: 'Is Social Distancing Observed?'
  });

  const { interactions } = useSocialInteraction();

  const [summary, setSummary] = useState<SummarizedCovidDataModel[]>([
    { displayText: 'Not Exposed', displayValue: 0 },
    { displayText: 'Exposed', displayValue: 0 }
  ]);

  useEffect(() => {
    setSummary([
      {
        displayText: 'Not Exposed',
        displayValue: interactions.filter(i => !i.isExposed).length
      },
      {
        displayText: 'Exposed',
        displayValue: interactions.filter(i => i.isExposed).length
      }
    ])
  }, [interactions])

  const handleAddInteractions = () => {
    setFormDetails({
      title: 'Add Social Interaction',
      nameDisplayText: 'Name',
      exposureDisplayText: 'Is Social Distancing Observed?'
    });

    const interactionSummary: SummarizedCovidDataModel[] = [
      {
        displayText: 'Not Exposed',
        displayValue: interactions.filter(i => !i.isExposed).length
      },
      {
        displayText: 'Exposed',
        displayValue: interactions.filter(i => i.isExposed).length
      }
    ];
    setSummary(interactionSummary);
    setOpen(true);
  }

  const handleAddPlaces = () => {
    setFormDetails({
      title: 'Add Visited Place',
      nameDisplayText: 'Place',
      exposureDisplayText: 'Is the Place Crowded?'
    });
    setOpen(true);
  }

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="action-buttons">
        <ActionButton text="Add Social Interactions" 
          onClick={handleAddInteractions} 
          count={interactions.length} 
          icon={<AccessibilityIcon />}>
        </ActionButton>
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
          <DonutChart data={summary}></DonutChart>
        </div>
        <ActionButton text="Add Place Exposure" 
          count={0} 
          icon={<RoomIcon />}
          onClick={handleAddPlaces}>
        </ActionButton>
        <CovidDataForm open={open} 
          dialogTitle={formDetails.title}
          nameDisplayText={formDetails.nameDisplayText}
          exposureDisplayText={formDetails.exposureDisplayText}
          handleClose={() => setOpen(false)}
          saveCallback={(data) => console.log(data)}>
        </CovidDataForm>
      </div>
    </>
  )
}

export default Dashboard;