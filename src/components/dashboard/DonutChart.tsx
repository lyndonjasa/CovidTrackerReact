import { Chart, Legend, PieSeries, Title } from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { Paper } from '@material-ui/core';
import { seriesColors as colors } from '../../shared/chart-constants';
import React from 'react';
import './DonutChart.scss';

const pointComponentOverride: React.FC<PieSeries.PointProps> = (props: PieSeries.PointProps) => {
  const { argument } = props;
  return (
    <>
      <PieSeries.Point 
        {...props} 
        color={`${argument === 'Exposed' ? colors.EXPOSED : colors.NOT_EXPOSED}`}
        className={`${argument === 'Exposed' ? 'exposed-series' : 'not-exposed-series' }`}
      />
    </>
  )
}

const legendOverride: React.FC<Legend.ItemProps> = (legendProps: Legend.ItemProps) => {
  const { children }: any = legendProps;
  const displayText = children[1].props.text;

  const color = displayText === 'Exposed' ? colors.EXPOSED : colors.NOT_EXPOSED;

  return (
    <>
      <li className="legend-details">
        <svg fill={color} width="10" height="10" name={displayText}>
          <circle r="5" cx="5" cy="5" name={displayText}></circle>
        </svg>
        <span className="legend-text">
          {displayText}
        </span>
      </li>
    </>
  )
}

const DonutChart = () => {
  const data = [
    { country: 'Not Exposed', area: 12 },
    { country: 'Exposed', area: 7 }
  ];

  return (
    <>
      <div className="chart-container">
        <Paper>
          <Chart
            data={data}
            width={300}
            height={300}
          >
            <PieSeries
              valueField="area"
              argumentField="country"
              innerRadius={0.8}
              outerRadius={1}
              pointComponent={pointComponentOverride}
            />

            <Legend position="bottom" itemComponent={legendOverride} />
            <Animation />
          </Chart>
        </Paper>
      </div>
    </>
  )
}

export default DonutChart;