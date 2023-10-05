import React, { Component } from "react";
import axios from "axios";
//import background from "../images/dima.jpg";
import { toast } from "react-toastify";
import MainHome from "../../SS_Components/MainHome";
import Footer from "../../Project_Layouts/footer";
import { FaGoogle, FaFacebook } from "react-icons/fa";

export default class CusLogin extends Component {
  constructor(props) {
    super(props);
    this.userLoginSubmit = this.userLoginSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      email: "",
      pwd: "",
      token: "",
      open: false,
    };
  }

  async userLoginSubmit(e) {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      pwd: this.state.pwd,
    };

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailPattern.test(this.state.email)) {
      toast.warning("Invalid email format", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    await axios
      .post("http://localhost:8070/customer/login", userData)
      .then((res) => {
        console.log(res.data);
        this.setState({
          token: res.data.token,
        });
        localStorage.setItem("Authorization", res.data.token);
        window.location = "/home1";
        toast.success("loging successfull", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((err) => {
        this.setState({ open: true });
        toast.warning(err.response.data.error, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  }

  handleClose(reason) {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  }

  // handleGoogleLogin = () => {
  //   const userData = {
  //     email: "googleuser@example.com",
  //     pwd: "googlepassword",
  //   };

  //   axios
  //     .post("http://localhost:8070/customer/google-login", userData)
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  // handleFacebookLogin = () => {
  //   const userData = {
  //     email: "facebookuser@example.com",
  //     pwd: "facebookpassword",
  //   };

  //   axios
  //     .post("http://localhost:8070/customer/facebook-login", userData)
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  render() {
    return (
      <div class="body">
        <MainHome />
        <div class="container">
          <div class="frame1">
            <div class="nav">
              <ul class="links">
                <li class="signin-active">
                  <a href="/login" class="btn">
                    Sign in
                  </a>
                </li>
              </ul>
            </div>
            <div ng-app ng-init="checked = false">
              <form
                onSubmit={this.userLoginSubmit}
                class="form1-signin1"
                name="form"
              >
                <label class="label" for="email">
                  Email
                </label>
                <input
                  class="form1-styling1"
                  type="text"
                  name="username"
                  placeholder="Enter your Email"
                  onChange={(e) => this.setState({ email: e.target.value })}
                  required
                />
                <br />
                <br />
                <label class="label" for="password">
                  Password
                </label>
                <input
                  class="form1-styling1"
                  type="password"
                  name="password"
                  placeholder="Enter your Password"
                  onChange={(e) => this.setState({ pwd: e.target.value })}
                  required
                />
                <br />
                <button type="submit" class="btn-animate">
                  Login
                </button>
              </form>
            </div>
            <center>
              <label class="label">Not Registered?</label>
            </center>
            <center>
              <div class="signin-active">
                <a href="/signup" class="btn">
                  Sign Up
                </a>
              </div>
            </center>
            <center>
              <div className="social-buttons">
                <button
                  className="google-button"
                  onClick={() => {
                    window.location.href = "http://localhost:8070/auth/google";
                  }}
                >
                  <FaGoogle className="icon" />
                  Google
                </button>
                <button
                  className="facebook-button"
                  onClick={() => {
                    window.location.href =
                      "http://localhost:8070/auth/facebook";
                  }}
                >
                  <FaFacebook className="icon" />
                  Facebook
                </button>
              </div>
            </center>
            <div></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
