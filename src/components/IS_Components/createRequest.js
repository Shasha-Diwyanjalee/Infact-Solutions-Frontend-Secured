import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import "./reqstyles.css";
import MainHome from "../SS_Components/MainHome";
import Footer from "../Project_Layouts/footer";
import { toast } from "react-toastify";

toast.configure();

export default class CreateRequestproduct extends Component {
  constructor(props) {
    super(props);
    this.onChangeItemname = this.onChangeItemname.bind(this);
    this.onChangeBrand = this.onChangeBrand.bind(this);
    this.onChangeModel = this.onChangeModel.bind(this);
    this.onChangeVersion = this.onChangeVersion.bind(this);
    this.onChangeUserId = this.onChangeUserId.bind(this);
    this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      itemname: "",
      brand: "",
      model: "",
      version: "",
      userID: "",
      userEmail: "",
      open: false,
      validationErrors: {},
    };
  }

  handleClose(reason) {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  }

  validateInputs = () => {
    const { itemname, brand, model, version, userEmail } = this.state;

    const validationErrors = {};

    // Email validation regex pattern
    const emailPattern =
      /^(?!.*\.{2})(?!.*@[-.])(?!.*[-.]@)([a-zA-Z\d.-]{1,64})@([a-zA-Z\d.-]+)\.([a-zA-Z]{2,14})$/;

    // Define the pattern for valid characters (alphanumeric and spaces)
    const pattern = /^[a-zA-Z0-9\s]+$/;

    if (!itemname) {
      validationErrors.itemname = "Please enter an item name.";
    } else if (!pattern.test(itemname)) {
      validationErrors.itemname = "Invalid characters detected.";
    } else {
      validationErrors.itemname = "";
    }

    if (!brand) {
      validationErrors.brand = "Please enter a brand name.";
    } else if (!pattern.test(brand)) {
      validationErrors.brand = "Invalid characters detected.";
    } else {
      validationErrors.brand = "";
    }

    if (!model) {
      validationErrors.model = "Please enter a model.";
    } else if (!pattern.test(model)) {
      validationErrors.model = "Invalid characters detected.";
    } else {
      validationErrors.model = "";
    }

    if (!version) {
      validationErrors.version = "Please enter a version.";
    } else if (!pattern.test(version)) {
      validationErrors.version = "Invalid characters detected.";
    } else {
      validationErrors.version = "";
    }

    if (!userEmail || !emailPattern.test(userEmail)) {
      validationErrors.userEmail = "Please enter a valid email address.";
    } else {
      validationErrors.userEmail = "";
    }

    this.setState({ validationErrors });
    return Object.keys(validationErrors).every((key) => !validationErrors[key]);
  };

  onChangeItemname(e) {
    const value = e.target.value;
    this.setState({
      itemname: value,
    });
  }

  onChangeBrand(e) {
    const value = e.target.value;
    this.setState({
      brand: value,
    });
  }

  onChangeModel(e) {
    const value = e.target.value;
    this.setState({
      model: value,
    });
  }

  onChangeVersion(e) {
    const value = e.target.value;
    this.setState({
      version: value,
    });
  }

  onChangeUserId(e) {
    this.setState({
      userID: e.target.value,
    });
  }

  onChangeUserEmail(e) {
    this.setState({
      userEmail: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.validateInputs());

    if (this.validateInputs()) {
      const requestproduct = {
        itemname: this.state.itemname,
        brand: this.state.brand,
        model: this.state.model,
        version: this.state.version,
        userEmail: this.state.userEmail,
      };

      const authToken = document.cookie.includes("computer");

      if (!authToken) {
        toast.warning("Please log in to create a request.", {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      }

      const config = {
        headers: {
          Authorization: authToken,
        },
      };

      axios
        .post("http://localhost:8070/requests/add", requestproduct, config)
        .then((res) => {
          console.log(res.data);
          toast.success("Request created successfully.", {
            position: toast.POSITION.TOP_CENTER,
          });
          window.location = "/profile";
        })
        .catch((err) => {
          console.log(err);
          this.setState({ open: true });
        });
    }
  }

  render() {
    const { itemname, brand, model, version, userEmail, validationErrors } =
      this.state;

    return (
      <div class="bod">
        <MainHome />
        <div className="container pt-5">
          <Snackbar
            open={this.state.open}
            autoHideDuration={3000}
            onClose={this.handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            <div className="alert alert-danger">
              Plase login to the Application
            </div>
          </Snackbar>

          <div
            className="card o-hidden border-1 shadow-lg my-2"
            style={{ background: "#272E48" }}
          >
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-7 d-none d-lg-block bg-request-book"></div>
                <div className="col-lg-5">
                  <div className="col-md-9 mt-4 mx-auto">
                    <div className="text-center text-color pt-2">
                      <h1 className="text-gray-900 mb-4">Request Item</h1>
                    </div>
                    <form onSubmit={this.onSubmit} className="text-color">
                      <div className="form-group">
                        <label>Item Name</label>
                        <input
                          type="text"
                          required
                          className={`form-control ${
                            validationErrors.itemname ? "is-invalid" : ""
                          }`}
                          placeholder="Enter Item Name"
                          value={itemname}
                          onChange={this.onChangeItemname}
                        />
                        {validationErrors.itemname && (
                          <div className="invalid-feedback">
                            {validationErrors.itemname}
                          </div>
                        )}
                      </div>
                      <br />
                      <div className="form-group">
                        <label>Brand</label>
                        <input
                          type="text"
                          required
                          className={`form-control ${
                            validationErrors.brand ? "is-invalid" : ""
                          }`}
                          placeholder="Enter the Brand Name"
                          value={brand}
                          onChange={this.onChangeBrand}
                        />
                        {validationErrors.brand && (
                          <div className="invalid-feedback">
                            {validationErrors.brand}
                          </div>
                        )}
                      </div>
                      <br />
                      <div className="form-group">
                        <label>Model</label>
                        <input
                          type="text"
                          required
                          className={`form-control ${
                            validationErrors.model ? "is-invalid" : ""
                          }`}
                          placeholder="Enter the model"
                          value={model}
                          onChange={this.onChangeModel}
                        />
                        {validationErrors.model && (
                          <div className="invalid-feedback">
                            {validationErrors.model}
                          </div>
                        )}
                      </div>
                      <br />
                      <div className="form-group">
                        <label>Version</label>
                        <input
                          type="text"
                          required
                          className={`form-control ${
                            validationErrors.version ? "is-invalid" : ""
                          }`}
                          placeholder="Enter the version"
                          value={version}
                          onChange={this.onChangeVersion}
                        />
                        {validationErrors.version && (
                          <div className="invalid-feedback">
                            {validationErrors.version}
                          </div>
                        )}
                      </div>
                      <br />
                      <div className="form-group">
                        <label>User Email</label>
                        <input
                          inputMode="email"
                          required
                          className={`form-control ${
                            validationErrors.userEmail ? "is-invalid" : ""
                          }`}
                          placeholder="Enter the Email"
                          value={userEmail}
                          onChange={this.onChangeUserEmail}
                        />
                        {validationErrors.userEmail && (
                          <div className="invalid-feedback">
                            {validationErrors.userEmail}
                          </div>
                        )}
                      </div>
                      <br />
                      <br />
                      <center>
                        <Button
                          variant="contained"
                          className="w-10"
                          style={{
                            background: "#0f57fff1",
                            width: 80 + "%",
                            color: "white",
                          }}
                          startIcon={<SendIcon />}
                          disableElevation
                          type="submit"
                        >
                          Request this item
                        </Button>
                      </center>
                      <br />
                      <br />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
