export class CovidDataModel {
  name: string;
  date: Date;
  hours: number;
  isExposed: boolean;

  constructor(name: string, date: Date, hours: number, isExposed: boolean) {
    this.name = name;
    this.date = date;
    this.hours = hours;
    this.isExposed = isExposed;
  }
}