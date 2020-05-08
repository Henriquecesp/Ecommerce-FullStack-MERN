import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../../auth";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { background: "purple", color: "#fff", padding: "20px" };
  } else {
    return { color: "#fff", padding: "20px" };
  }
};

const Menu = ({ history }) => {
  const routes = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Login",
      link: "/signin",
    },
    {
      name: "Register",
      link: "/signup",
    },
  ];
  const routesAuth = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Dashboard",
      link: "/dashboard",
    },
  ];
  return (
    <>
      <ul
        className="nav nav-tabs justify-content-center"
        style={{ background: "black" }}
      >
        {!isAuthenticated() && (
          <>
            {routes.map((item) => (
              <li className="nav-item" key={item.name}>
                <Link
                  className="nav-link"
                  style={isActive(history, item.link)}
                  to={item.link}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </>
        )}
        {isAuthenticated() && (
          <>
            {routesAuth.map((item) => (
              <li className="nav-item" key={item.name}>
                <Link
                  className="nav-link"
                  style={isActive(history, item.link)}
                  to={item.link}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li className="nav-item">
              <span
                className="nav-link"
                style={{ cursor: "pointer", padding: "20px", color: "white" }}
                onClick={() =>
                  signout(() => {
                    history.push("/");
                  })
                }
              >
                Logout
              </span>
            </li>
          </>
        )}
      </ul>
    </>
  );
};

export default withRouter(Menu);
