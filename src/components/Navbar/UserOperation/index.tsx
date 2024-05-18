import React, { useRef, useState } from "react";
// import { Avatar, Button, Popover } from "@mui/material";
import { useDisconnect } from "wagmi";
import styles from "./index.module.less";

import classNames from "classnames";
import {
  Button,
  Avatar,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { EllipsisMiddle } from "@/components/EllipsisMiddle";

interface IUserOperation {
  avatar?: string;
  username?: string;
  address?: string;
  chainName?: string;
  balance?: string;
}
export const UserOperation: React.FC<IUserOperation> = (props) => {
  const { avatar, username, address, chainName, balance } = props;

  const { disconnect } = useDisconnect();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.user_operation}>
      <Button
        ref={ref}
        colorScheme="teal"
        variant="outline"
        className={styles.button}
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <Avatar className={classNames(styles.avatar, "mr-1")}></Avatar>
        {address && (
          <EllipsisMiddle
            value={address}
            suffixCount={5}
            className={styles.address}
          />
        )}
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={() => {
          setIsOpen(false);
        }}
        finalFocusRef={ref}
      >
        <DrawerOverlay />
        <DrawerContent background={"#304156"}>
          <DrawerHeader background={"#283747"}>
            <div
              className={classNames(
                "flex items-center justify-between",
                styles.header
              )}
            >
              <div className="flex items-center">
                <Avatar className={styles.big_avatar} />
                <div className={classNames("flex flex-col ml-3", styles.info)}>
                  <span className="text-sm font-semibold text-white">
                    {balance}
                  </span>
                  {address && (
                    <EllipsisMiddle
                      value={address}
                      suffixCount={5}
                      className={
                        "text-xs text-white/50 font-semibold dark:text-v2-lily"
                      }
                    />
                  )}
                </div>
              </div>
              <div>
                <Button
                  className={styles.disconnect}
                  colorScheme="teal"
                  variant="outline"
                  onClick={() => {
                    disconnect();
                  }}
                >
                  <i className="iconfont icon-logout"></i>
                </Button>
              </div>
            </div>
          </DrawerHeader>

          <DrawerBody></DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
