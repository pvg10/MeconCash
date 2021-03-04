import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./../../scss/login.scss";
import History from "../../routes/History";

// import { makeStyles } from "@material-ui/core/styles";

import LockIcon from "@material-ui/icons/Lock";
import Grid from "@material-ui/core/Grid";
import EmailIcon from "@material-ui/icons/Email";
import { TextField } from "@material-ui/core";
import { DSE_URL } from "../../utils/Constants";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../store/User/UserAction";
import { useStateMachine } from "little-state-machine";
import clearAction from "./clearAction";

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
      .post(DSE_URL + "/login", data)
      .then(function (response) {
        console.log(response);
        if (response.status == 200) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("VendorID", response.data.user.vendor_id);
          localStorage.setItem("vendorEmail", response.data.user.email);

          dispatch(setUserDetails(response.data.user));
          msgNode.style.display = "none";
          toast("We will be announcing our buying dates soon", {
            position: "top-center",
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
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
    <div className="row login-page">
      <div className="col-sm-3"></div>
      <div className="col-sm-6">
        <div className="login-form__block">
          <form onSubmit={handleSubmit(handleLogin)} id="login-form">
            <div className="login-form-heading text-center">
              <h4>Log In</h4>
            </div>

            <div className="form-group  field-group login-form__username-block">
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <EmailIcon />
                </Grid>
                <Grid item md={true} sm={true} xs={true}>
                  <TextField
                    id="Email"
                    label="Email"
                    type="email"
                    fullWidth
                    autoFocus
                    error={errors.email && true}
                    name="email"
                    inputRef={register({
                      required: true,
                      pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    })}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} alignItems="flex-start">
                <Grid item xs={1}></Grid>

                <Grid item xs={11}>
                  {errors.email && (
                    <p className="error-feild">This field is required</p>
                  )}
                </Grid>
              </Grid>
            </div>
            <div className="form-group  field-group login-form__password-block">
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <LockIcon />
                </Grid>
                <Grid item md={true} sm={true} xs={true}>
                  <TextField
                    id="password"
                    label="Password"
                    type="password"
                    fullWidth
                    name="password"
                    inputRef={register({
                      required: true,
                    })}
                    error={errors.password && true}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} alignItems="flex-start">
                <Grid item xs={1}></Grid>

                <Grid item xs={11}>
                  {errors.password && (
                    <p className="error-feild">This field is required</p>
                  )}
                </Grid>
              </Grid>
            </div>

            <div className="login-form__submit">
              <button type="submit" className="btn btn-default">
                LOGIN
              </button>
            </div>

            <div className="form-group" id="loginResText"></div>
          </form>
        </div>
      </div>
      <div className="col-sm-3"></div>
    </div>
  );
}

export default Login;
