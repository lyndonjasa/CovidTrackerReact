import { AppBar, Badge, BottomNavigation, BottomNavigationAction, IconButton, makeStyles, Toolbar, Typography } from "@material-ui/core";
import NotificationsIcon from '@material-ui/icons/Notifications'
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AssessmentIcon from '@material-ui/icons/Assessment';
import DateRangeSelector from './DateRangeSelector/DateRangeSelector';
import React from "react";
import './Header.scss';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: 600,
  }
});

const Header = () => {
  const classes = useStyles();
  const [navigationValue, setNavigationValue] = React.useState(0);
  const history = useHistory();

  return (
    <>
      <AppBar position="static">
        <Toolbar className="header-toolbar">
          <Typography variant="h6">
            COVID Tracker Tool
          </Typography>
          <IconButton color="inherit" className="bell-icon">
            <Badge badgeContent={17} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
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
    </>
  )
};

export default Header;