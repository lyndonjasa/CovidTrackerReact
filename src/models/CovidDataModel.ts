export class CovidDataModel {
  id: string;
  name: string;
  date: Date;
  hours: number;
  isExposed: boolean;

  constructor(id: string, name: string, date: Date, hours: number, isExposed: boolean) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.hours = hours;
    this.isExposed = isExposed;
  }
}