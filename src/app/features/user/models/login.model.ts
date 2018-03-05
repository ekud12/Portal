export class LoginModel {
  username: string;
  password: string;
  grant_type: string = 'password';
}

export class LoginResponse {
  userName: string;
  access_token: string;
}

// export interface WidgetWrapper {
//   gridster: GridComponent;
//   templata: any;
//   isClickable: boolean;
//   isDraggable: boolean;
//   type: any;
//   header: string;
//   subHeader: string;
//   icon?: any;
//   previousRoute: any;
//   nextRoute: any;
// }
