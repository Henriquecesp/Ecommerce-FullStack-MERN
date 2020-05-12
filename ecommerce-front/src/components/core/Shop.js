import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getFilteredProducts } from "./apiCore";
import { getCategories } from "../admin/apiAdmin";
import Checkbox from "./Checkbox";
import { prices } from "./fixedPrices";
import RadioBox from "./RadioBox";
import Card from "./Card";
import { ToastContainer, toast } from "react-toastify";

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit] = useState(8);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);

  // load categories and set form data
  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const loadFilteredResults = (newFilters) => {
    // console.log(newFilters);
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  const loadMore = () => {
    let toSkip = skip + limit;
    // console.log(newFilters);
    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={loadMore} className="btn btn-outline-dark mb-5">
            Load More...
          </button>
        </div>
      )
    );
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
    init();
    loadFilteredResults(skip, limit, myFilters.filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilters = (filters, filterBy) => {
    console.log("Shop", filters, filterBy);
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  const handlePrice = (value) => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  return (
    <Layout
      jumbotron
      title="Shop"
      description="Search and find the best product for you"
      className="container-fluid"
    >
      {errorToast()}
      <div className="row">
        <div className="col-12 col-md-4 col-xl-2">
          <h4>Filter by categories</h4>
          <ul>
            <Checkbox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
          </ul>
          <h4>Filter by prices</h4>
          <div>
            <RadioBox
              prices={prices}
              handleFilters={(filters) => handleFilters(filters, "price")}
            />
          </div>
        </div>
        <div className="col-12 col-md-8 col-xl-10">
          <h2 className="mb-4">Products</h2>
          <div className="row">
            {filteredResults.map((product, i) => (
              <Card key={i} product={product} />
            ))}
          </div>
          {loadMoreButton()}
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
