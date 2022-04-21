export interface IProductResponse {
  count: number;
  rows: ProductInterface[];
}

export interface IInfo {
  id: number;
  name: string;
  value: string;
}

export interface ProductInterface {
  id: number;
  name: string;
  img: string;
  description: string;
  weight: number;
  price: number;
  category: string;
  info?: IInfo[];
}
