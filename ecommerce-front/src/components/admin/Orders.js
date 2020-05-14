import React, { useState, useEffect } from "react";
import { listOrders, getStatusValues, updateOrderStatus } from "./apiAdmin";
import { isAuthenticated } from "../../auth";
import Layout from "../core/Layout";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);

  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    listOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  const loadStatusValues = () => {
    getStatusValues(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatusValues(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
    loadStatusValues();
  }, []);

  const showOrdersLength = () => {
    if (orders.length > 0) {
      return (
        <h4 className="display-4" style={{ color: "#001e44" }}>
          Total orders: {orders.length}
        </h4>
      );
    } else {
      return <h1 className="text-danger display-2">No orders</h1>;
    }
  };

  const showInput = (key, value) => (
    <div className="input-group mb-2 mr-sm-2">
      <div className="input-group-prepend">
        <div className="input-group-text">{key}</div>
      </div>
      <input type="text" value={value} className="form-control" readOnly />
    </div>
  );

  const handleStatusChange = (e, orderId) => {
    updateOrderStatus(user._id, token, orderId, e.target.value).then((data) => {
      if (data.error) {
        console.log("Status update failed");
      } else {
        loadOrders();
      }
    });
  };

  const showStatus = (o) => (
    <div className="form-group">
      <h3 className="text-primary mb-2">{o.status}</h3>
      <select
        className="form-control"
        onChange={(e) => handleStatusChange(e, o._id)}
      >
        <option>Update Status</option>
        {statusValues.map((status, indexStatus) => (
          <option key={indexStatus} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <Layout
      jumbotron
      title="Orders"
      description={`Welcome, ${user.name}, manage all orders`}
    >
      {showOrdersLength()}
      {orders.map((order, orderIndex) => {
        return (
          <div
            className="mt-5"
            key={orderIndex}
            style={{
              padding: "15px",
              border: "2px solid #001e44",
            }}
          >
            <span>
              <strong>Order ID:</strong> {order._id}
            </span>
            <ul className="list-group mb-2">
              <li className="list-group-item">
                <strong>Status:</strong> {showStatus(order)}
              </li>
              <li className="list-group-item">
                <strong>Transaction ID:</strong> {order.transaction_id}
              </li>
              <li className="list-group-item">
                <strong>Amount: </strong>$ {order.amount}
              </li>
              <li className="list-group-item">
                <strong>Ordered by: </strong>
                {order.user.name}
              </li>
              <li className="list-group-item">
                <strong>Ordered on:</strong> {moment(order.createdAt).fromNow()}
              </li>
              <li className="list-group-item">
                <strong>Delivery Address:</strong> {order.address}
              </li>
            </ul>
            <h3 className="mt-4 mb-4 font-italic">
              <strong>Total Products in the order:</strong>{" "}
              {order.products.length}
            </h3>

            {order.products.map((product, productIndex) => (
              <div
                className="mb-4"
                key={productIndex}
                style={{
                  padding: "20px",
                  border: "3px solid rgb(39, 38, 55)",
                }}
              >
                {showInput("Product name", product.name)}
                {showInput("Product price", product.price)}
                {showInput("Product quantity", product.count)}
                {showInput("Product Id", product._id)}
              </div>
            ))}
          </div>
        );
      })}
    </Layout>
  );
};

export default Orders;
