import { SocialInteractionResponse } from './messages/SocialInteractionResponse';
import axios, { AxiosResponse } from 'axios';
import { CovidDataModel } from './../models/CovidDataModel';
import { plainToClass } from 'class-transformer';

const url = 'http://localhost:5000/api/social-interactions'; // put in config

export const getInteractions = async (): Promise<CovidDataModel[]> => {
  const promise: AxiosResponse<any[]> = await axios.get(url);
  const response: SocialInteractionResponse[] = plainToClass(SocialInteractionResponse, promise.data);
  
  return response.map(r => new CovidDataModel(r._id, r.name, r.date, r.hours, !r.isSocialDistancing));
}

export const getInteraction = async (id: string): Promise<CovidDataModel> => {
  const promise: AxiosResponse<any> = await axios.get(url);
  const response: SocialInteractionResponse = plainToClass(SocialInteractionResponse, promise.data);

  return new CovidDataModel(response._id, response.name, response.date, response.hours, !response.isSocialDistancing);
}