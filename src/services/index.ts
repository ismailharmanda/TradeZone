import {apiRequest} from '../config';
import endpoints from './endpoints';

export const getAllProducts = () => apiRequest.get(endpoints.getProducts());

export const getSingleProduct = (id: number) =>
  apiRequest.get(endpoints.getProductDetail(id));

export const getCategories = () => apiRequest.get(endpoints.getCategories());

export const getProductsByCategory = (category: string) =>
  apiRequest.get(endpoints.getProductsByCategory(category));

export const loginService = () =>
  apiRequest.post(endpoints.login(), {
    username: 'mor_2314',
    password: '83r5^_',
  });
