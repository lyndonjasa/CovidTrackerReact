import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, TextField } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { CovidDataModel } from "../../models/CovidDataModel";
import Autocomplete from '@material-ui/lab/Autocomplete';
import './CovidDataForm.scss';

type Props = {
  open: boolean;
  handleClose?: () => void;
  dialogTitle: string;
  nameDisplayText: string;
  exposureDisplayText: string;
  saveCallback: (data: CovidDataModel) => void;
  initialValue?: CovidDataModel;
  nameOptions: string[];
}

const CovidDataForm: React.FC<Props> = (props: Props) => {
  const { 
    open, 
    dialogTitle, 
    handleClose, 
    saveCallback, 
    nameDisplayText, 
    exposureDisplayText,
    initialValue,
    nameOptions
  } = props;

  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState(0);
  const [exposed, setExposed] = useState(false);

  const [nameError, setNameError] = useState(false);
  const handleChangeName = (event) => {
    setNameError(event.target.value.trim() === '')
    setName(event.target.value);
  }

  const [dateError, setDateError] = useState(false);
  const handleChangeDate = (event) => {
    if (!event || moment(event).toDate() > moment().toDate()) {
      setDateError(true);
    } else {
      setDateError(false);
    }
    setDate(event);
  }

  const [hoursError, setHoursError] = useState(false);
  const handleChangeHours = (event) => {
    setHoursError(+event.target.value < 1);
    setHours(+event.target.value);
  }

  const handleSave = () => {
    saveCallback(new CovidDataModel('', name, date, hours, exposed));
    handleClose();
  };

  useEffect(() => {
    if (open) {
      if (initialValue) {
        setName(initialValue.name);
        setDate(initialValue.date);
        setHours(initialValue.hours);
        setExposed(initialValue.isExposed);
      } else {
        setName('');
        setDate(new Date());
        setHours(0);
        setExposed(false);
      }

      setNameError(false);
      setHoursError(false);
      setDateError(false);
    }
  }, [open, initialValue])

  return (
    <>
      <Dialog open={open} onClose={handleClose} disableBackdropClick={true} scroll="body" >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <div className="form-container">
            <div className="form-control">
              <Autocomplete
                freeSolo
                options={nameOptions}
                renderInput={(params) => (
                  <TextField
                    { ...params }
                    error={nameError}
                    helperText={nameError ? `${nameDisplayText} is required` : ''}
                    value={name}
                    label={nameDisplayText}
                    type="text"
                    onChange={handleChangeName}
                  />
                )}
              />
              
            </div>
            <div className="form-control">
              <KeyboardDatePicker
                error={dateError}
                helperText={dateError ? 'Invalid Date' : ''}
                margin="normal"
                label="Date"
                format="MM/dd/yyyy"
                value={date}
                onChange={handleChangeDate}
              />
            </div>
            <div className="form-control">
              <TextField
                error={hoursError}
                helperText={hoursError ? 'Hours should be greater than 0' : ''}
                label="Hours"
                type="number"
                value={hours}
                onChange={handleChangeHours}
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
          <Button
            disabled={nameError || dateError || hoursError || name.trim() === '' || hours < 1}
            onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CovidDataForm;