export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  phone: number;
  userName: string;
  confirmPassword: string;
}

export interface UserData {
  name: string;
}
