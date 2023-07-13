import {apiRequest} from '../config';
import endpoints from './endpoints';

export const getAllProducts = () => apiRequest.get(endpoints.getProducts());
export const loginService = () =>
  apiRequest.post(endpoints.login(), {
    username: 'mor_2314',
    password: '83r5^_',
  });
