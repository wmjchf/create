import React from "react";
import Link from "next/link";
import styles from "./index.module.less";
import classNames from "classnames";
import { useRouter } from "next/router";
export const Tabs = () => {
  const router = useRouter();
  const pathname = router.pathname;
  return (
    <div className="flex h-full ">
      <div
        className={classNames(
          styles.item,
          pathname === "/token" && styles.active,
          "flex items-center justify-center"
        )}
      >
        <Link href={"/token"} className="font-bold">
          Token
        </Link>
      </div>
      <div
        className={classNames(
          styles.item,
          pathname === "/question" && styles.active,
          "flex items-center justify-center"
        )}
      >
        <Link href={"/question"} className="font-bold">
          Question
        </Link>
      </div>
    </div>
  );
};
