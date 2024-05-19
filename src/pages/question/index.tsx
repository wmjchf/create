import classNames from "classnames";
import { Item } from "./components/Item";
import styles from "./index.module.less";
import { Button } from "@chakra-ui/react";
const Question = () => {
  return (
    <section className={classNames(styles.question)}>
      <div className={classNames(styles.container, "flex")}>
        <div className={classNames(styles.left)}>
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </div>
        <div className={classNames(styles.right, "ml-5 px-2 py-4")}>
          <Button
            colorScheme="teal"
            className={classNames(styles.publish, "w-full")}
          >
            发布话题
          </Button>
        </div>
      </div>
    </section>
  );
};
export default Question;
