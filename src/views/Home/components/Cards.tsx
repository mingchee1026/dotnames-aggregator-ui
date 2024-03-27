import React from "react";

type Props = {};

function Cards({}: Props) {
  return (
    <>
      <div className="flex flex-row flex-wrap xl:flex-nowrap   gap-5 w-full h-full">
        <div className="flex flex-col gap-6  w-full">
          <div className="h-[50%] flex flex-row gap-5">
            <span className="w-[50%]  xl:w-2/3 border rounded-xl overflow-hidden">
              <p className="xl:text-3xl font-medium relative left-8 top-5">
                Domain Discovery
              </p>
              <img
                src="/images/assets/discover.svg"
                className="relative top-10 left-[30%]"
              />
            </span>
            <span className="w-[50%] xl:w-[40%] border rounded-xl overflow-hidden">
              <p className="xl:text-3xl font-medium relative left-5 xl:left-8 top-5">
                Management
              </p>
              <img
                src="/images/assets/manage.svg"
                className="relative top-10 left-[20%]"
              />
            </span>
          </div>
          <div className="h-[50%] flex flex-row gap-5">
            <span className="w-[40%] border rounded-xl overflow-hidden">
              <p className="xl:text-3xl font-medium relative left-8 top-5">
                SDK
              </p>
              <img
                src="/images/assets/sdk.svg"
                className="relative top-8 left-[15%]"
              />
            </span>
            <span className="w-2/3 border rounded-xl overflow-hidden">
              <p className="xl:text-3xl font-medium relative left-8 top-5">
                Custom Domains
              </p>
              <img
                src="/images/assets/domain.svg"
                className="relative top-1 left-[25%]"
              />
            </span>
          </div>
        </div>
        <div className="xl:w-[25%] w-[100%] h-[10em] xl:h-auto border rounded-xl overflow-hidden">
          <p className="xl:text-3xl font-medium relative left-8 top-5">
            Trading
          </p>
          <img
            src="/images/assets/trading.svg"
            className="relative relative xl:top-20 h-[90%] -bottom-5 bottom-0"
          />
        </div>
      </div>
    </>
  );
}

export default Cards;
