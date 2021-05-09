import axios, { AxiosResponse } from 'axios';
import {BASE_URL} from './const'
const POST_SIGNUP = BASE_URL + '/sign-up';

export const postSignUp = (
    userId: number,
    authToken: string
  ): Promise<AxiosResponse> => {
    return axios.post(POST_SIGNUP, {
      userId: userId,
    },
    {
        headers: {
            Authorization: authToken
        }
    });
  };