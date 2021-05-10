import { Button, Dialog, DialogActions, DialogContent, makeStyles } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import React from 'react';
import useReset from '../../hooks/useReset';

const useStyles = makeStyles({
  root: {
    width: 450
  }
})

type Props = {
  open: boolean,
  handleClose?: () => void;
}

const ResetDataDialog: React.FC<Props> = (props: Props) => {
  const { open, handleClose } = props;
  const classes = useStyles();
  const { resetData } = useReset();

  const handleReset = () => {
    resetData();
    handleClose();
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose} disableBackdropClick={true}>
        <Alert severity="error">
          <AlertTitle><b>You are trying to reset the data!</b></AlertTitle>
        </Alert>
        <DialogContent className={classes.root}>
          <p>Resetting the data would mean deleting all interactions and places that are currently saved.</p>
          <p>Are you sure you want to proceed?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleReset} color="primary" autoFocus>
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ResetDataDialog;