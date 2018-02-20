import { GridComponent } from '../_dashboard/components/grid/grid.component';

export class LoginFormDetails {
  username: string;
  password: string;
  error: string;
  isValidating: boolean;
}

export interface WidgetWrapper {
  gridster: GridComponent;
  templata: any;
  isClickable: boolean;
  isDraggable: boolean;
  type: any;
  header: string;
  subHeader: string;
  icon?: any;
  previousRoute: any;
  nextRoute: any;
}
