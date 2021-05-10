import { SocialInteractionPostRequest } from './messages/SocialInteractionPostRequest';
import { SocialInteractionResponse } from './messages/SocialInteractionResponse';
import axios, { AxiosResponse } from 'axios';
import { CovidDataModel } from './../models/CovidDataModel';
import { plainToClass } from 'class-transformer';
import config from '../config';

const url = `${config.apiUrl}/api/social-interactions`;

export const getInteractions = async (): Promise<CovidDataModel[]> => {
  const promise: AxiosResponse<any[]> = await axios.get(url);
  const response: SocialInteractionResponse[] = plainToClass(SocialInteractionResponse, promise.data);
  
  return response.map(r => new CovidDataModel(r._id, r.name, r.date, r.hours, !r.isSocialDistancing));
}

export const postInteraction = async (request: SocialInteractionPostRequest): Promise<CovidDataModel> => {
  const promise: AxiosResponse<any> = await axios.post(url, request);
  const response: SocialInteractionResponse = plainToClass(SocialInteractionResponse, promise.data);

  return new CovidDataModel(response._id, response.name, response.date, response.hours, !response.isSocialDistancing);
}

export const deleteInteraction = async (id: string): Promise<boolean> => {
  await axios.delete(`${url}/${id}`);
  
  return true;
}

export const putInteraction = async (request: SocialInteractionPostRequest, id: string): Promise<CovidDataModel> => {
  const promise: AxiosResponse<any> = await axios.put(`${url}/${id}`, request);
  const response: SocialInteractionResponse = plainToClass(SocialInteractionResponse, promise.data);

  return new CovidDataModel(response._id, response.name, response.date, response.hours, !response.isSocialDistancing);
}