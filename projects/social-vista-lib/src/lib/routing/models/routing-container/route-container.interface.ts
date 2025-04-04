export interface RouteContainerInterface {
  id?: string;
  title?: string;
  iconPath?: string;
  iconWhenSelectedPath?: string;
  path?: string;
  fullPath?: string;
  dropDownItems?: RouteContainerInterface[];
}
