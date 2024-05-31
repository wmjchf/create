import { Input } from "@chakra-ui/react";
import { WebIrys } from "@irys/sdk";
import classNames from "classnames";
import { useWalletClient } from "wagmi";
import styles from "./index.module.less";

const Arweave = () => {
  const { data } = useWalletClient();

  const getWebIrys = async () => {
    const url = "https://devnet.irys.xyz";
    const token = "ethereum";
    const wallet = { name: "viemv2", provider: data };
    const webIrys = new WebIrys({ url, token, wallet });
    await webIrys.ready();

    return webIrys;
  };

  const upload = async (file: File) => {
    if (!file) return;
    const webIrys = await getWebIrys();
    const tags = [{ name: "application-id", value: "MyNFTDrop" }];

    try {
      const receipt = await webIrys.uploadFile(file as File, { tags });

      console.log(`File uploaded ==> https://gateway.irys.xyz/${receipt.id}`);
    } catch (e) {
      console.log("Error uploading file ", e);
    }
  };

  return (
    <div className={classNames(styles.arweave)}>
      <div className={styles.upload}>
        <i className="iconfont icon-shangchuan"></i>
        <span>上传文件</span>
        <Input
          type="file"
          className={styles.input}
          onChange={(event) => {
            event.target.files && upload(event.target.files[0]);
          }}
        ></Input>
      </div>
    </div>
  );
};

export default Arweave;
