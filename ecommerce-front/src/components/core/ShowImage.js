import React from "react";
import { API } from "../../config";

const ShowImage = ({ item, url, miniature = false }) => {
  return (
    <div className={miniature ? "miniature-img ml-3" : "product-img"}>
      <img
        src={`${API}/${url}/photo/${item._id}`}
        alt={item.name}
        className="mb-3"
        style={{
          maxHeight: "100%",
          maxWidth: "100%",
          minWidth: "100%",
        }}
      />
    </div>
  );
};

export default ShowImage;
