export interface IProductInfo {
  id: Number;
  title: String;
  price: Number;
  category: String;
  description: String;
  image: String;
  rating: {
    rate: Number;
    count: Number;
  };
}
