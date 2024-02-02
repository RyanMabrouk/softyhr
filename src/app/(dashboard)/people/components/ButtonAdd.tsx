import React from "react";

export default function ButtonAdd({ name, href, classname }: any) {
  return (
    <a
      className={`focus-within:shadow-green flex w-[10rem] items-center justify-center gap-[0.5rem] border border-color-primary-8 py-1 text-[0.95rem] font-semibold text-color-primary-8  duration-200 ease-in-out hover:!border-color-primary-7 hover:!text-color-primary-7 ${classname}`}
      href={href ? href : "#"}
    >
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 512 512"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"></path>
      </svg>
      {name}
    </a>
  );
}