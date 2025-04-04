import { Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

export interface CustomRouterState {
  url: string;
  fullUrl: string;
  routeParams: Params;
  queryParams: Params;
  data: unknown;
}

export class CustomRouterSerializer
  implements RouterStateSerializer<CustomRouterState>
{
  serialize(routerStateSnapshot: RouterStateSnapshot): CustomRouterState {
    const { routeParams, data } =
      this._getPathParamsAndDataFromRoute(routerStateSnapshot);
    const baseUrl = this._cleanUrl(routerStateSnapshot.url, routeParams);
    return {
      url: baseUrl,
      fullUrl: routerStateSnapshot.url,
      queryParams: routerStateSnapshot.root.queryParams,
      routeParams,
      data,
    };
  }

  private _getPathParamsAndDataFromRoute(
    routerStateSnapshot: RouterStateSnapshot
  ): {
    routeParams: Params;
    data: unknown;
  } {
    const lastRoute = this._getLastRoute(routerStateSnapshot);
    const routeParams = lastRoute.params;
    const data = lastRoute.data;
    return { routeParams, data };
  }

  private _getLastRoute(routerStateSnapshot: RouterStateSnapshot) {
    let lastRoute = routerStateSnapshot.root;
    while (lastRoute.firstChild) {
      lastRoute = lastRoute.firstChild;
    }
    return lastRoute;
  }

  private _cleanUrl(url: string, pathParams: Params): string {
    url = this._removeQueryParamsFromUrl(url);
    return this._removePathParamsFromUrl(url, pathParams);
  }

  private _removeQueryParamsFromUrl(url: string) {
    if (url.includes('?')) {
      return url.slice(0, url.indexOf('?'));
    }
    return url;
  }

  private _removePathParamsFromUrl(url: string, pathParams: Params): string {
    if (pathParams) {
      for (const param of Object.values(pathParams)) {
        url = url.replace('/' + param, '');
      }
      return url;
    }
    return url;
  }
}
