import { AppBar, Badge, BottomNavigation, BottomNavigationAction, IconButton, LinearProgress, makeStyles, Toolbar, Typography } from "@material-ui/core";
import NotificationsIcon from '@material-ui/icons/Notifications'
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AssessmentIcon from '@material-ui/icons/Assessment';
import SettingsIcon from '@material-ui/icons/Settings';
import DateRangeSelector from './DateRangeSelector/DateRangeSelector';
import React, { useEffect } from "react";
import './Header.scss';
import { useHistory } from "react-router-dom";
import useSocialInteraction from "../../hooks/useSocialInteraction";

const Header = () => {
  const [navigationValue, setNavigationValue] = React.useState(0);
  const history = useHistory();
  const { loading } = useSocialInteraction();

  useEffect(() => {
    console.log(loading);
  }, [loading]);

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
            <IconButton color="inherit" className="bell-icon">
              <Badge badgeContent={7} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" className="gear-icon">
              <SettingsIcon />
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
        <LinearProgress className={loading ? '' : classes.indeterminate} />
      </div>
    </>
  )
};

export default Header;