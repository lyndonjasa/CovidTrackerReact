import React from 'react';
import { GroupedCovidDataModel } from '../../models/GroupedCovidDataModel';
import CovidDataRowGroupDetails from './CovidDataRowGroupDetails';
import CovidDataRowGroupHeader from './CovidDataRowGroupHeader';

type Props = {
  groupedData: GroupedCovidDataModel
}

const CovidDataRowGroup: React.FC<Props> = (props: Props) => {
  const { groupedData } = props;
  const { date, data: details } = groupedData;

  return (
    <>
      <CovidDataRowGroupHeader headerDate={date} />
      {
        details.map(d => <CovidDataRowGroupDetails key={d.id} detail={d} />)
      }
    </>
  )
}

export default CovidDataRowGroup;