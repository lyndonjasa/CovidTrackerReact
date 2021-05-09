import { Chart, Legend, PieSeries } from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { Paper } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';

import './DonutChart.scss';
import { SummarizedCovidDataModel } from '../../models/SummarizedCovidDataModel';
import { ChartContext } from '../../context/ChartContext';
import { Link } from 'react-router-dom';

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
        className={`${argument === 'Exposed' ? 'exposed-series' : 'not-exposed-series' }`}
      />
    </>
  )
}

type Props = {
  data: SummarizedCovidDataModel[];
  linkPath: string;
}

const DonutChart: React.FC<Props> = (props: Props) => {
  const { data, linkPath } = props;
  const [chartValues, setChartValues] = useState({
    text: '',
    value: 0
  });

  useEffect(() => {
    const initialData = data[0];
    setChartValues({
      text: initialData.displayText,
      value: initialData.displayValue
    });
  }, [data])

  useEffect(() => {
    return () => {
      
    }
  })

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

              <Legend position="bottom"  />
              <Animation />
            </Chart>
          </Paper>
        </div>
        <div className="series-values">
          <div className="series-value">{chartValues.value}</div>
          <div className="series-name">{chartValues.text}</div>
          <Link to={linkPath} className="series-link">View All</Link>
        </div>
      </ChartContext.Provider>
    </>
  )
}

export default DonutChart;