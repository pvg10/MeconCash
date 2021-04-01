import React from "react";
import "./Footer.scss";
import { faExchangeAlt, faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Footer() {
  return (
    <div className="footer ">
      {/* <div className="footer__top__section">
        <div className="contact__footer">
          For any queries please contact
          <a
            className="contact__email"
            href="mailto:diamonds@diamondstandard.co"
          >
            diamonds@diamondstandard.co
          </a>{" "}
          |{" "}
          <a href="https://diamondstandard.co/privacy-policy">Privacy policy</a>
        </div>
      </div> */}
      <div className="footer__bottom__section">
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            {/* <div>&#169; 2021 MeconCash.All Rights Reserved.</div> */}
            <div style={{ width: "200px" }}>
              {/* {" "} */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <i className="fab fa-twitter"></i>
                {/* <i className="fas fa-envelope"></i> */}
                <i className="fab fa-telegram"></i>
                <i className="fab fa-github"></i>
                <img src="/gitbook-icon.png" />
                <i className="fab fa-medium-m"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
