import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../../auth";
import { Link } from "react-router-dom";
import {
  getBraintreeClientToken,
  processPayment,
  createOrder,
} from "../core/apiCore";
import DropIn from "braintree-web-drop-in-react";
import { emptyCart } from "./cartHelpers";

const Checkout = ({ products, setRun = (f) => f, run = undefined }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: "",
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data.error) {
        setData({ ...data, error: data.error });
      } else {
        setData({ clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
    console.log(data);
  }, []);

  const handleAddress = (event) => {
    setData({ ...data, address: event.target.value });
  };

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showError = (error) => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccces = (success) => (
    <div
      className="alert alert-primary"
      style={{ display: success ? "" : "none" }}
    >
      Thanks! Your payment was successful!
    </div>
  );

  const showLoading = (loading) => loading && <h2>Loading ...</h2>;

  let deliveryAddress = data.address;

  const buy = () => {
    setData({ loading: true });
    // send nonce to backend
    // nonce = data.instance.requestPaymentMethod()
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        // console.log(data);
        nonce = data.nonce;
        // once you have nonce (card type, card number etc..) send nonce as
        // paymentmethodnonce to backend
        // // and also total to be charged
        // console.log("send nonce and total to process");
        // console.log(nonce, getTotal(products));
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products),
        };

        processPayment(userId, token, paymentData)
          .then((response) => {
            // console.log(response)
            setData({ ...data, success: response.success });
            const createOrderData = {
              products: products,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
              address: deliveryAddress,
            };
            // create order
            createOrder(userId, token, createOrderData).then((response) => {
              // empty cart
              emptyCart(() => {
                setRun(!run); // run useEffect in parent Cart
                console.log("payment success and cart empty");
              });
              setData({ loading: false, success: true });
            });
          })
          .catch((error) => {
            console.log(error);
            setData({ loading: false });
          });
      })
      .catch((error) => {
        // console.log("dropin error: ", error);
        setData({ ...data, error: error.message });
      });
  };

  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: "" })}>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <div className="form-group mb-3">
            <label className="text-muted">Delivery address:</label>
            <textarea
              onChange={handleAddress}
              className="form-control"
              value={data.address}
              placeholder="Type your delivery address here..."
              required
            />
          </div>
          <DropIn
            options={{
              authorization: data.clientToken,
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <button onClick={buy} className="btn btn-success btn-block mb-5">
            Pay now
          </button>
        </div>
      ) : null}
    </div>
  );

  return (
    <>
      {showLoading(data.loading)}
      {showError(data.error)}
      {showSuccces(data.success)}
      <h2 className="mb-4">Total: ${getTotal()}</h2>
      {isAuthenticated() ? (
        showDropIn()
      ) : (
        <Link to="/signin">
          <button className="btn btn-primary">Sign in to Checkout</button>
        </Link>
      )}
    </>
  );
};

export default Checkout;
