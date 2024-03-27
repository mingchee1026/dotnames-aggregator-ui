import React from "react";

type Props = {};

function DotNamesSDK({}: Props) {
  return (
    <div className="py-5 space-y-10">
      <div className=" text-3xl font-medium md:text-3xl text-center tracking-tight">
        Start building on DotNames SDK
      </div>

      <div className="px-5 lg:px-0">
        <div className="text-center p-5 lg:p-8 border border-gray-400/20 rounded-xl space-y-3 flex items-center justify-center flex-col bg-base-100/50">
          <p className="text-lg lg:text-4xl font-[500] text-[#FD71B0]">
            SOMETHING ABOUT SDK
          </p>
          <div className="btn btn-secondary rounded-full  lg:btn-lg text-white">
            {" "}
            Goto Docs
          </div>
        </div>
      </div>
    </div>
  );
}

export default DotNamesSDK;
