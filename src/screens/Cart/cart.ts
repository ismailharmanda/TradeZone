import {Product} from 'screens/Products/products';

export interface CartProduct extends Product {
  quantity: number;
}
