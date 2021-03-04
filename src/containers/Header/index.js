import React from "react";
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
  // const user = "Admin";
  const classes = useStyles();
  let avatarChars = "A";
  // if (user.company) {
  //   var splitArr = user.company.split(" ");
  //   if (splitArr.length === 1) {
  //     avatarChars = user.company.substring(0, 2);
  //   } else {
  //     avatarChars = splitArr[0].substring(0, 1) + splitArr[1].substring(0, 1);
  //   }
  // }
  // console.log('window', window.location.href)
  var isbase = window.location.href.includes("/fileUploads");
  // console.log("isbase", isbase)
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
        // res.forEach((o) => {
        //   o.Time = moment(o.date_uploaded).format("YYYY-MM-DD");
        // });
        // setData(res);
      });
  }
  return (
    <header className="container">
      <section className="top__section">
        <div>
          <Link to="/fileUploads">
            <img
              src={process.env.PUBLIC_URL + "/logo/DSELogo.png"}
              alt="company-logo"
              className="company-logo"
            />
          </Link>
        </div>
        <div className="right__sub--section">
          {!isbase ? (
            <>
              <span>
                <Link
                  to="#"
                  onClick={() => (window.location = "http://thedse.co/")}
                >
                  Home
                </Link>
              </span>
              <span>
                <Link
                  to="#"
                  onClick={() =>
                    (window.location = "http://thedse.co/about-dse/")
                  }
                >
                  {/* <FontAwesomeIcon icon={faHeart} /> */}
                  About Us
                </Link>
              </span>
              <span>
                <Link
                  to="#"
                  onClick={() =>
                    (window.location = "http://thedse.co/how-we-buy-diamonds/")
                  }
                >
                  {/* <FontAwesomeIcon icon={faHeart} /> */}
                  How We Buy Diamonds
                </Link>
              </span>
            </>
          ) : (
            ""
          )}
          {isbase ? (
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
          ) : (
            ""
          )}
        </div>
      </section>

      {isbase ? (
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
          </ul>
        </section>
      ) : (
        ""
      )}
    </header>
  );
}

const mapStateToProps = (state) => {
  return {
    lang: state.lang,
  };
};

export default connect(mapStateToProps, null)(Header);
