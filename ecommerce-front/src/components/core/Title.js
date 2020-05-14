import React from "react";

const Title = ({ name, title }) => {
  return (
    <div className="col-10 mx-auto my-3 text-center text-title">
      <h1 className="display-3">
        <span className="text-primary">
          {name}
          <strong className="text-dark"> {title}</strong>
        </span>
      </h1>
    </div>
  );
};

export default Title;
