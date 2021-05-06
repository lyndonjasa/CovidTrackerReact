import { Fab } from "@material-ui/core";
import React from "react";
import './ActionButtons.scss';

type Props = {
  text: string;
  count: number;
  icon: React.ReactNode
}

const ActionButton: React.FC<Props> = (props: Props) => {
  const { text, count, icon} = props;

  return (
    <>
      <div className="action-button">
        <div className="action-text">{text}</div>
        <Fab color="secondary">
          {icon}
        </Fab>
        <div className="action-count">{count}</div>
      </div>
    </>
  )  
}

export default ActionButton;