import React from "react";
import Menu from "../menu/Menu";
import "../../styles.scss";

const Layout = ({ className, children, jumbotron, title, description }) => (
  <div style={{ minHeight: "100vh" }}>
    <Menu />
    {jumbotron ? (
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-6">
            <strong>{(title && title.substring(0, 15)) || "Title"}</strong>
          </h1>
          <p className="lead ml-1">
            {(description && description.substring(0, 50)) || "Description"}
          </p>
        </div>
      </div>
    ) : (
      <br />
    )}
    <div className={className ? className : "container col-10 col-xl-8"}>
      {children}
    </div>
  </div>
);
export default Layout;
