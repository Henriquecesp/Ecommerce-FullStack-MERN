import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { read, listRelated } from "./apiCore";
import Card from "./Card";
import { ToastContainer, toast } from "react-toastify";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        // fetch related products
        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };

  const errorToast = () => (
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    console.log("error");
    setError("");
  }, [error]);

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  return (
    <Layout
      jumbotron
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      className="container-fluid"
    >
      {errorToast()}
      <div className="row">
        {product && product.description && (
          <Card single product={product} showViewProductButton={false} />
        )}
      </div>
      <hr className="m-5" />
      <h2 className="ml-5 mb-5">Related products</h2>
      <div className="row ml-4 mr-4">
        {relatedProduct.map((product, index) => (
          <Card key={index} product={product} />
        ))}
      </div>
    </Layout>
  );
};

export default Product;
