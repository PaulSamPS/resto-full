export interface IAuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
  isActivated: boolean;
  isAuthenticated: boolean;
}
