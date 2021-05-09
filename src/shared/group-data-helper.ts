import { GroupedCovidDataModel } from './../models/GroupedCovidDataModel';
import { CovidDataModel } from './../models/CovidDataModel';
import * as _ from 'underscore';
import moment from 'moment';

export function groupData(data: CovidDataModel[]): GroupedCovidDataModel[] {
  const dateGroups = _.groupBy(data, (d) => {
    return moment(d.date).startOf('day').format('MM/DD/yyyy');
  })

  const groupedDataModel: GroupedCovidDataModel[] = [];
  Object.keys(dateGroups).forEach(k => {
    const model: GroupedCovidDataModel = {
      date: moment(k, 'MM/DD/yyyy').startOf('day').toDate(),
      data: dateGroups[k]
    }

    groupedDataModel.push(model);
  })

  return groupedDataModel;
}