import { PRODUCT_IMG_FILE, PRODUCT_IMG_FILE_NATIVE } from "@/configs/constants";
import React from "react";

type Props = {};

function Products({}: Props) {
  const imageFile = Array.from(
    { length: 7 },
    (_, index) => `images/assets/asset-${index + 1}.png`
  );
  return (
    <>
      <div className="my-5">
        <div className=" text-lg font-medium md:text-xl text-center tracking-tight">
          Supported Domains
        </div>

        <div className="flex justify-center ">
          <span className="inline-flex flex-wrap gap-5 md:gap-8 items-center my-4">
            {PRODUCT_IMG_FILE.map((product, index) => (
              <img
                key={index}
                src={product.logo}
                className="w-8 h-8 md:w-8 md:h-8"
                alt={product.title}
              />
            ))}
          </span>
        </div>
        <div className="flex justify-center">
          <span className="inline-flex flex-wrap gap-5 md:gap-8 items-center">
            {PRODUCT_IMG_FILE_NATIVE.map((product, index) => (
              <div
                key={product?.title}
                onClick={async (e) => {
                  e?.preventDefault();

                  // await gAevent({
                  //   action: `Click-${_v?.title}`,
                  //   category: "Platforms",
                  //   label: _v?.title,
                  //   value: _v?.title,
                  // });
                  // window?.open(_v?.link, "_blank");
                }}
                // href={_v?.link}
                // target="_blank"
                // referrerPolicy="no-referrer"
                className="flex items-center gap-1 cursor-pointer"
              >
                {/* <p className="flex items-center justify-center w-1 h-1 p-2 text-white rounded-full bg-primary"></p>
                 */}
                <img
                  src={product?.logo}
                  alt={`${product?.title}_logo`}
                  width={24}
                  height={24}
                />
                <p className="text-xs">{product?.title}</p>
              </div>
            ))}
          </span>
        </div>
      </div>
    </>
  );
}

export default Products;
