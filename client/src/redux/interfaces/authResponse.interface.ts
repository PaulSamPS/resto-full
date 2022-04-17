import { IAuthUser } from './authUser.interface';

export interface IAuthResponse {
  accessToken: string;
  user: IAuthUser;
}
