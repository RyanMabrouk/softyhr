"use client";
import React from "react";
import { GrAnnounce } from "react-icons/gr";
import { Player } from "@lottiefiles/react-lottie-player";

export function Notifications() {
  return (
    <section className="flex min-h-full w-full flex-col gap-2 self-stretch rounded-md border border-white bg-white p-1 pb-6 shadow-md">
      <header className="flex flex-row items-center gap-1.5 rounded-md bg-gray-14 px-6 py-2 text-fabric-700">
        <GrAnnounce className="h-5 w-5 text-fabric-700" />
        <span className="text-lg font-semibold">What's happening at rayes</span>
      </header>
      <main className="flex flex-col items-center justify-center gap-3">
        <Player
          src="https://lottie.host/85fb7313-2848-45c2-bdb9-2b729f57afc2/AwfmWMtW8n.json"
          className="h-40 w-40"
          loop
          autoplay
        />
      </main>
    </section>
  );
}
