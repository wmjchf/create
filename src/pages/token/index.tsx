import classNames from "classnames";
import styles from "./index.module.less";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
const Token = () => {
  return (
    <section
      className={classNames(
        styles.token,
        "flex items-center flex-col justify-center"
      )}
    >
      <span className="text-white font-bold text-5xl mb-8">$PLANET</span>
      <div className={classNames(styles.form, "py-6 px-4")}>
        <FormControl>
          <FormLabel>
            <span className={classNames(styles.lable, "text-white  font-bold")}>
              Amount
            </span>
          </FormLabel>
          <Input
            className={classNames(styles.input, styles.amount, "mt-2")}
            placeholder={"0.00"}
          />
          <FormLabel className={"mt-8"}>
            <span className={classNames(styles.lable, "text-white font-bold")}>
              Address
            </span>
          </FormLabel>
          <Input
            className={classNames(styles.input, "mt-2")}
            placeholder={"Address"}
          />
          {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
          <Button
            width={"100%"}
            borderRadius={"999px"}
            colorScheme="teal"
            height={"60px"}
            className="mt-8"
          >
            Transform
          </Button>
        </FormControl>
      </div>
    </section>
  );
};
export default Token;
