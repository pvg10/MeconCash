import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./../../scss/login.scss";
import History from "../../routes/History";
import "@fortawesome/fontawesome-free/css/all.min.css";

// import { makeStyles } from "@material-ui/core/styles";
// import { faExchangeAlt, faCoins } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import LockIcon from "@material-ui/icons/Lock";
// import Grid from "@material-ui/core/Grid";
// import EmailIcon from "@material-ui/icons/Email";
// import { TextField } from "@material-ui/core";
import Faq from "react-faq-component";

import { DSE_URL } from "../../utils/Constants";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../store/User/UserAction";
import { useStateMachine } from "little-state-machine";
import clearAction from "./clearAction";
import Header from "../Header";
import Footer from "../Footer/Footer";
const faqs = {
  // title: "FAQ (How it works)",
  rows: [
    {
      title: "What is a decentralized exchange, and what makes it different?",
      content: "Lorem ipsum dolor sit amet, consectetur ",
    },
    {
      title: "How does your trading price and speed compare to others?",
      content:
        "Using Layer 2 for transactions allows us for seamless transfers for our customers with close to zero gas fees included. With the average time of transaction being around 30 seconds and the cost of over $6 for Ethereum on various exchanges available on the market, we were able to make it literally free with our gas station network and approximately 1~2 seconds for an average transaction.",
    },
    {
      title: "Who can use MCFinance?",
      content:
        "Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc",
    },
    {
      title: "How can I make money with MCFinance?",
      content:
        "Lorem ipsum dolor sit amet, consectetur, Lorem ipsum dolor sit amet, consectetur",
    },
    {
      title: "What is the MCF token?",
      content: "Lorem ipsum dolor sit amet, consectetur",
    },
  ],
};
function Login() {
  const dispatch = useDispatch();

  console.log("dse", DSE_URL);
  useEffect(() => {
    toast.dismiss();
    actions.clearAction();
  }, []);

  function handleLogin(data) {
    console.log(data, DSE_URL);
    var msgNode = document.querySelector("#loginResText");
    axios
      .post(DSE_URL + "/admin/login", data)
      .then(function (response) {
        console.log(response);
        if (response.status == 200) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("vendorEmail", response.data.admin.email);

          dispatch(setUserDetails(response.data.admin));
          msgNode.style.display = "none";
          History.push("/fileUploads/upload-lists");
        }
      })
      .catch(function (error) {
        setUserName("");
        setPassword("");
        msgNode.innerHTML = "Incorrect email/password";
        msgNode.style.color = "red";
      });
  }
  const { register, handleSubmit, errors, setValue, formState } = useForm();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { actions, state } = useStateMachine({ clearAction });

  // const useStyles = makeStyles((theme) => ({
  // root: {
  // display: "flex",
  // flexWrap: "wrap",
  // },
  // margin: {
  // margin: theme.spacing(1),
  // },
  // withoutLabel: {
  // marginTop: theme.spacing(3),
  // },
  // textField: {
  // width: "25ch",
  // },
  // }));
  // const classes = useStyles();

  // const onUserNameChange = (e) => {
  // e.stopPropagation();
  // setUserName(e.currentTarget.value);
  // };
  // const onPasswordChange = (e) => {
  // e.stopPropagation();
  // setPassword(e.currentTarget.value);
  // };

  return (
    <>
      <div className="sect">
        <Header />
        <div className="login-page">
          <section id="about">
            <div className="container">
              <div className="row">
                <div className="col-sm-6">
                  <div
                    className="image-box"
                    // style={{ border: "1px solid", height: "95%" }}
                  >
                    <p className="mcf">MCF DEX</p>
                    <div className="mcf-content">
                      <p>
                        MCFinance is a decentralized exchange giving the power
                        back to the people.
                      </p>
                      <p>
                        Powered by Polygon, we offer secure and light-speed fast
                        transactions. Everybody can now trade cryptocurrencies
                        without costly fees that stop many from exchanging their
                        tokens, creating an environment where you can get the
                        most out of every block.
                      </p>
                    </div>
                    <div style={{ display: "flex" }}>
                      <button
                        type="button"
                        style={{ backgroundColor: "#FAAD53 !important" }}
                        className="btn btn-dark"
                      >
                        Launch
                      </button>
                      <a
                        href="https://mcfinance.gitbook.io/mcfinance"
                        target="_blank"
                        className="btn btn-dark"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        Documentation
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <img src="/Group.png" />
                </div>
              </div>
            </div>
            {/* <h2>About</h2>  */}
          </section>
        </div>
      </div>
      <section id="features">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 d-flex align-items-stretch">
              <div className="icon-boxes d-flex flex-column justify-content-center">
                <div className="row">
                  <div className="col-xl-4 d-flex align-items-stretch">
                    <div className="icon-box mt-4 mt-xl-0">
                      <i className="bx bx-receipt"></i>
                      <p className="security">
                        <img src="/ic-security.png" />
                      </p>
                      <h4
                        style={{
                          color: "#133F95",
                          fontWeight: "700",
                          fontSize: "24px",
                        }}
                      >
                        Security
                      </h4>
                      <p style={{ color: "#7F8385", fontSize: "14px" }}>
                        MCF DEX is able to achieve both scalibilty and security
                        with Polygon's layer 2 scaling solution that uses
                        sidechains for off-chain computation while ensuring
                        security with the Plasma framework and a decentralized
                        network of PoS validators.
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-4 d-flex align-items-stretch">
                    <div className="icon-box mt-4 mt-xl-0">
                      <i className="bx bx-cube-alt"></i>
                      <p className="freedom">
                        <img src="/ic-freedom.png" />
                      </p>
                      <h4
                        style={{
                          color: "#2CBBC7",
                          fontWeight: "700",
                          fontSize: "24px",
                        }}
                      >
                        Freedom
                      </h4>
                      <p style={{ color: "#7F8385", fontSize: "14px" }}>
                        Gas fees are a product of the past and should remain
                        there. We make it actually free! It allows everybody to
                        participate in the exchange. No exceptions.
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-4 d-flex align-items-stretch">
                    <div className="icon-box mt-4 mt-xl-0">
                      <i className="bx bx-images"></i>
                      <p className="speed">
                        <img src="/ic-speed.png" />
                      </p>
                      <h4
                        style={{
                          color: "#FAAD53",
                          fontWeight: "700",
                          fontSize: "24px",
                        }}
                      >
                        Speed
                      </h4>
                      <p style={{ color: "#7F8385", fontSize: "14px" }}>
                        With real-time transactions, we have left other
                        exchanges behind, giving you full ownership of your
                        funds. Quickly and seamlessly, your tokens will now go
                        straight into your wallet where they belong, ready for
                        another trade.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="works">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h4 className="text-center pt-5">How It Works</h4>
              <p
                className="text-center"
                style={{ color: "#7F8385", fontSize: "14px" }}
              >
                MCFinance is here to shake the status quo and take you to the
                future of decentralized finance.
              </p>
              <div className="box-container">
                <div className="box1">
                  <p className="security">
                    <img src="/ic.png" />
                  </p>
                  <h4
                    style={{
                      color: "#133F95",
                      fontWeight: "700",
                      // fontSize: "20px",
                    }}
                  >
                    The power is in your hands
                  </h4>
                  <p className="icon-box-content">
                    MCF DEX is able to achieve both scalibilty and security with
                    Polygon's layer 2 scaling solution that uses sidechains for
                    off-chain computation while ensuring security with the
                    Plasma framework and a decentralized network of PoS
                    validators.
                  </p>
                </div>
                <div className="box2">
                  <p className="security">
                    <img src="/ic2.png" />
                  </p>
                  <h4
                    style={{
                      color: "#2cbbc7",
                      fontWeight: "700",
                      fontSize: "20px",
                    }}
                  >
                    High-speed transfers
                  </h4>
                  <p
                    className="icon-box-content"
                    style={{ color: "#000", fontSize: "12px" }}
                  >
                    Usually, users have to wait for one block to confirm for
                    their transactions to be processed. But not anymore. We use
                    public layers which release checkpoints after a specified
                    period allowing the side chains to operate at high speeds
                    while publishing the checkpoints in batches. Once you log in
                    to your wallet after the trade, your funds will be waiting
                    for you.
                  </p>
                </div>
                <div className="box3">
                  <p className="speed">
                    <img src="/ic3.png" />
                  </p>
                  <h4
                    style={{
                      color: "#faad53",
                      fontWeight: "700",
                      fontSize: "20px",
                    }}
                  >
                    Gas Proof
                  </h4>
                  <p
                    className="icon-box-content"
                    style={{ color: "#000", fontSize: "12px" }}
                  >
                    Users don’t have to go through the high barrier of high gas
                    costs anymore. With zero transaction costs from our gas
                    station network, it is now stress free to trade
                    decentralized style!
                  </p>
                </div>
                <div className="box4">
                  <p className="security">
                    <img src="/ic4.png" />
                  </p>
                  <h4
                    style={{
                      color: "#B647DD",
                      fontWeight: "700",
                      fontSize: "20px",
                    }}
                  >
                    Security first
                  </h4>
                  <p
                    className="icon-box-content"
                    style={{ color: "#000", fontSize: "12px" }}
                  >
                    Implementing Matic PoS Chain, a permissionless,
                    EVM-compatible, PoS-secured Ethereum sidechain which relies
                    on strong Ethereum security for validator staking and
                    checkpoints.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="faq-container">
        <section id="faq" className="faq">
          <div className="container">
            <div className="section-title">
              <h4 className="text-center pt-5">FAQ</h4>
              {/* <Faq data={faqs} config = {{
animate :true,}
}/> */}
              <div id="main">
                <div className="container">
                  <div className="accordion" id="faq">
                    <div className="card">
                      <div className="card-header" id="faqhead1">
                        <a
                          href="#"
                          className="btn btn-header-link"
                          data-toggle="collapse"
                          data-target="#faq1"
                          aria-expanded="true"
                          aria-controls="faq1"
                        >
                          {" "}
                          What is a decentralized exchange, and what makes it
                          different?
                        </a>
                      </div>

                      <div
                        id="faq1"
                        className="collapse show"
                        aria-labelledby="faqhead1"
                        data-parent="#faq"
                      >
                        <div className="card-body">
                          Unlike a centralized exchange, we don’t directly store
                          your assets. It gives you the safety and ability to
                          trade large volumes without having to worry about what
                          will happen next. In addition to that, there is no
                          log-in process required, meaning you don’t have to
                          provide your personal information, making the process
                          as anonymous as it gets. We appreciate the privacy
                          cryptocurrencies give us and don’t want to ruin it.
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-header" id="faqhead2">
                        <a
                          href="#"
                          className="btn btn-header-link collapsed"
                          data-toggle="collapse"
                          data-target="#faq2"
                          aria-expanded="true"
                          aria-controls="faq2"
                        >
                          How does your trading price and speed compared to
                          others?
                        </a>
                      </div>

                      <div
                        id="faq2"
                        className="collapse"
                        aria-labelledby="faqhead2"
                        data-parent="#faq"
                      >
                        <div className="card-body">
                          Using Layer 2 for transactions allows us for seamless
                          transfers for our customers with close to zero gas
                          fees included. With the average time of transaction
                          being around 30 seconds and the cost of over $6 for
                          Ethereum on various exchanges available on the market,
                          we were able to cut it down to approximately one
                          second with the cost of around $0.000002, making it
                          almost half a million times cheaper. However, we took
                          it a step further and deployed a gas station network
                          so that the gas fee is literally free!
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-header" id="faqhead1">
                        <a
                          href="#"
                          className="btn btn-header-link"
                          data-toggle="collapse"
                          data-target="#faq5"
                          aria-expanded="true"
                          aria-controls="faq1"
                        >
                          {" "}
                          Who can use MCFinance?
                        </a>
                      </div>

                      <div
                        id="faq5"
                        className="collapse"
                        aria-labelledby="faqhead1"
                        data-parent="#faq"
                      >
                        <div className="card-body">
                          We wanted to create a platform built by the community
                          for the community. Because of that, we have eliminated
                          the costly barriers of entry that might discourage
                          some cryptocurrency users, especially when they don’t
                          own much in their wallets, allowing everybody to
                          access DeFi.
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-header" id="faqhead3">
                        <a
                          href="#"
                          className="btn btn-header-link collapsed"
                          data-toggle="collapse"
                          data-target="#faq3"
                          aria-expanded="true"
                          aria-controls="faq3"
                        >
                          {" "}
                          How can I make money with MCFinance?
                        </a>
                      </div>

                      <div
                        id="faq3"
                        className="collapse"
                        aria-labelledby="faqhead3"
                        data-parent="#faq"
                      >
                        <div className="card-body">
                          If you decide to provide liquidity for trading pairs
                          on the platform, you will receive 0.25% of the trading
                          fees as well as MCFinance’s native MCF token for your
                          participation in this process and being a part of the
                          community. The token is governed by its holders, who
                          can create proposals for and vote on various factors
                          relating to the protocol, giving you partial control
                          over the platform.
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-header" id="faqhead3">
                        <a
                          href="#"
                          className="btn btn-header-link collapsed"
                          data-toggle="collapse"
                          data-target="#faq4"
                          aria-expanded="true"
                          aria-controls="faq3"
                        >
                          {" "}
                          What is the MCF token?
                        </a>
                      </div>

                      <div
                        id="faq4"
                        className="collapse"
                        aria-labelledby="faqhead3"
                        data-parent="#faq"
                      >
                        <div className="card-body">
                          MCF tokens are distributed between our community as a
                          reward for contributing to the community. Everybody
                          who contributes to the MCFinance exchange will receive
                          MCF tokens which are native to the platform. It helps
                          facilitate the trade and staking of multiple tokens,
                          giving our users even more flexibility. To ensure
                          stability, the tokens will be slowly released to the
                          public in phases with a lock period to avoid buy and
                          dump scenarios.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Login;
