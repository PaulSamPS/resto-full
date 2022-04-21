export interface IFormDataLogin {
  name: string;
  password: string;
}

export interface IFormDataRegistration {
  name: string;
  password: string;
  email: string;
  phone: string;
}

export interface IFormDataResetEmail {
  email: string;
}

export interface IInfo {
  id: string;
  name: string;
  value: string;
}

export interface IFormDataCreateProduct {
  id: string;
  name: string;
  img: string;
  price: number;
  description: string;
  weight: string;
  category: string;
  info: IInfo[];
}
