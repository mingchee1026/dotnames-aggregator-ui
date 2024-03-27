import React from "react";

type Props = {};

function DomainCollection({}: Props) {
  const collection = Array.from({ length: 4 });
  return (
    <>
      <div className="flex flex-row flex-wrap gap-8 my-5 justify-center">
        {collection.map((_, index) => (
          <div
            className="flex flex-col w-72 h-80 border rounded-xl"
            key={index}
          >
            <div className="h-60 bg-slate-50 relative top-0 rounded-t-xl  flex items-center justify-center w-full">
              <span className="relative ">
                <img src="/images/icons/image.svg" className="" />
              </span>
              <span className="absolute top-4 left-4">
                <img src="/images/logos/dotnames-logo.svg" className="w-fit" />
              </span>
            </div>
            <span className="p-5 text-lg font-semibold">999 collection</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default DomainCollection;
