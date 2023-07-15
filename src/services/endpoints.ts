export default {
  getProducts: (): string => '/products',
  getCategories: (): string => '/products/categories',
  getProductsByCategory: (category: string): string =>
    `/products/category/${category}`,
  getProductDetail: (id: number): string => `/products/${id}`,
  login: (): string => '/auth/login',
};
