import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../../auth";
import { readUser } from "./apiUser";
import { Redirect } from "react-router-dom";

export default function Profile({ match }) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    error: false,
    goToUpdate: false,
  });

  const { token } = isAuthenticated();

  const { name, email, goToUpdate } = values;

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

  const redirectToUpdate = (goToUpdate) => {
    if (goToUpdate) {
      return <Redirect to={`/user/profile/edit/${match.params.userId}`} />;
    }
  };

  const profileInfo = (name, email) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input type="text" value={name} className="form-control" readOnly />
      </div>
      <div className="form-group mb-5">
        <label className="text-muted">Email</label>
        <input type="email" value={email} className="form-control" readOnly />
      </div>
      <button
        className="btn btn-primary btn-block"
        onClick={() => setValues({ ...values, goToUpdate: true })}
      >
        Update profile
      </button>
    </form>
  );

  return (
    <Layout jumbotron title="Profile" description={`${name}, your profile.`}>
      {profileInfo(name, email)}
      {redirectToUpdate(goToUpdate)}
    </Layout>
  );
}
