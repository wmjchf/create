"use client";

import { useRouter } from "next/navigation";
import classNames from "classnames";

import { Button } from "@mui/material";

import "./page.css";

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <span className={"font-bold mb-2 title"}>Wisely</span>
        <span className="tip font-normal mb-10">
          Think wisely and make the present better！
        </span>
        <Button
          variant="outlined"
          size="large"
          onClick={() => {
            router.push("/find");
          }}
        >
          Start
        </Button>
      </div>
    </main>
  );
}
