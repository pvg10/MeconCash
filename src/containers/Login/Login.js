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
      content: "Lorem ipsum dolor sit amet, consectetur, Lorem ipsum dolor sit amet, consectetur"
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
  //   root: {
  //     display: "flex",
  //     flexWrap: "wrap",
  //   },
  //   margin: {
  //     margin: theme.spacing(1),
  //   },
  //   withoutLabel: {
  //     marginTop: theme.spacing(3),
  //   },
  //   textField: {
  //     width: "25ch",
  //   },
  // }));
  // const classes = useStyles();

  // const onUserNameChange = (e) => {
  //   e.stopPropagation();
  //   setUserName(e.currentTarget.value);
  // };
  // const onPasswordChange = (e) => {
  //   e.stopPropagation();
  //   setPassword(e.currentTarget.value);
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
                    <p className="mcf" >
                      MCF DEX
                    </p>
                    <div className="mcf-content">

                    <p>
                      MCFinance is a decentralized exchange giving the power
                      back to the people.
                    </p>
                    <p>
                      Powered by Polygon, we offer secure and light-speed fast
                      transactions. Everybody can now trade cryptocurrencies
                      without costly fees that stop many from exchanging their
                      tokens, creating an environment where you can get the most
                      out of every block.
                    </p>
                    </div>
                    <p>
                      {/* FAAD53 */}
                      <button
                        type="button"
                        style={{ backgroundColor: "#FAAD53 !important" }}
                        className="btn btn-dark"
                      >
                        Launch
                      </button>
                      <button type="button" className="btn btn-dark">
                        White Paper
                      </button>
                    </p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <img src="/Group.png" />
                </div>
              </div>
            </div>
            {/* <h2>About</h2> */}
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
                      <p  style={{ color: "#7F8385", fontSize: "14px" }}>
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
                  <p className="icon-box-content" >
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
                  <p className="icon-box-content" style={{ color: "#000", fontSize: "12px" }}>
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
                  <p  className="icon-box-content" style={{ color: "#000", fontSize: "12px" }}>
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
                  <p  className="icon-box-content" style={{ color: "#000", fontSize: "12px" }}>
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
      
        <div id="accordion">
          <div className="card">
            <div className="card-header" id="headingOne">
              <h5 className="mb-0">
                <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  
                </button>
              </h5>
            </div>

            <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
              <div className="card-body">
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
              </div>
            </div>
          </div>
        </div>
        <Footer />
    </>
  );
}

export default Login;
