import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../../auth";
import { readUser, updateUser, updateLocalStorage } from "./apiUser";
import { Redirect } from "react-router-dom";

export default function Profile({ match }) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    isUpdating: false,
    error: false,
    success: false,
  });

  const { token } = isAuthenticated();

  const { name, email, password, success } = values;

  const init = (userId) => {
    readUser(userId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({
          ...values,
          name: data.name,
          email: data.email,
        });
      }
    });
  };

  useEffect(() => {
    init(match.params.userId);
  }, []);

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(match.params.userId, token, { name, email, password }).then(
      (data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          updateLocalStorage(data, () => {
            setValues({
              ...values,
              name: data.name,
              email: data.email,
              success: true,
            });
          });
        }
      }
    );
  };

  const redirectUser = (success) => {
    if (success) {
      return <Redirect to={`/user/profile/${match.params.userId}`} />;
    }
  };

  const profileUpdate = (name, password) => (
    <form className="p-5">
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          onChange={handleChange("name")}
          value={name}
          className="form-control"
        />
      </div>
      <div className="form-group mb-5">
        <label className="text-muted">Password</label>
        <input
          type="password"
          onChange={handleChange("password")}
          value={password}
          className="form-control"
        />
      </div>
      <button className="btn btn-success btn-block" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );

  return (
    <Layout
      jumbotron
      title="Update Profile"
      description={`${name}, edit your profile.`}
    >
      {profileUpdate(name, password)}
      {redirectUser(success)}
    </Layout>
  );
}
