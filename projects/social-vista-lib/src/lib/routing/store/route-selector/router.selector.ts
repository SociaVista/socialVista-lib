import { Params } from '@angular/router';
import { RouterReducerState } from '@ngrx/router-store';
import { createSelector, MemoizedSelector } from '@ngrx/store';
import { CustomRouterState } from '../route-serializer/custom.router.serializer';
import { routerFeatureKey } from '../router.feature';

export interface RouterAppState {
  [routerFeatureKey]?: RouterReducerState<CustomRouterState>;
}

export const selectFullRouterState: MemoizedSelector<
  RouterAppState,
  RouterReducerState<CustomRouterState> | undefined
> = createSelector(
  (state: RouterAppState) => state.router,
  routerReducerState => routerReducerState
);

export const selectRouteState: MemoizedSelector<
  RouterAppState,
  CustomRouterState | undefined
> = createSelector(
  selectFullRouterState,
  (router: RouterReducerState<CustomRouterState> | undefined) =>
    router ? router.state : undefined
);

export const selectRouteUrl: MemoizedSelector<
  RouterAppState,
  string | undefined
> = createSelector(selectRouteState, (route: CustomRouterState | undefined) =>
  route ? route.url : undefined
);

export const selectRouteQueryParams: MemoizedSelector<
  RouterAppState,
  Params | undefined
> = createSelector(selectRouteState, (route: CustomRouterState | undefined) =>
  route ? route.queryParams : undefined
);

export const selectRouteParams: MemoizedSelector<
  RouterAppState,
  Params | undefined
> = createSelector(selectRouteState, (route: CustomRouterState | undefined) =>
  route ? route.routeParams : undefined
);

export const selectRouteData: MemoizedSelector<
  RouterAppState,
  unknown | undefined
> = createSelector(
  selectRouteState,
  (route: CustomRouterState | undefined) => route?.data
);
