import React from "react";
import styles from "./index.module.less";
import classNames from "classnames";
export const Tabs = () => {
  return (
    <div className="flex h-full ">
      <div
        className={classNames(
          styles.item,
          styles.active,
          "flex items-center justify-center"
        )}
      >
        <span className="font-bold">Token</span>
      </div>
      <div
        className={classNames(styles.item, "flex items-center justify-center")}
      >
        <span className="font-bold">Article</span>
      </div>
    </div>
  );
};
