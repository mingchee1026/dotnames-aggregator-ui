import React from "react";

type Props = {
  title: string;
  tagline: string;
};

function SubHeader({ title, tagline }: Props) {
  return (
    <>
      <div className="">
        <div className="mt-14 relative text-2xl font-medium md:text-5xl text-zinc-700 text-center z-10 ">
          {title}
        </div>
        <div className="text-2xl relative bottom-10 font-medium md:text-7xl text-center bg-clip-text text-transparent bg-gradient-to-b from-primary to-white opacity-40 tracking-tight">
          {tagline}
        </div>
      </div>
    </>
  );
}

export default SubHeader;
