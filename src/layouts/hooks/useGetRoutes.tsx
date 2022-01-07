import { Route } from "react-router-dom";
import { IRoute, LayoutType } from "types/types";

const getLayout = (route: IRoute, layout: LayoutType, key: number) => {
  if (route.layout === layout) {
    return (
      <Route
        path={route.layout + route.path}
        component={route.component as React.ComponentType}
        key={key}
      />
    );
  } else {
    return null;
  }
};

export const useGetRoutes = (routes: IRoute[], layout: LayoutType) => {
  return routes.map((route, key) => {
    if (route.collapse && route.views && route.views.length > 0) {
      return getRouteViews(route.views, layout);
    }

    return getLayout(route, layout, key);
  });
};

const getRouteViews = (routes: IRoute[], layout: LayoutType) => {
  return routes.map((route, key) => getLayout(route, layout, key));
};
