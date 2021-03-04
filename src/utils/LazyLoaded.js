import React from "react";

export const Home = React.lazy(() => import("../containers/Home/Home"));
export const Dash = React.lazy(() => import("../containers/Dash/Dash"));

export const Error = React.lazy(() =>
  import("../containers/Error/Error")
);
export const UploadLists = React.lazy(() =>
  import("../containers/UploadLists/UploadLists")
);
export const NotFound = React.lazy(() =>
  import("../components/NotFound/NotFound")
);
export const Login = React.lazy(() => import("../containers/Login/Login"));
