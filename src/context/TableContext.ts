import { CovidDataModel } from './../models/CovidDataModel';
import React from 'react';

type TableContextProps = {
  mode: "interaction" | "place"
  dialogTitle: string;
  nameDisplayText: string;
  exposureDisplayText: string;
  deleteDataCallback: any;
  updateDataCallback: any;
  nameOptions: string[];
}

export const TableContext = React.createContext<TableContextProps>(
  {
    mode: "interaction",
    dialogTitle: '',
    nameDisplayText: '',
    exposureDisplayText: '',
    deleteDataCallback: (id: string) => {},
    updateDataCallback: (data: CovidDataModel) => {},
    nameOptions: []
  }
); 

