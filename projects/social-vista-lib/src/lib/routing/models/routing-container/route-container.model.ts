import { RouteContainerInterface } from './route-container.interface';

export class RouteContainerModel implements RouteContainerInterface {
  id?: string;
  title?: string;
  iconPath?: string;
  iconWhenSelectedPath?: string;
  path?: string;
  fullPath = '';
  dropDownItems?: RouteContainerModel[];

  static getNavbarRoutes(type: {
    new (): RouteContainerModel;
  }): RouteContainerModel[] {
    return Object.entries(type)
      .map(staticAttributes => staticAttributes[1])
      .filter(
        (routeContainerInterface: RouteContainerModel) =>
          routeContainerInterface.title
      );
  }

  static createRouteContainerModelFactory(
    routeContainerInterface: RouteContainerInterface,
    type: {
      new (): RouteContainerModel;
    }
  ): RouteContainerModel {
    let prefix = '';
    if (Object.entries(type).filter(array => array[0] === 'prefix')) {
      prefix = Object.entries(type).filter(
        array => array[0] === 'prefix'
      )[0][1];
    }
    const routeContainerModel: RouteContainerModel = new RouteContainerModel();
    routeContainerModel.title =
      routeContainerInterface.title ?? routeContainerModel.title;
    routeContainerModel.iconPath =
      routeContainerInterface.iconPath ?? routeContainerModel.iconPath;
    routeContainerModel.iconWhenSelectedPath =
      routeContainerInterface.iconWhenSelectedPath ??
      routeContainerModel.iconWhenSelectedPath;
    routeContainerModel.path =
      routeContainerInterface.path ?? routeContainerModel.path;
    routeContainerModel.fullPath = prefix === '' ? '' : '/';
    routeContainerModel.fullPath += prefix + '/' + routeContainerModel.path;
    routeContainerModel.id =
      routeContainerInterface.id ?? routeContainerModel.fullPath;
    if (
      routeContainerInterface.dropDownItems &&
      routeContainerInterface.dropDownItems.length > 0
    ) {
      routeContainerModel.dropDownItems = [];
      for (const dropDownItem of routeContainerInterface.dropDownItems) {
        routeContainerModel.dropDownItems.push(
          RouteContainerModel.createRouteContainerModelFactory(
            dropDownItem,
            type
          )
        );
      }
    }
    return routeContainerModel;
  }
}
