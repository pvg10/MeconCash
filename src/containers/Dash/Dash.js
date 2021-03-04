import React from "react";
import messages from "./../../assets/Local/messages";
import { connect } from "react-redux";
// import UserOne from "./user-one";
// import UserTwo from "./user-two";
import {
  BrowserRouter as Router,
  HashRouter,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  Redirect,
} from "react-router-dom";
import * as LazyComponent from "../../utils/LazyLoaded";
import PrivateRoute from "../../utils/PrivateRoute";
import Header from "../Header";

function Dash() {
  let { path, url } = useRouteMatch();
  // const { lang } = this.props;
  // const message = messages[lang];
  // console.log(url, "url", path);
  return (
    <div className="container">
      {/* 	<p>Dash.js</p>
			<Route path='/en/user1' component={UserOne}/>
			<Route path='/user2' component={UserTwo}/> */}
      <div>
        <HashRouter>
          <Header />
          <Switch>
            <Route exact path={path}>
              <LazyComponent.UploadLists />
            </Route>
            <PrivateRoute
              component={LazyComponent.UploadLists}
              path="/fileUploads/upload-lists"
            />
              <PrivateRoute
              component={LazyComponent.Error}
              path="/fileUploads/errors"
            />
            <LazyComponent.NotFound path="/" />
          </Switch>
        </HashRouter>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    lang: state.lang,
  };
};

export default connect(mapStateToProps, null)(Dash);

function Topic() {
  // The <Route> that rendered this component has a
  // path of `/topics/:topicId`. The `:topicId` portion
  // of the URL indicates a placeholder that we can
  // get from `useParams()`.
  let { topicId } = useParams();

  return (
    <div>
      <h3>{topicId}123</h3>
    </div>
  );
}
