import React from "react";
import styles from "./MiniLoader.module.css";

function MiniLoader() {
  return (
    <div className="ml-20 mt-28 flex h-full w-full items-center ">
      <span className={styles.loader}></span>
    </div>
  );
}

export default MiniLoader;
