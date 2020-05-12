import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { getProducts, deleteProduct } from "./apiAdmin";
import { isAuthenticated } from "../../auth";
import { Link } from "react-router-dom";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  const destroy = (productId) => {
    let confirm = window.confirm("Are you sure you want to delete that item ?");
    if (confirm) {
      deleteProduct(productId, user._id, token).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          loadProducts();
        }
      });
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Layout
      jumbotron
      title="Manage Products"
      description="Edit and delete products(CRUD)"
    >
      <div className="row">
        <div className="col-12 mb-5">
          <h2 className="text-center mb-3">Total {products.length} products</h2>
          <ul className="list-group">
            {products.map((p, i) => (
              <li
                key={i}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <strong className="text-minify">{p.name}</strong>
                <div>
                  <Link to={`/admin/product/update/${p._id}`}>
                    <button className="btn btn-info mr-3">Update</button>
                  </Link>
                  <button
                    onClick={() => destroy(p._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}
