import React, { useState, useEffect } from "react";
import { getCategories } from "../admin/apiAdmin";
import { list } from "./apiCore";
import Card from "./Card";
import { errorToast } from "../../helpers/toast";
import { toast } from "react-toastify";

const SearchBar = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });
  const [error, setError] = useState(false);

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

  const loadCategories = () => {
    getCategories().then((data) => {
      console.log(data);

      if (data === undefined) {
        setError(true);
      } else {
        setError(false);
        setData({ ...data, categories: data });
      }
    });
  };

  const { categories, category, search, results, searched } = data;

  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    if (search) {
      list({ search: search || undefined, category: category }).then(
        (response) => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({ ...data, results: response, searched: true });
          }
        }
      );
    }
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };

  const handleChange = (name) => (e) => {
    setData({ ...data, [name]: e.target.value, searched: false });
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} product`;
    }
    if (searched && results.length > 1) {
      return `Found ${results.length} products`;
    }
    if (searched && results.length < 1) {
      return `No products found`;
    }
  };

  const searchedProducts = (results = []) => {
    return (
      <div>
        <h2 className="mt-4 mb-4">{searchMessage(searched, results)}</h2>
        <div className="row">
          {results.map((product, i) => (
            <Card key={i} product={product} />
          ))}
        </div>
      </div>
    );
  };

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <span className="input-group-text mb-4">
        <div className="input-group">
          <div className="input-group-prepend">
            <select
              name=""
              id=""
              className="btn mr-2"
              style={{ maxWidth: "150px" }}
              onChange={handleChange("category")}
            >
              <option value="All">All Category</option>
              {categories.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <input
            type="search"
            className="form-control"
            onChange={handleChange("search")}
            placeholder="Search by name"
          />
        </div>
        <div className="btn input-group-append" style={{ border: "none" }}>
          <button className="input-group-text">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </span>
    </form>
  );

  return (
    <div className="row">
      {errorToast()}
      <div className="container b-3">{searchForm()}</div>
      <div className="container-fluid mb-3">{searchedProducts(results)}</div>
    </div>
  );
};

export default SearchBar;
