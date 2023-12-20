import getCurrentorg from "@/api/getCurrentOrg";
import React from "react";

async function Home() {
  const current_org = await getCurrentorg();

  return <div>{current_org?.name} is subscribed</div>;
}

export default Home;
