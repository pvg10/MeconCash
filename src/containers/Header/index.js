import React, { useState, useEffect } from "react";
// import messages from "./../../assets/Local/messages";
import { connect } from "react-redux";
import { NavLink as Link } from "react-router-dom";
// import { Dropdown } from "react-bootstrap";
import { faExchangeAlt, faCoins } from "@fortawesome/free-solid-svg-icons";
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
import AnchorLink from "react-anchor-link-smooth-scroll";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Select, { components } from "react-select";
// import ReactFlagsSelect from "react-flags-select";

const options = [
  { value: "eng", label: "ENG", icon: "united-kingdom.png" },
  // { value: "eng-us", label: "US-ENG", icon: "united-kingdom.png" },
];
const { Option, SingleValue } = components;

const IconOption = (props) => (
  <Option {...props}>
    <img
      src={require("/public/" + props.data.icon)}
      style={{ width: 20, marginRight: "8px" }}
      alt={props.data.label}
    />
    {props.data.label}
  </Option>
);
const ValueOption = (props) => (
  <SingleValue {...props}>
    <img
      src={require("/public/" + props.data.icon)}
      style={{ width: 20, marginRight: "8px" }}
      alt={props.data.label}
    />
    {props.data.label}
  </SingleValue>
);

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
  const [option, setOption] = useState(null);
  // const user = "Admin";
  const classes = useStyles();
  let avatarChars = "A";
  useEffect(() => {
    var base = window.location.href.includes("/login");

    setBase(base);
  }, []);
  function handleChange(selectedOption) {
    setOption({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }
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
    <header>
      <section className="top__section container">
        <div>
          <Link to="#">
            <img
              src={process.env.PUBLIC_URL + "/logo/v1.png"}
              alt="company-logo"
              className="company-logo"
            />
          </Link>
        </div>
        <div className="header-options">
          <ul>
            <li>
              <AnchorLink offset="100" href="#about">
                About
              </AnchorLink>
            </li>
            <li>
              <AnchorLink offset="100" href="#features">
                Features
              </AnchorLink>
            </li>

            <li>
              <AnchorLink href="#works">How It Works</AnchorLink>
            </li>
            <li>
              <AnchorLink offset="100" href="#faq">
                FAQ
              </AnchorLink>
            </li>
          </ul>
          <div
            style={{ display: "flex", margin: "unset" }}
            className="form-group"
          >
            <button
              type="button"
              className="btn btn-dark"
              style={{ marginRight: "10px" }}
            >
              Launch
            </button>
            <div className="lang__select">
              <Select
                // className="react-select-container"
                classNamePrefix="react-select"
                // styles={{}}
                defaultValue={options[0]}
                options={options}
                components={{ Option: IconOption, SingleValue: ValueOption }}
                className="lang--select"
                id="languageSelect"
              />
            </div>
          </div>
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
