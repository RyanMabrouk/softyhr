"use client";
import React, { useEffect, useMemo } from "react";
import { IconBaseProps } from "react-icons";
import { BsPeopleFill } from "react-icons/bs";
import { FaUserLarge } from "react-icons/fa6";
import { IoHomeSharp } from "react-icons/io5";
import { ViewCard } from "./ViewCard";
import { useViewContext } from "../context/ViewContext";
import { SeeAbouOtherEmployees } from "./SeeAbouOtherEmployees/SeeAbouOtherEmployees";
import { SeeAboutThemselves } from "./SeeAboutThemselves";
import { SeeOnHome } from "./SeeOnHome";
export function SwitchView() {
  const data = useMemo(
    () => [
      {
        Icon: (props: IconBaseProps) => (
          <BsPeopleFill className={`${props.className}`} />
        ),
        label: "See About other Employees",
        discription:
          "Choose what people with this Access Level will see about other employees.",
      },
      {
        Icon: (props: IconBaseProps) => (
          <FaUserLarge className={`${props.className}`} />
        ),
        label: "See About Themselves",
        discription:
          "Choose what people with this Access Level will see about themselves.",
      },
      {
        Icon: (props: IconBaseProps) => (
          <IoHomeSharp className={`${props.className}`} />
        ),
        label: "See on Home",
        discription:
          "Choose what should show on Home for people with this Access Level.",
      },
    ],
    [],
  );
  const { View: view, setView } = useViewContext();
  useEffect(() => {
    setView && setView(data[0].label);
  }, [setView, data]);
  return (
    <section className="flex flex-row items-center gap-4">
      {data.map((e, i) => (
        <ViewCard
          key={"view" + i}
          {...e}
          setValueInParent={setView}
          valueInParent={view ?? ""}
        />
      ))}
    </section>
  );
}
export function ViewContent() {
  return (
    <>
      <SeeAbouOtherEmployees />
      <SeeAboutThemselves />
      <SeeOnHome />
    </>
  );
}
