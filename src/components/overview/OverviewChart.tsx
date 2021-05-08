import { Stack, ValueScale } from '@devexpress/dx-react-chart';
import { ArgumentAxis, BarSeries, Chart, ValueAxis } from '@devexpress/dx-react-chart-material-ui';
import { Paper } from '@material-ui/core';
import React from 'react';
import { OverviewCovidDataModel } from '../../models/OverviewCovidDataModel';
import './OverviewChart.scss';

type Props = {
  data: OverviewCovidDataModel[];
}

const OverviewChart: React.FC<Props> = (props: Props) => {
  const { data } = props;

  return (
    <>
      <div className="chart-container">
        <Paper>
          <Chart data={data} height={250}>
            <ValueScale name="exposure" />

            <ValueAxis
              scaleName="exposure"
            />
            <ArgumentAxis />

            <BarSeries
              valueField="exposed"
              argumentField="date"
              name="Exposed"
              scaleName="exposure"
            />
            <BarSeries
              valueField="notExposed"
              argumentField="date"
              name="Not Exposed"
              scaleName="exposure"
            />
            <Stack stacks={[
              { series: ['Exposed', 'Not Exposed'] }
            ]}></Stack>
          </Chart>
        </Paper>
      </div>
    </>
  )
}

export default OverviewChart;