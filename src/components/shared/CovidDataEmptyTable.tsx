import React from "react";
import './CovidDataEmptyTable.scss';

type Props = {
  children: React.ReactNode
}

const CovidDataEmptyTable: React.FC<Props> = (props: Props) => {
  return (
    <>
      <div className="empty-table">
        <div className="empty-message">
          {props.children}
        </div>
      </div>
    </>
  )
}

export default CovidDataEmptyTable;