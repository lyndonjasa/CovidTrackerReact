import { AppBar, Badge, BottomNavigation, BottomNavigationAction, IconButton, makeStyles, Toolbar, Typography } from "@material-ui/core";
import NotificationsIcon from '@material-ui/icons/Notifications'
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AssessmentIcon from '@material-ui/icons/Assessment';
import DateSelector from './DateSelector';
import React from "react";
import './Header.scss';

const useStyles = makeStyles({
  root: {
    width: 600,
  }
});

const Header = () => {
  const classes = useStyles();
  const [navigationValue, setNavigationValue] = React.useState(0);

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
        <BottomNavigationAction label="Dashboard" icon={<DashboardIcon />} />
        <BottomNavigationAction label="Social Interactions" icon={<AccessibilityIcon />} />
        <BottomNavigationAction label="Visited Places" icon={<LocationOnIcon />} />
        <BottomNavigationAction label="Overview" icon={<AssessmentIcon />} />
      </BottomNavigation>
      <DateSelector></DateSelector>
    </>
  )
};

export default Header;