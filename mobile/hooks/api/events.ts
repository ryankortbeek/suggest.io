import axios, { AxiosResponse } from 'axios';

const BASE_URL = 'base_url';
const GET_ALL_EVENTS = BASE_URL + '/events';
const POST_MATCH = BASE_URL + '/match';
const GET_MATCHED_EVENTS = BASE_URL + '/matched_events';

export interface IEvent {
  id: number;
  name: string;
  image: string;
  description: string;
}

interface IEventResponse {
  id: number;
  events: IEvent[];
}

export const getAllEvents = (): Promise<AxiosResponse<IEventResponse>> => {
  return axios.get(GET_ALL_EVENTS);
};

export const getMatchedEvents = (
  userId: number
): Promise<AxiosResponse<IEventResponse>> => {
  return axios.get(GET_MATCHED_EVENTS + '/' + userId);
};

export const postMatch = (
  id: number,
  isMatch: boolean
): Promise<AxiosResponse> => {
  return axios.post(POST_MATCH, {
    id,
    isMatch,
  });
};
