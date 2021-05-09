import axios, { AxiosResponse } from 'axios';

const BASE_URL = 'base_url'; // TODO: update to actual base URL
const GET_ALL_EVENTS = BASE_URL + '/events';
const POST_MATCH = BASE_URL + '/match';
const GET_MATCHED_EVENTS = BASE_URL + '/matched_events';

export const NONE = 'none';
export const FETCH_ERROR = 'fetch_error';
export const POST_ERROR = 'post_error';

export type EventError = typeof NONE | typeof FETCH_ERROR | typeof POST_ERROR;

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

export const getAllEvents = (
  userId: string,
  lat: string,
  lon: string
): Promise<AxiosResponse<IEventResponse>> => {
  return axios.get(GET_ALL_EVENTS, {
    params: {
      userId: userId,
      lat: lat,
      lon: lon,
    },
  });
};

export const getMatchedEvents = (
  userId: number
): Promise<AxiosResponse<IEventResponse>> => {
  return axios.get(GET_MATCHED_EVENTS + '/' + userId);
};

export const postMatch = (
  userId: string,
  eventId: number,
  isMatch: boolean
): Promise<AxiosResponse> => {
  return axios.post(POST_MATCH, {
    userId: userId,
    eventId: eventId,
    isMatch: isMatch,
  });
};
