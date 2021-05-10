import { CovidDataModel } from './../models/CovidDataModel';
import React from 'react';

type TableContextProps = {
  nameDisplayText: string;
  exposureDisplayText: string;
  deleteDataCallback: any;
  updateDataCallback: any;
}

export const TableContext = React.createContext<TableContextProps>(
  {
    nameDisplayText: '',
    exposureDisplayText: '',
    deleteDataCallback: (id: string) => {},
    updateDataCallback: (data: CovidDataModel) => {}
  }
); 

