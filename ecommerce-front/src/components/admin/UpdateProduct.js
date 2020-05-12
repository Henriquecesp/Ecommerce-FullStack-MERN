import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../../auth";
import { getSingleProduct, getCategories, updateProduct } from "./apiAdmin";
import { Redirect } from "react-router-dom";

const UpdateProduct = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    bonusProvider: "",
    available: false,
    loading: false,
    error: "",
    updatedAt: "",
    formData: "",
    redirectToProfile: false,
  });

  const { user, token } = isAuthenticated();
  const {
    name,
    description,
    price,
    categories,
    category,
    quantity,
    loading,
    error,
    available,
    shipping,
    bonusProvider,
    redirectToProfile,
    updatedAt,
    formData,
  } = values;

  const init = (productId) => {
    getSingleProduct(productId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        // populate state
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category._id,
          shipping: data.shipping,
          quantity: data.quantity,
          bonusProvider: data.bonusProvider,
          available: data.available,
          formData: new FormData(),
        });
        //loadcategories
        initCategories();
      }
    });
  };
  // load categories and set form data
  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    init(match.params.productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, error: "", [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    updateProduct(match.params.productId, user._id, token, formData).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            photo: "",
            price: "",
            quantity: "",
            loading: false,
            bonusProvider: "",
            available: "",
            redirectToProfile: true,
            updatedAt: data.name,
          });
        }
      }
    );
  };

  const newPostUpdateForm = () => (
    <form className="mb-3" onSubmit={handleSubmit}>
      <h4>Post Photo</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image/*"
          />
        </label>
      </div>

      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Description</label>
        <textarea
          onChange={handleChange("description")}
          className="form-control"
          value={description}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Price</label>
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          value={price}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Bonus Provider</label>
        <input
          onChange={handleChange("bonusProvider")}
          type="number"
          className="form-control"
          value={bonusProvider}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Category</label>
        <select
          value={category}
          onChange={handleChange("category")}
          className="form-control"
        >
          <option hidden>Please select</option>
          {categories &&
            categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Shipping</label>
        <select
          value={shipping}
          onChange={handleChange("shipping")}
          className="form-control"
        >
          <option disabled selected hidden value="">
            Please select
          </option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Available</label>
        <select
          value={available}
          onChange={handleChange("available")}
          className="form-control"
        >
          <option disabled selected hidden value="">
            Please select
          </option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Quantity</label>
        <input
          onChange={handleChange("quantity")}
          type="number"
          className="form-control"
          value={quantity}
        />
      </div>
      <button className="btn btn-dark btn-block">Update Product</button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: updatedAt ? "" : "none" }}
    >
      {`${updatedAt}`}, updated!
    </div>
  );

  const showLoading = () =>
    loading && <div className="alert alert-info">Loading...</div>;

  const redirectUser = () => {
    if (redirectToProfile) {
      if (!error) {
        return <Redirect to="/admin/product" />;
      }
    }
  };
  return (
    <Layout
      title="Add a new product"
      description={`G'day ${user.name}, ready to update the product?`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newPostUpdateForm()}
          {redirectUser()}
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
