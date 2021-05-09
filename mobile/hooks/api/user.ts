import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from './const';
const POST_SIGNUP = BASE_URL + '/sign-up';

export const postSignUp = (userId: string | undefined): Promise<AxiosResponse> => {
  console.log(userId);
  return axios.post(
    POST_SIGNUP,
    JSON.stringify({
      userId: userId,
    }),
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    }
  );
};
