"use client";
import React from "react";
import { useViewContext } from "../context/ViewContext";

export function SeeOnHome() {
  const { View } = useViewContext();
  return <div className={`${View === "See on Home" ? "" : "hidden"}`}></div>;
}
