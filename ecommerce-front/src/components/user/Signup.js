import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signup } from "../../auth";
import Layout from "../core/Layout";
import { toast, ToastContainer } from "react-toastify";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
    loading: false,
  });

  const { email, name, password, loading, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: "", [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true, error: "" });
    signup({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          success: false,
          loading: false,
        });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
          loading: false,
        });
      }
    });
  };

  const errorToast = () => (
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    console.log("error");
    setValues({ ...values, error: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const signUpForm = () => (
    <>
      <h1 style={{ textAlign: "center" }}>Register</h1>
      <form>
        <div className="form-group">
          <label for="exampleInputName1">Name</label>
          <input
            id="exampleInputName1"
            class="form-control"
            onChange={handleChange("name")}
            type="text"
            value={name}
          />
        </div>

        <div className="form-group">
          <label for="exampleInputEmail1">Email</label>
          <div class="input-group mb-3">
            <input
              class="form-control"
              id="exampleInputEmail1"
              onChange={handleChange("email")}
              type="email"
              value={email}
            />
            <div class="input-group-append">
              <span class="input-group-text" id="basic-addon2">
                @example.com
              </span>
            </div>
          </div>
          <small id="emailHelp" class="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label for="inputExamplePassword1">Password</label>
          <input
            id="inputExamplePassword1"
            class="form-control"
            onChange={handleChange("password")}
            type="password"
            value={password}
          />
        </div>
        <br />
        <button
          class="btn btn-dark btn-lg btn-block"
          disabled={loading}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </>
  );

  const showError = () => (
    <>
      {errorToast()}
      {/* <br />
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div> */}
    </>
  );

  const showSucces = () => (
    <>
      <br />
      <div
        className="alert alert-info"
        style={{ display: success ? "" : "none" }}
      >
        New account is created. Please <Link to="/signin">Signin</Link>
      </div>
    </>
  );

  return (
    <Layout>
      {showError()}
      {showSucces()}
      {signUpForm()}
    </Layout>
  );
};

export default Signup;
