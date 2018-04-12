export class LoginModel {
  username: string;
  password: string;
  grant_type = 'password';
}

export class LoginResponse {
  userName: string;
  access_token: string;
}

