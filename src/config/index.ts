import env from '../config/env';
import axios, {AxiosInstance} from 'axios';

export const ENVIRONMENT = {...env};

const apiRequest: AxiosInstance = axios.create({
  baseURL: ENVIRONMENT.APP_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export {apiRequest};
