import React, { useState, useEffect } from "react";
// import messages from "./../../assets/Local/messages";
import { connect } from "react-redux";
import { NavLink as Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.scss";
import History from "../../routes/History";
import Auth from "../../utils/Auth";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import { DSE_URL } from "../../utils/Constants";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

function Header(props) {
  // render() {
  // const { lang } = props;
  // const message = messages[lang];
  const user = useSelector((state) => state.User.user);
  const [isbase, setBase] = useState(false);
  // const user = "Admin";
  const classes = useStyles();
  let avatarChars = "A";
  useEffect(() => {
    var base = window.location.href.includes("/login");

    setBase(base);
  }, []);
  // var isbase = window.location.href.includes("/fileUploads");
  // console.log("isbase route", isbase)
  function logout() {
    var token = localStorage.getItem("token");
    axios
      .get(DSE_URL + "/admin/logout", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        // console.log("list", response.data.data.rows);
        History.push("/login");

        Auth.signOut();
      });
  }
  return (
    <header className="container">
      <section className="top__section">
        <div>
          <Link to="/login">
            <img
              src={process.env.PUBLIC_URL + "/logo/DSELogo.png"}
              alt="company-logo"
              className="company-logo"
            />
          </Link>
        </div>
      
      </section>
    </header>
  );
}

const mapStateToProps = (state) => {
  return {
    lang: state.lang,
  };
};

export default connect(mapStateToProps, null)(Header);
