import { Table, TableBody } from '@material-ui/core';
import React from 'react';
import { GroupedCovidDataModel } from '../../models/GroupedCovidDataModel';
import CovidDataRowGroup from './CovidDataRowGroup';

type Props = {
  data: GroupedCovidDataModel[]
}

const CovidDataTable: React.FC<Props> = (props: Props) => {
  const { data } = props;

  return (
    <>
      <Table>
        <TableBody>
          {
            data.map((d, index) => <CovidDataRowGroup key={index} groupedData={d} />)
          }
        </TableBody>
      </Table>
    </>
  )
}

export default CovidDataTable;