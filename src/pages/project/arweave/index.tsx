import { useEffect, useState } from "react";
import { Button, Input, useToast } from "@chakra-ui/react";
import { WebIrys } from "@irys/sdk";
import classNames from "classnames";
import { useWalletClient } from "wagmi";
import styles from "./index.module.less";
import Image from "next/image";

const Arweave = () => {
  const { data } = useWalletClient();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [file, setFile] = useState<File>();
  const [fileBase64, setFileBase64] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      // result 属性中将包含一个 data: URL 格式的 Base64 字符串以表示所读取文件的内容
      reader.readAsDataURL(file);
      reader.onload = function () {
        setFileBase64(this.result as string);
      };
    }
  }, [file]);
  const getWebIrys = async () => {
    const url = "https://devnet.irys.xyz";
    const token = "ethereum";
    const wallet = { name: "viemv2", provider: data };
    const webIrys = new WebIrys({ url, token, wallet });
    await webIrys.ready();

    return webIrys;
  };

  const upload = async (file: File) => {
    if (!file) {
      toast({
        title: "error",
        description: "请先选择文件",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    const webIrys = await getWebIrys();
    const tags = [{ name: "Content-Type", value: file.type }];

    try {
      setIsLoading(true);
      const receipt = await webIrys.uploadFile(file as File, { tags });
      setPreviewUrl(`https://gateway.irys.xyz/${receipt.id}`);
    } catch (e) {
      console.log("Error uploading file ", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={classNames(styles.arweave)}>
      <div className={styles.title}>
        <span className="text-white font-bold">
          Arweave去中心化存储——上传文件
        </span>
      </div>
      <div className={styles.upload}>
        <i className="iconfont icon-shangchuan"></i>
        <span>选择文件</span>
        <Input
          type="file"
          className={styles.input}
          onChange={(event) => {
            event.target.files && setFile(event.target.files[0]);
          }}
        ></Input>
        {fileBase64 && (
          <Image
            src={fileBase64}
            alt=""
            className={styles.image}
            width={200}
            height={200}
          />
        )}
      </div>
      {previewUrl ? (
        <a
          href={previewUrl}
          className="text-white mt-8 underline"
          target="_blank"
        >
          {previewUrl}
        </a>
      ) : (
        <Button
          width={"200px"}
          borderRadius={"999px"}
          colorScheme="teal"
          className="mt-8"
          isLoading={isLoading}
          onClick={() => {
            upload(file as File);
          }}
        >
          Upload
        </Button>
      )}
    </div>
  );
};

export default Arweave;
