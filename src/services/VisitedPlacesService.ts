import { VisitedPlacePostRequest } from './messages/VisitedPlacePostRequest';
import { VisitedPlacesResponse } from './messages/VisitedPlacesResponse';
import axios, { AxiosResponse } from 'axios';
import { CovidDataModel } from './../models/CovidDataModel';
import { plainToClass } from 'class-transformer';

const url = 'http://localhost:5000/api/visited-places'; // place this in config file

export const getPlaces = async (): Promise<CovidDataModel[]> => {
  const promise: AxiosResponse<any[]> = await axios.get(url);
  const response: VisitedPlacesResponse[] = plainToClass(VisitedPlacesResponse, promise.data);
  
  return response.map(r => new CovidDataModel(r._id, r.place, r.date, r.hours, r.isCrowded));
}

export const getPlace = async (id: string): Promise<CovidDataModel> => {
  const promise: AxiosResponse<any> = await axios.get(`${url}/${id}`);
  const response: VisitedPlacesResponse = plainToClass(VisitedPlacesResponse, promise.data);

  return new CovidDataModel(response._id, response.place, response.date, response.hours, response.isCrowded);
}

export const savePlace = async (request: VisitedPlacePostRequest) => {
  const promise: AxiosResponse<any> = await axios.post(url, request);
  const response: VisitedPlacesResponse = plainToClass(VisitedPlacesResponse, promise.data);

  return new CovidDataModel(response._id, response.place, response.date, response.hours, response.isCrowded);
}