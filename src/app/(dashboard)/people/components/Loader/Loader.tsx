import React from "react";

function Loader() {
  return (
    <div role="status">
      <span className="sr-only animate-spin text-black">Loading...</span>
    </div>
  );
}

export default Loader;
