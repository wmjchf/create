import React from "react";
import Link from "next/link";
import styles from "./index.module.less";
import classNames from "classnames";
import { useRouter } from "next/router";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
const menuList = [
  {
    path: "/project/wallet",
    name: "Contract Wallet",
  },
];
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
          pathname.includes("project") && styles.active,
          "flex items-center justify-center"
        )}
      >
        <Menu>
          <MenuButton as={Button} className={styles.project_menu_btn}>
            Project
          </MenuButton>
          <MenuList backgroundColor={"rgba(0, 0, 0, 0.35)"}>
            {menuList.map((item) => {
              return (
                <MenuItem
                  backgroundColor={"rgba(0, 0, 0, 0.35)"}
                  color={"#b2c1c8"}
                  key={item.path}
                >
                  <Link href={item.path} className="font-bold">
                    {item.name}
                  </Link>
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
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
