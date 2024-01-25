import Link from "next/link";
export function Footer() {
  return (
    <footer className=" flex w-full flex-row items-center justify-evenly  border-t-[2px] border-t-gray-14 px-48 py-7">
      <div className="flex flex-row gap-2 text-sm font-light text-gray-21 no-underline">
        <Link
          href="#"
          className="cursor-pointer hover:text-color-primary hover:underline"
        >
          Privacy Policy
        </Link>
        <strong className="-mt-2 text-center text-lg">.</strong>
        <Link
          href="#"
          className="cursor-pointer hover:text-color-primary hover:underline"
        >
          Terms of Service
        </Link>
      </div>
      <Link
        className="relative font-bold text-gray-21 "
        href={"/"}
        target="_blank"
      >
        <span className="mr-2">SoftyHR</span>
        <span className="absolute right-0 top-0 text-[0.5rem]">®</span>
      </Link>
    </footer>
  );
}
