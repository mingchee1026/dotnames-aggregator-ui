import React from "react";

type Props = {};
const OUR_STATS = [
  {
    title: "550K+",
    subtitle: "Domain Holders Across All Networks",
  },
  {
    title: "200K+",
    subtitle: "Monthly Platform Visits",
  },
  {
    title: "650K+",
    subtitle: "Cumulative Community Strength",
  },

  {
    title: "5",
    subtitle: "Native Domain Naming Services ",
  },
  {
    title: "120+",
    subtitle: "Ecosystem Partners on Different Networks ",
  },
  {
    title: "XY+",
    subtitle: "Blockchains Supported & Many More Coming",
  },
];
function OurStats({}: Props) {
  return (
    <div className="py-5 space-y-10">
      <div className=" text-3xl font-medium md:text-3xl text-center tracking-tight">
        Our results in numbers{" "}
      </div>

      <div className="grid grid-cols-2   xl:grid-cols-4 gap-5 px-5">
        {OUR_STATS?.map((v: (typeof OUR_STATS)[0]) => {
          return (
            <div
              key={v.subtitle}
              className="text-center p-8 border border-gray-400/20 rounded-xl space-y-3 flex items-center  justify-center flex-col bg-base-100/50"
            >
              <p className="text-2xl lg:text-4xl font-[500] text-[#FD71B0]">
                {v.title}
              </p>
              <p className="px-5 font-[300]  lg:text-sm text-xs">
                {v.subtitle}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OurStats;
