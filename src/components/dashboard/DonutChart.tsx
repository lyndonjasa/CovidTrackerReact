import { Chart, Legend, PieSeries } from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { Paper } from '@material-ui/core';
import { seriesColors as colors } from '../../shared/chart-constants';
import React, { useContext, useState } from 'react';

import './DonutChart.scss';
import { SummarizedCovidDataModel } from '../../models/SummarizedCovidDataModel';
import { ChartContext } from '../../context/ChartContext';

const PointComponentOverride: React.FC<PieSeries.PointProps> = (props: PieSeries.PointProps) => {
  const { argument, value } = props;
  
  const { setChartValues } = useContext(ChartContext);
  const handleSeriesClick = () => {
    setChartValues({
      text: argument,
      value
    });
  }

  return (
    <>
      <PieSeries.Point
        {...props}
        onClick={handleSeriesClick}
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

type Props = {
  data: SummarizedCovidDataModel[];
}

const DonutChart: React.FC<Props> = (props: Props) => {
  const { data } = props;
  const initialData = data[0];

  const [chartValues, setChartValues] = useState({
    text: initialData.displayText,
    value: initialData.displayValue
  });
  const value = { chartValues, setChartValues };

  return (
    <>
      <ChartContext.Provider value={value}>
        <div className="chart-container">
          <Paper>
            <Chart
              data={data}
              width={300}
              height={300}
            >
              <PieSeries
                valueField="displayValue"
                argumentField="displayText"
                innerRadius={0.8}
                outerRadius={1}
                pointComponent={PointComponentOverride}
              />

              <Legend position="bottom" itemComponent={legendOverride} />
              <Animation />
            </Chart>
          </Paper>
        </div>
        <div className="series-values">
          <div className="series-value">{chartValues.value}</div>
          <div className="series-name">{chartValues.text}</div>
        </div>
      </ChartContext.Provider>
    </>
  )
}

export default DonutChart;