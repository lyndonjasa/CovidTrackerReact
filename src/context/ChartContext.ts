import React from "react"

type ChartContextProps = {
  chartValues: {
    text: string,
    value: number
  },
  setChartValues: any
}

export const ChartContext = React.createContext<ChartContextProps>(
  {
    chartValues: {
      text: '',
      value: 0,
    },
    setChartValues: () => {}
  }
);