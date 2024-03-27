import Search from "@/components/DomainPrompt/Search";
import React from "react";

type Props = {};

function Hero({}: Props) {
  return (
    <>
      <div className="">
        <div className=" text-4xl font-medium md:text-5xl lg:text-6xl text-center tracking-tight lg:leading-[70px]">
          GoDaddy for Web3 <br />but with rewards!
        </div>
        <div className="my-5 text-md text-center md:text-lg">
          trade, manage & earn NAMES points on your domains
        </div>

        <div className="flex flex-row items-center justify-center  ">
          <Search />
          <div
            className="flex relative -left-3   self-stretch px-5 pl-10 items-center border border-zinc-700 rounded-3xl cursor-pointer"
            onClick={() => {
              (
                document.getElementById("prompt_modal") as HTMLDialogElement
              ).showModal();
            }}
          >
            <img src="/images/icons/shine3.gif" className="w-5 h-5" />
            <p className="bg-gradient-to-r text-xs from-primary to-blue-500 bg-clip-text text-transparent">
              Generate Domain Using AI
            </p>
            {/* <p className="text-xs"></p> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
