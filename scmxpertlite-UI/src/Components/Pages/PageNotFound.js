import React from "react";
import img from "./404-page.png";

function PageNotFound() {
  return (
    <div>
      <img
        style={{ width: "99vw", height: "99vh" }}
        src={img}
        alt="page not found"
      ></img>
    </div>
  );
}

export default PageNotFound;
