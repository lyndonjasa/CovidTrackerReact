import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import React from "react";

type Props = {
  open: boolean;
  handleClose?: () => void;
  deleteCallback?: () => void;
}

const CovidDataDeleteDialog: React.FC<Props> = (props: Props) => {
  const { open, handleClose, deleteCallback } = props;

  return (
    <>
      <Dialog open={open}
        disableBackdropClick={true}
        onClose={handleClose}>
        <DialogTitle>Delete Data</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure about deleting this data?
          </DialogContentText>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={deleteCallback} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </DialogContent>

      </Dialog>
    </>
  )
}

export default CovidDataDeleteDialog;