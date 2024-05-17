import React from "react";
import { Avatar, Button, Popover } from "@mui/material";
import { useDisconnect } from "wagmi";
import styles from "./index.module.less";

import classNames from "classnames";

interface IUserOperation {
  avatar?: string;
  username?: string;
  address?: string;
  chainName?: string;
}
export const UserOperation: React.FC<IUserOperation> = (props) => {
  const { avatar, username, address, chainName } = props;
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const open = Boolean(anchorEl);
  const { disconnect } = useDisconnect();
  const id = open ? "user-operation" : undefined;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="flex">
      <Button
        variant="outlined"
        className={classNames("mr-4", styles.chain)}
        size="small"
      >
        {chainName}
      </Button>
      <div
        onClick={() => {
          disconnect();
        }}
      >
        <Avatar
          alt={username}
          src={avatar}
          sx={{ bgcolor: "#FF5722" }}
          className={styles.avatar}
        ></Avatar>
      </div>
      {/* <Popover
        id={id}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        className={styles.popover}
      >
        <div className={classNames("flex flex-col p-3")}>
          <Button>Disconnect</Button>
        </div>
      </Popover> */}
    </div>
  );
};
