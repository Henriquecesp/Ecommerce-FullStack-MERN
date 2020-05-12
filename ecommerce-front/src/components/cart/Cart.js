import React, { useState, useEffect } from "react";
import { getCart } from "./cartHelpers";
import Layout from "../core/Layout";
import Card from "../core/Card";
import { Link } from "react-router-dom";
import Checkout from "./Checkout";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart);
  }, [run]);

  const showItems = (items) => {
    return (
      <>
        <h2 className="mb-4">
          Your cart has {items.length} {items.length === 1 ? "item" : "items"}
        </h2>
        <hr />
        {items.map((product, index) => (
          <Card cart run={run} setRun={setRun} key={index} product={product} />
        ))}
      </>
    );
  };

  const noItemsMessage = () => (
    <h2>
      Your cart is empty.
      <br />
      <Link to="/shop">Continue Shopping</Link>
    </h2>
  );

  return (
    <Layout
      jumbotron
      title="Your Cart"
      description="Add more products or proceed to Checkout!"
      className="container-fluid"
    >
      <Link
        to="/shop"
        className="btn mb-3"
        style={{ textDecorationLine: "underline" }}
      >
        <i className="fa fa-arrow-left mr-2"></i>
        Continue Shopping
      </Link>
      <div className="row">
        <div className="col-12 col-md-6">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>

        <div className="col-12 col-md-6">
          <h2 className="mb-4">Your cart summary</h2>
          <hr />
          <Checkout products={items} setRun={setRun} run={run} />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
