import React, { useEffect, useState } from "react";
import ActionButton from "./ActionButtons";
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import RoomIcon from '@material-ui/icons/Room';
import './Dashboard.scss';
import DonutChart from "./DonutChart";
import { SummarizedCovidDataModel } from "../../models/SummarizedCovidDataModel";
import CovidDataForm from "./CovidDataForm";
import useSocialInteraction from "../../hooks/useSocialInteraction";
import useDateRange from "../../hooks/useDateRange";
import { CovidDataModel } from "../../models/CovidDataModel";
import useVisitedPlace from "../../hooks/useVisitedPlace";

interface CovidFormDetails {
  type: 'Interaction' | 'Place';
  title: string;
  nameDisplayText: string;
  exposureDisplayText: string;
};

const Dashboard = () => {
  const socialInteractionTitle = 'Social Interactions'
  const visitedPlacesTitle = 'Visited Places';
  const [isInteractionsActive, setIsInteractionsActive] = useState(true);
  const [formDetails, setFormDetails] = useState<CovidFormDetails>({
    type: 'Interaction',
    title: 'Add Social Interaction',
    nameDisplayText: 'Name',
    exposureDisplayText: 'Is Social Distancing Observed?'
  });

  const { interactions, addInteraction } = useSocialInteraction();
  const { places, addPlace } = useVisitedPlace();
  const { currentDateRange } = useDateRange();

  const [summary, setSummary] = useState<SummarizedCovidDataModel[]>([
    { displayText: 'Not Exposed', displayValue: 0 },
    { displayText: 'Exposed', displayValue: 0 }
  ]);

  // useEffect(() => {
  //   setSummary([
  //     {
  //       displayText: 'Not Exposed',
  //       displayValue: interactions.filter(i => !i.isExposed).length
  //     },
  //     {
  //       displayText: 'Exposed',
  //       displayValue: interactions.filter(i => i.isExposed).length
  //     }
  //   ])
  // }, [interactions, currentDateRange])

  useEffect(() => {
    if (isInteractionsActive) {
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
    } else {
      setSummary([
        {
          displayText: 'Not Exposed',
          displayValue: places.filter(i => !i.isExposed).length
        },
        {
          displayText: 'Exposed',
          displayValue: places.filter(i => i.isExposed).length
        }
      ])
    }
  }, [isInteractionsActive, interactions, places, currentDateRange])

  const handleAddInteractions = () => {
    setFormDetails({
      type: 'Interaction',
      title: 'Add Social Interaction',
      nameDisplayText: 'Name',
      exposureDisplayText: 'Is Social Distancing Observed?'
    });
    setOpen(true);
  }

  const handleAddPlaces = () => {
    setFormDetails({
      type: 'Place',
      title: 'Add Visited Place',
      nameDisplayText: 'Place',
      exposureDisplayText: 'Is the Place Crowded?'
    });
    setOpen(true);
  }

  const [open, setOpen] = useState(false);
  const handleSave = (data: CovidDataModel) => {
    if (formDetails.type === "Interaction") {
      addInteraction({ ...data, isExposed: !data.isExposed });
    } else {
      addPlace(data);
    }
  }

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
          count={places.length} 
          icon={<RoomIcon />}
          onClick={handleAddPlaces}>
        </ActionButton>
        <CovidDataForm open={open} 
          dialogTitle={formDetails.title}
          nameDisplayText={formDetails.nameDisplayText}
          exposureDisplayText={formDetails.exposureDisplayText}
          handleClose={() => setOpen(false)}
          saveCallback={handleSave}>
        </CovidDataForm>
      </div>
    </>
  )
}

export default Dashboard;