// Sidebar route metadata
export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  extralink: boolean;
  submenu: RouteInfo[];
  dropdown?: boolean;
  role_code?: string[];
  isDropdownOpen?: boolean;
}