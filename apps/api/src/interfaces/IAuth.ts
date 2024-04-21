export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
export interface LoginResponse {
  token: string;
  refreshToken?: string;
}

export interface GetAccessTokenRequest {
  token: string;
  ipAddress: string;
}
