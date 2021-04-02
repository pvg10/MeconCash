import React from "react";

export const Error = React.lazy(() => import("../containers/Error/Error"));

export const NotFound = React.lazy(() =>
  import("../components/NotFound/NotFound")
);
export const Login = React.lazy(() => import("../containers/Login/Login"));
