import React from "react";
import Header from "./Header";
import Content from "./Content";
export default function Page() {
  return (
    <div className="flex min-h-screen w-screen flex-col">
      <div className="flex h-[13rem] w-full flex-row items-start bg-gradient-to-r from-color-primary-7 to-color-primary-9 py-10">
        <Header />
      </div>
      <Content />
    </div>
  );
}
