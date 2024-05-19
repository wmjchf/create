import {
  Button,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import classNames from "classnames";
import React, { useState } from "react";
import styles from "./index.module.less";

export const Publish = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };
  const onOpen = () => {
    setIsOpen(true);
  };
  return (
    <div className={classNames(styles.publish)}>
      <Button
        colorScheme="teal"
        className={classNames(styles.button, "w-full")}
        onClick={onOpen}
      >
        发布话题
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
        <ModalOverlay />
        <ModalContent backgroundColor={"#304156"}>
          {/* <ModalHeader className="text-white">发布话题</ModalHeader> */}

          <ModalBody>
            <div className={styles.form}>
              <FormLabel
                className={classNames(
                  styles.label,
                  "w-full items-center justify-between mt-4"
                )}
              >
                <span className={classNames("text-white  font-bold")}>
                  话题标题
                </span>
              </FormLabel>
              <Input
                className={classNames(styles.input, styles.amount, "mt-2")}
                placeholder={"请输入"}
              />
              <FormLabel
                className={classNames(
                  styles.label,
                  "w-full items-center justify-between mt-4"
                )}
              >
                <span className={classNames("text-white  font-bold")}>
                  话题描述
                </span>
              </FormLabel>
              <Textarea
                className={classNames(styles.textarea, "mt-2")}
                placeholder={"请输入"}
              ></Textarea>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="teal"
              variant={"outline"}
              mr={3}
              onClick={onClose}
            >
              取消
            </Button>
            <Button colorScheme="teal">发布</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
