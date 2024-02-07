import React from "react";

interface AvatarPropsType {
  name: string;
}

function Avatar({ name }: AvatarPropsType) {
  return (
    <div className="flex h-[3rem] w-[3rem] items-center justify-center rounded-full bg-gray-14 text-xl uppercase text-gray-15">
      {name[0] + " " + name.slice(name.indexOf(" ") + 1, name.length)[0]}
    </div>
  );
}

export default Avatar;
