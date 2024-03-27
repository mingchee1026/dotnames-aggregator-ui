import { PRODUCT_IMG_FILE, PRODUCT_IMG_FILE_NATIVE } from "@/configs/constants";
import React from "react";

type Props = {};

function Products({}: Props) {
  return (
    <>
      <div className="py-5 space-y-10">
        <div className=" text-3xl font-medium md:text-3xl text-center tracking-tight">
          Our Products
        </div>

        <div className="flex justify-center px-5">
          <div className="flex justify-center flex-wrap gap-5 md:gap-8 items-center">
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
                  className="xl:w-[54px] w-[36px] h-[36px] xl:h-[54px]"
                />
                <p className="text-lg xl:text-2xl font-[500]">
                  {product?.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
