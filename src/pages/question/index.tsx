import classNames from "classnames";
import { Item } from "./components/Item";
import styles from "./index.module.less";
import { Publish } from "./components/Publish";
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
          <Publish></Publish>
        </div>
      </div>
    </section>
  );
};
export default Question;
