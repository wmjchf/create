import React from "react";
import classNames from "classnames";
import styles from "./index.module.less";
import { Avatar } from "@chakra-ui/react";

export const Item = () => {
  return (
    <div className={classNames(styles.item, "p-4 mb-2")}>
      <div className={classNames(styles.top, "flex items-center")}>
        <Avatar className={styles.avatar} />
        <div className={classNames(styles.user, "flex flex-col ml-2")}>
          <span className="font-bold">孤独的根号3</span>
          <span className="mt-1">2024-09-09 10:00:00</span>
        </div>
      </div>
      <div className={classNames(styles.bottom, "mt-5")}>
        <div className={classNames(styles.title, "font-bold text-white")}>
          <span>之前作为一名web2开发者，应该怎么进入web3</span>
        </div>
        <div className={classNames(styles.content, "text-white mt-2")}>
          自 2023 年主网上线以来，Sui 生态的发展速度令人瞩目。截至 2024 年 5
          月，Sui 生态上已有超过 500
          个活跃节点，这些节点分布在全球各地，确保了网络的去中心化和高可用性。在这一年多的时间里，Sui
          生态不仅未曾经历过一分钟的停机或性能下降，还实现了多个令人瞩目的技术成果。例如，交易最终确认时间仅为
          400 毫秒，受控环境下的峰值交易处理速度达到了每秒 297,000
          笔，单日交易量高达 6580 万笔。
        </div>
      </div>
    </div>
  );
};
