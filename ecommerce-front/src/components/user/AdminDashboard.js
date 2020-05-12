import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../../auth";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const adminLinks = () => {
    return (
      <div className="card mb-5">
        <h4 className="card-header">Admin Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/create/category">
              New Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/create/product">
              New Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/orders">
              View Orders
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/product">
              Manage Products
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Admin Information</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <strong>Name:</strong> {name || ""}
          </li>
          <li className="list-group-item">
            <strong>Email:</strong> {email || ""}
          </li>
          <li className="list-group-item">
            <strong>Role:</strong> {role === 1 ? "Admin" : "User"}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Layout className="container-fluid">
      <div className="row">
        <div className="col-12 col-sm-3">{adminLinks()}</div>
        <div className="col-12 col-sm-9">{adminInfo()}</div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
