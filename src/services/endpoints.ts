export default {
  getProducts: (): string => '/products',
  getProductDetail: (id: Number): string => `/products/${id}`,
  login: (): string => '/auth/login',
};
