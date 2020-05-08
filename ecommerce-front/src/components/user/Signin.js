import React, { useState } from "react";
import { signin, authenticate } from "../../auth";
import { Redirect } from "react-router-dom";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, loading, error, redirectToReferrer } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: "", [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true, error: "" });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          loading: false,
        });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true,
          });
        });
      }
    });
  };

  const signInForm = () => (
    <>
      <br />
      <h1 style={{ textAlign: "center" }}>Login</h1>
      <form>
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
          <label for="exampleInputPassword1">Password</label>
          <input
            class="form-control"
            id="exampleInputPassword1"
            onChange={handleChange("password")}
            type="password"
            value={password}
          />
        </div>
        <br />
        <button
          disabled={loading}
          class="btn btn-dark btn-lg btn-block"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </>
  );

  const showError = () => (
    <>
      <br />
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    </>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      return <Redirect to="/" />;
    }
  };

  return (
    <>
      {showError()}
      {loading ? showLoading() : signInForm()}
      {redirectUser()}
    </>
  );
};

export default Signin;
