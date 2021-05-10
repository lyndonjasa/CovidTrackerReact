import { Fab, makeStyles, TableCell, TableRow } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import './CovidDataRowGroupDetails.scss';
import { CovidDataModel } from '../../models/CovidDataModel';
import CovidDataDeleteDialog from './CovidDataDeleteDialog';
import { TableContext } from '../../context/TableContext';

const useActionStyles = makeStyles({
  root: {
    margin: '0px 5px'
  }
})

const useRowStyles = makeStyles({
  root: {
    verticalAlign: 'top'
  }
})

type Props = {
  detail: CovidDataModel;
}

const CovidDataRowGroupDetails: React.FC<Props> = (props: Props) => {
  const actionClasses = useActionStyles();
  const rowClasses = useRowStyles();
  const { detail } = props;

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

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const onDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  }

  const { nameDisplayText, exposureDisplayText, updateDataCallback, deleteDataCallback } = useContext(TableContext);
  const onDelete = () => {
    deleteDataCallback(detail.id);
    setOpenDeleteDialog(false);
  }

  return (
    <>
      <TableRow className={rowClasses.root}>
        <TableCell style={iconStyles}>
          <div className="exposure-icon">
            <Fab color={ detail.isExposed ? 'secondary' : 'primary' }
            size="small"
            aria-label="add" 
            disableRipple={true}
            disableFocusRipple={true}>&nbsp;</Fab>
            <div className="exposure-text">
              { detail.isExposed ? 'Exposed' : 'Not Exposed' }
            </div>
          </div>
        </TableCell>
        <TableCell style={nameStyles}>
          <div className="detail-header">{nameDisplayText}</div>
          <div className="detail-content">{ detail.name  }</div>
        </TableCell>
        <TableCell style={hourStyles}>
          <div className="detail-header">Hours Spent</div>
          <div className="detail-content">{ detail.hours }</div>
        </TableCell>
        <TableCell style={actionStyles}>
          <div className="detail-actions">
            <Fab color="default" size="small" className={actionClasses.root}>
              <EditIcon />
            </Fab>
            <Fab color="default" size="small" className={actionClasses.root}
              onClick={() => setOpenDeleteDialog(true)}>
              <DeleteIcon />
            </Fab>
          </div>
        </TableCell>
      </TableRow>
      <CovidDataDeleteDialog open={openDeleteDialog}
        handleClose={onDeleteDialogClose}
        deleteCallback={onDelete} />
    </>
  )
}

export default CovidDataRowGroupDetails;