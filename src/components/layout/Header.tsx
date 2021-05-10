import { AppBar, Badge, BottomNavigation, BottomNavigationAction, IconButton, LinearProgress, makeStyles, Toolbar, Typography } from "@material-ui/core";
import NotificationsIcon from '@material-ui/icons/Notifications'
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AssessmentIcon from '@material-ui/icons/Assessment';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import DateRangeSelector from './DateRangeSelector/DateRangeSelector';
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import useSocialInteraction from "../../hooks/useSocialInteraction";
import useVisitedPlace from "../../hooks/useVisitedPlace";
import './Header.scss';
import NotificationAlerts from "./NotificationAlerts";

const Header = () => {
  const [navigationValue, setNavigationValue] = useState(0);
  const [openAlerts, setOpenAlerts] = useState(false);
  const history = useHistory();
  const { pathname } = useLocation();
  const { loading: interactionsLoading, hasInteractionExposure } = useSocialInteraction();
  const { loading: placesLoading, hasPlaceExposure } = useVisitedPlace();

  const [badgeCount, setBadgeCount] = useState(0);
  useEffect(() => {
    if (hasInteractionExposure && hasPlaceExposure) {
      setBadgeCount(2);
    } else if (hasInteractionExposure || hasPlaceExposure) {
      setBadgeCount(1);
    } else {
      setBadgeCount(2);
    }

  }, [hasInteractionExposure, hasPlaceExposure])

  useEffect(() => {
    if (pathname === '/interactions') {
      setNavigationValue(1)
    } else if (pathname === '/places') {
      setNavigationValue(2)
    } else if (pathname === '/overview') {
      setNavigationValue(3)
    } else {
      setNavigationValue(0);
    }
  }, [pathname])

  const useStyles = makeStyles({
    root: {
      width: 600,
    },
    indeterminate: {
      display: 'none'
    }
  });
  const classes = useStyles();

  return (
    <>
      <AppBar position="static">
        <Toolbar className="header-toolbar">
          <Typography variant="h6">
            COVID Tracker Tool
          </Typography>
          <div className="action-icons">
            <IconButton color="inherit" 
              className="bell-icon"
              onClick={() => setOpenAlerts(!openAlerts)}>
              <Badge badgeContent={badgeCount} color={hasInteractionExposure || hasPlaceExposure ? 'secondary' : 'primary' }>
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" className="gear-icon">
              <SettingsBackupRestoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <BottomNavigation
        value={navigationValue}
        onChange={(event, newValue) => {
          setNavigationValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="Dashboard" icon={<DashboardIcon />} onClick={() => history.push('/')} />
        <BottomNavigationAction label="Social Interactions" icon={<AccessibilityIcon />}  onClick={() => history.push('/interactions')} />
        <BottomNavigationAction label="Visited Places" icon={<LocationOnIcon />} onClick={() => history.push('/places')} />
        <BottomNavigationAction label="Overview" icon={<AssessmentIcon />} onClick={() => history.push('/overview')} />
      </BottomNavigation>
      <DateRangeSelector></DateRangeSelector>
      <div className="linear-progress">
        <LinearProgress className={interactionsLoading || placesLoading ? '' : classes.indeterminate} />
      </div>
      <NotificationAlerts open={openAlerts} />
    </>
  )
};

export default Header;