import React from "react";
import { IoCopyOutline } from "react-icons/io5"; 
// TODO: Add Icons component using local svgs

type Props = {};

function Wrapper({}: Props) {
  return (
    <>
      <div className="flex flex-row flex-wrap xl:justify-start justify-center w-full  p-5 md:p-10 mt-14 md:gap-2 border rounded-xl">
        <img src="/images/assets/coins.svg" />
        <div className="flex flex-col gap-5 py-3 md:py-6 px-10 overflow-clip">
          <p className="text-xl font-medium">
            Use the link below to invite your friends and earn more NAMES points
            to top the leaderboard.
          </p>
          <span className="inline-flex py-2 px-4 md:px-6 text-xs md:text-sm bg-primary w-fit gap-2 md:gap-4 items-center text-white rounded-full">
            https://www.dotnames.me/invite/233478
            <IoCopyOutline size={20} />
          </span>
        </div>
      </div>
    </>
  );
}

export default Wrapper;
