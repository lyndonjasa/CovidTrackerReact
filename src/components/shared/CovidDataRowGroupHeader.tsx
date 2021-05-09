import { makeStyles, TableCell } from "@material-ui/core";
import { TableRow } from "@material-ui/core";
import React from "react";
import './CovidDataRowGroupHeader.scss';

const useHeaderRowStyles = makeStyles({
  root: {
    backgroundColor: '#d6d4d4',
    boxShadow: '0px -1px 5px 0px rgba(0,0,0,0.75)',
    borderBottom: '1.5px solid gray',
    marginTop: '5px'
  }
})

const useHeaderCellStyles = makeStyles({
  root: {
    color: '#3e4ea0',
    padding: '5px 0px 5px 10px'
  }
})

const CovidDataRowGroupHeader = () => {
  const headerRowClasses = useHeaderRowStyles();
  const headerCellClasses = useHeaderCellStyles();

  return (
    <>
      <TableRow className={headerRowClasses.root}>
        <TableCell className={headerCellClasses.root} colSpan={4}>
          <div className="header-date">
            <div className="date-part">09</div>
            <div className="other-part">
              <div className="day-part">Sunday</div>
              <div className="month-year-part">May 2021</div>
            </div>
          </div>
        </TableCell>
      </TableRow>
    </>
  )
}

export default CovidDataRowGroupHeader;