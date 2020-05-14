import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../../auth";
import { createCategory } from "./apiAdmin";
import { Link } from "react-router-dom";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // destructure user and token from localstorage
  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError(false);
    setSuccess(false);
    setName(e.target.value);
  };
  const handleSubmit = (e) => {
    setError(false);
    setSuccess(false);
    e.preventDefault();
    //make request to api
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError(false);
        setSuccess(true);
      }
    });
  };

  const newCategoryForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label for="inputname">Name</label>
        <input
          id="inputname"
          class={
            success
              ? "form-control is-valid"
              : error
              ? "form-control is-invalid"
              : "form-control"
          }
          type="text"
          onChange={handleChange}
          value={name}
          required
          autoFocus
        />
      </div>
      <button class="btn btn-dark btn-block">Create Category</button>
      <br />
      {goBack()}
    </form>
  );

  const showSuccess = () => {
    if (success) {
      return (
        <div className="alert alert-primary" role="alert">
          Category {name} created!
        </div>
      );
    }
  };

  const showError = () => {
    if (error) {
      return (
        <div className="alert alert-danger" role="alert">
          Category name should be unique, {name} already exist!
        </div>
      );
    }
  };

  const goBack = () => (
    <Link to="/admin/dashboard" className="text-dark">
      Back to dashboard
    </Link>
  );

  return (
    <Layout>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showError()}
          {showSuccess()}
          {newCategoryForm()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
