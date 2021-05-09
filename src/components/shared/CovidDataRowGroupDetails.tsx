import { Fab, makeStyles, TableCell, TableRow } from '@material-ui/core';
import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import './CovidDataRowGroupDetails.scss';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

const useActionStyles = makeStyles({
  root: {
    margin: '0px 5px'
  }
})

const useRowStyles = makeStyles({
  root: {
    height: '100px',
    verticalAlign: 'top'
  }
})

const CovidDataRowGroupDetails = () => {
  const actionClasses = useActionStyles();
  const rowClasses = useRowStyles();

  const iconStyles: React.CSSProperties = {
    width: '80px'
  }

  const nameStyles: React.CSSProperties = {
    width: '244px'
  }

  const hourStyles: React.CSSProperties = {
    width: '80px'
  }

  const actionStyles: React.CSSProperties = {
    width: '80px'
  }

  return (
    <>
      <TableRow className={rowClasses.root}>
        <TableCell style={iconStyles}>
          <div className="exposure-icon">
            <Fab color="primary"
            size="small"
            aria-label="add" 
            disableRipple={true}
            disableFocusRipple={true}>&nbsp;</Fab>
            <div className="exposure-text">
              Not Exposed
            </div>
          </div>
        </TableCell>
        <TableCell style={nameStyles}>
          <div className="detail-header">Name</div>
          <div className="detail-content">Don's Place</div>
        </TableCell>
        <TableCell style={hourStyles}>
          <div className="detail-header">Hours Spent</div>
          <div className="detail-content">3</div>
        </TableCell>
        <TableCell style={actionStyles}>
          <div className="detail-actions">
            <Fab color="default" size="small" className={actionClasses.root}>
              <EditIcon />
            </Fab>
            <Fab color="default" size="small" className={actionClasses.root}>
              <DeleteIcon />
            </Fab>
          </div>
        </TableCell>
      </TableRow>
    </>
  )
}

export default CovidDataRowGroupDetails;