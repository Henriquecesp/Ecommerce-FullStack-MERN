import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../../auth";
import { itemTotal } from "../cart/cartHelpers";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return {
      borderBottom: "2px solid #63b446",
      color: "#fff",
      padding: "20px",
    };
  } else {
    return { color: "#fff", padding: "20px" };
  }
};

const Menu = ({ history }) => {
  const logout = () => {
    return (
      <li className="nav-item logout-btn">
        <span
          className="nav-link"
          style={{
            cursor: "pointer",
            padding: "20px",
            color: "white",
          }}
          onClick={() =>
            signout(() => {
              history.push("/");
            })
          }
        >
          <i className="fa fa-sign-out mr-2" style={{ color: "white" }}></i>
          Logout
        </span>
      </li>
    );
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ background: "#001e44" }}
      >
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <Link className="nav-link" style={isActive(history, "/")} to="/">
                <i className="fa fa-home mr-2"></i>Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/shop")}
                to="/shop"
              >
                <i className="fa fa-shopping-bag mr-2"></i>Shop
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/cart")}
                to="/cart"
              >
                <i className="fa fa-shopping-cart mr-2"></i>Cart{" "}
                <sup>
                  <span className="badge badge-pill badge-warning cart-badge">
                    <span style={{ fontSize: "12px", color: "white" }}>
                      <strong>{itemTotal()}</strong>
                    </span>
                  </span>
                </sup>
              </Link>
            </li>

            {isAuthenticated() && isAuthenticated().user.role === 0 && (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive(history, "/user/dashboard")}
                  to="/user/dashboard"
                >
                  <i className="fa fa-columns mr-2"></i>Dashboard
                </Link>
              </li>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    style={isActive(history, "/admin/dashboard")}
                    to="/admin/dashboard"
                  >
                    <i className="fa fa-cog mr-2"></i>Admin Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    style={isActive(history, "/user/dashboard")}
                    to="/user/dashboard"
                  >
                    <i className="fa fa-columns mr-2"></i>User Dashboard
                  </Link>
                </li>
              </>
            )}

            {!isAuthenticated() && (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    style={isActive(history, "/signin")}
                    to="/signin"
                  >
                    Signin
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link"
                    style={isActive(history, "/signup")}
                    to="/signup"
                  >
                    Signup
                  </Link>
                </li>
              </>
            )}
            {isAuthenticated() && (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    style={isActive(
                      history,
                      `/user/profile/${isAuthenticated().user._id}`
                    )}
                    to={`/user/profile/${isAuthenticated().user._id}`}
                  >
                    <i className="fa fa-user mr-2"></i>Profile
                  </Link>
                </li>
                {logout()}
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default withRouter(Menu);
