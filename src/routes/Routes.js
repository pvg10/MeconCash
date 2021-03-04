import React, { Suspense, useEffect } from "react";
import {
  Switch,
  Redirect,
  HashRouter,
  Route,
} from "react-router-dom";
import history from "./History";
import * as LazyComponent from "../utils/LazyLoaded";
import Loader from "../components/Loader/Loader";
import PrivateRoute from "../utils/PrivateRoute";
// import store from "../store";
// import { setCurrentLang } from "../store/Lang/LangAction";
// import Auth from "../utils/Auth";
// import Login from "../containers/Login/Login";
import Header from "../containers/Header";
import Footer from "../containers/Footer/Footer";
import { StateMachineProvider, createStore } from "little-state-machine";

const Routes = ({ lang }) => {
  // const location = useLocation();
  // const History = useHistory();

  useEffect(() => {
    // store.dispatch(
    //   setCurrentLang(location.pathname.split("/")[1] === "en" ? "en" : "en")
    // );
  }, []);

  // useEffect(() => {
  //   const pathname = location.pathname.split("/");
  //   pathname[1] = pathname[1] === "en" ? "en" : "ar";
  //   const newPathname = pathname.join("/");
  //   // History.push(newPathname.replace(/en|ar/, lang));
  // }, [lang]);
  createStore({});
  var isbase = window.location.href.includes("/fileUploads");
  // console.log('isbase', isbase)
  return (
    <Suspense fallback={<Loader />}>
      <StateMachineProvider>
        <HashRouter history={history}>
          {/* {Auth.isAuth() ? */}
          {/* {!isbase ? <Header /> : ""} */}
          <Switch>
            <LazyComponent.NotFound path="/404" exact />
            <LazyComponent.Login path="/login" exact />
          
       
            <PrivateRoute component={LazyComponent.Dash} path="/fileUploads" />
        
            <Route
              path="*"
              render={(props) => {
                return props.match.url === "/" ? (
                  <Redirect to="/login" />
                ) : (
                  <Redirect to="/404" />
                );
              }}
            />

            <PrivateRoute exact path="/">
              <Redirect to="/login" />
            </PrivateRoute>
          </Switch>
          <Footer />
       
        </HashRouter>
      </StateMachineProvider>
    </Suspense>
  );
};

export default Routes;
