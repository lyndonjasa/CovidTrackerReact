import { Table, TableBody } from '@material-ui/core';
import React from 'react';
import CovidDataRowGroup from './CovidDataRowGroup';

const CovidDataTable = () => {
  return (
    <>
      <Table>
        <TableBody>
          <CovidDataRowGroup></CovidDataRowGroup>
        </TableBody>
      </Table>
    </>
  )
}

export default CovidDataTable;