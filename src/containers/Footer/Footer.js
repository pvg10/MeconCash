import React from "react";
import "./Footer.scss";

function Footer() {
  return (
    <div className="footer navbar-fixed-bottomm">
      <div className="footer__top__section">
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
      </div>
      <div className="footer__bottom__section">
        <div>&#169; 2021 Diamond Standard Exchange Ltd.</div>
      </div>
    </div>
  );
}
export default Footer;
