import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, TextField } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import React, { useState } from "react";
import { CovidDataModel } from "../../models/CovidDataModel";
import './CovidDataForm.scss';

type Props = {
  open: boolean;
  handleClose?: () => void;
  dialogTitle: string;
  nameDisplayText: string;
  exposureDisplayText: string;
  saveCallback: (data: CovidDataModel) => void;
}

const CovidDataForm: React.FC<Props> = (props: Props) => {
  const { open, dialogTitle, handleClose, saveCallback, nameDisplayText, exposureDisplayText } = props;
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState(0);
  const [exposed, setExposed] = useState(false);

  const handleSave = () => {
    saveCallback(new CovidDataModel('', name, date, hours, exposed));
    handleClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} disableBackdropClick={true} >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <div className="form-container">
            <div className="form-control">
              <TextField
                value={name}
                label={nameDisplayText}
                type="text"
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="form-control">
              <KeyboardDatePicker
                margin="normal"
                label="Date"
                format="MM/dd/yyyy"
                value={date}
                onChange={date => setDate(date)}
              />
            </div>
            <div className="form-control">
              <TextField
                label="Hours"
                type="number"
                value={hours}
                onChange={(event) => setHours(+event.target.value)}
              />
            </div>
            <div className="form-control">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={exposed}
                    onChange={() => setExposed(!exposed)}
                    name="checkedB"
                    color="primary"
                  />
                }
                label={exposureDisplayText}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CovidDataForm;