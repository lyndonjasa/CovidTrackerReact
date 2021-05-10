import { Fab, makeStyles } from "@material-ui/core"
import React from "react"
import AddIcon from '@material-ui/icons/Add';
import './CovidDataAddButton.scss';

const useStyles = makeStyles((theme) => ({
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

type Props = {
  addDisplayText: string,
  onAddClick?: () => void
}

const CovidDataAddButton: React.FC<Props> = (props: Props) => {
  const { addDisplayText, onAddClick } = props;
  const classes = useStyles();

  return (
    <>
      <div className="floating-add-button">
        <Fab color="default" variant="extended" onClick={onAddClick}>
          <AddIcon className={classes.extendedIcon} />
          {addDisplayText}
        </Fab>
      </div>
    </>
  )
}

export default CovidDataAddButton;