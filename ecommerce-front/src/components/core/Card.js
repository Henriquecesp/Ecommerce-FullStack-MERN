import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import { addItem, updateItem, removeItem } from "../cart/cartHelpers";

const Card = ({
  product,
  showViewProductButton = true,
  single = false,
  cart = false,
  setRun = (f) => f,
  run = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = (showViewProductButton, cart) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} style={{ textDecoration: "none" }}>
          <button
            className={`btn btn-outline-info mt-2 mb-2 mr-2 ${
              cart ? "btn-block" : ""
            }`}
          >
            View Product
          </button>
        </Link>
      )
    );
  };

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddedToCartButton = (quantity) => {
    return quantity > 0 ? (
      <button onClick={addToCart} className="btn btn-success mt-2 mb-2">
        Add to Cart
      </button>
    ) : (
      // <span className="btn btn-dark mt-2 mb-2 disabled">Add to Cart</span>
      <button disabled className="btn btn-danger disabled">
        Out of Stock
      </button>
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="h6">{quantity} In Stock</span>
    ) : // <span className="badge badge-danger badge-pill p-2">Out of Stock</span>
    null;
  };

  const multiProducts = () => {
    return (
      <div className="col-12 col-sm-6 col-lg-4 mb-3">
        <div className="card h-100">
          <div className="card-body">
            <div className="card-content">
              <Link to={`/product/${product._id}`}>
                <ShowImage item={product} url="product" />
              </Link>
              <h5 className="card-title bold">{product.name}</h5>
              <p className="lead mt-2">
                {product.description.substring(0, 100)}...
              </p>
              <h4>R$ {product.price}</h4>
            </div>
            <hr />
            <p className="h6">
              Category: {product.category && product.category.name}
            </p>
            <p>Added on {moment(product.createdAt).fromNow()}</p>
            {showStock(product.quantity)}
            <br />
            {showViewButton(showViewProductButton)}
            {showAddedToCartButton(product.quantity)}
          </div>
        </div>
      </div>
    );
  };

  const singleProduct = () => {
    return (
      <div className="container card">
        <div className="row p-3">
          <div className="col-12 col-md-5">
            <ShowImage item={product} url="product" />
          </div>
          <div className="col-12 col-md-7">
            <h5 className="card-title bold">{product.name}</h5>
            <p className="lead mt-2">
              {product.description.substring(0, 100)}...
            </p>
            <h4>R$ {product.price}</h4>
            <hr />
            <p className="h6">
              Category: {product.category && product.category.name}
            </p>
            <p>Added on {moment(product.createdAt).fromNow()}</p>
            {showStock(product.quantity)}
            <br />
            {showViewButton(showViewProductButton)}
            {showAddedToCartButton(product.quantity)}
          </div>
        </div>
      </div>
    );
  };

  const handleChange = (productId) => (event) => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const cartProduct = () => {
    return (
      <>
        <div className="row">
          <Link to={`/product/${product._id}`}>
            <ShowImage miniature item={product} url="product" />
          </Link>
          <div className="col-5 ml-2">
            <h5 className="card-title bold">{product.name}</h5>
            <h4>R$ {product.price}</h4>
            <p className="h6">
              Category: {product.category && product.category.name}
            </p>
            <p>Added on {moment(product.createdAt).fromNow()}</p>
          </div>
          <div className="col-12 col-md-4">
            {showViewButton(showViewProductButton, cart)}
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <span className="input-group-text">Quantity</span>
              </div>
              <input
                type="number"
                className="form-control"
                value={count}
                onChange={handleChange(product._id)}
              />
            </div>
            <button
              className="btn btn-danger btn-block"
              onClick={() => {
                removeItem(product._id);
                setRun(!run);
              }}
            >
              Remove Item
            </button>
          </div>
        </div>
        <hr />
      </>
    );
  };

  return (
    <>
      {shouldRedirect(redirect)}
      {cart ? cartProduct() : single ? singleProduct() : multiProducts()}
    </>
  );
};

export default Card;
