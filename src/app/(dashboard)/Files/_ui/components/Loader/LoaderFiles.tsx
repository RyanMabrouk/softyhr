import React from "react";
import styles from "./Loader.module.css";

function LoaderFiles() {
  return (
    <div className="items m-auto mt-48 flex h-full w-full justify-center">
      <span className={styles.loader}></span>
    </div>
  );
}

export default LoaderFiles;
