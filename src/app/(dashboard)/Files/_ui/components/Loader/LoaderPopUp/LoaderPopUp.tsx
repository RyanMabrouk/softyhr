import React from "react";
import styles from "./LoaderPopUp.module.css";

function LoaderPopUp() {
  return (
    <div className="items m-auto mt-10 flex h-full w-full justify-center">
      <span className={styles.loader}></span>
    </div>
  );
}

export default LoaderPopUp;
