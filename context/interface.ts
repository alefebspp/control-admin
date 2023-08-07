export interface User {
  user_email: string;
  user_id: string;
  user_name: string;
  user_surname: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
  message?: string;
  statusCode?: number;
}

export interface AuthContextInitialValue {
  signIn(loginData: LoginRequest): Promise<void>;
  signOut(): void;
  user: User | undefined;
}

export interface AuthContextProps {
  children: React.ReactNode;
}
