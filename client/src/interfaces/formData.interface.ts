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
