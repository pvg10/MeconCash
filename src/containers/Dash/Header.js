import React, { useState, useEffect } from "react";
// import messages from "./../../assets/Local/messages";
import { connect } from "react-redux";
import { NavLink as Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../Header/index.scss";
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
          <Link to="/fileUploads">
            <img
              src={process.env.PUBLIC_URL + "/logo/meconcash-logo.png"}
              alt="company-logo"
              className="company-logo"
            />
          </Link>
        </div>
        <div className="right__sub--section">
          <span>
            <Dropdown>
              <Dropdown.Toggle className="profile__icon--btn">
                <Avatar className={classes.purple}>
                  {avatarChars.toUpperCase()}
                </Avatar>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <div className="user__info__section">
                  <span className="user__name">Admin</span>
                  <span className="user__mail">{`${user.email}`}</span>
                </div>
                <Dropdown.Divider />
                <Dropdown.Item onClick={logout}>
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </span>
        </div>
      </section>

      <section className="bottom__section">
        <ul>
          <li>
            <Link
              to={`/fileUploads/upload-lists`}
              activeStyle={{ textDecoration: "underline" }}
            >
              Upload LIST
            </Link>
          </li>
          <li>
            <Link
              to={`/fileUploads/purchase-order-list`}
              activeStyle={{ textDecoration: "underline" }}
            >
              Purchase Orders
            </Link>
          </li>
         
        </ul>
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
