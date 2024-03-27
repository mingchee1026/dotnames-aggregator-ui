import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header/Header";
import { useAppSelector } from "@/redux/store";
import {
  PLATFORMS_ENUM,
  PLATFORMS_LIST,
  TLD_TO_PLATFORM_DETAILS,
} from "@/configs/constants";
import CartRow from "../Cart/components/CartRow";
import Footer from "@/components/Footer/Footer";
import UDTransactionBalances from "./components/BalanceAdapters/UDBalance/UDTransactionBalances";
type Props = {};

function Account({}: Props) {
  const account = useAppSelector((state) => state.login.account);
  const [activeGroupKey, setactiveGroupKey] = useState(
    PLATFORMS_LIST?.at(0)?.value || ""
  );
  const content = ({}: any) => {
    switch (activeGroupKey) {
      case PLATFORMS_ENUM.Unstoppable:
        return <UDTransactionBalances />;
      default:
        return <div className="flex gap-5 flex-wrap"></div>;
        break;
    }
  };
  return (
    <>
      <div className="container w-full  mx-auto my-0 px-2 xl:px-0">
        <div className="pt-5">
          <Header />
        </div>
        <div className="p-2 min-h-[75vh] mt-5">
          {!account && <div>Please connect your wallet</div>}
          {account && (
            <div className="w-full gap-2">
              <div className="w-full">
                <div className="flex justify-between items-center my-5">
                  <div>
                    <p className="text-2xl font-semibold">Your Account</p>
                  </div>
                </div>
                <ul className="flex w-full  h-full pt-2 overflow-x-scroll no-scrollbar text-sm font-medium text-center text-gray-500 border-b-2 border-gray-300/20">
                  {PLATFORMS_LIST?.map((platform, idx) => {
                    // @ts-ignore
                    const grpplatform = platform;
                    const grpKey = platform.value;
                    return (
                      <li
                        className=" cursor-pointer"
                        key={grpKey}
                        onClick={() => setactiveGroupKey(grpKey)}
                      >
                        <div
                          className={`inline-flex  xl:w-[15em] h-full gap-2 items-center justify-center p-2 px-5 border-transparent border-b-2 rounded-t-lg  hover:text-gray-600 hover:border-gray-300   ${
                            activeGroupKey === grpKey ? "  " : ""
                          }`}
                          style={{
                            borderBottom:
                              activeGroupKey === grpKey
                                ? "2px solid #F85888"
                                : "",
                          }}
                        >
                          <div className="indicator  ">
                            <img
                              src={grpplatform?.icon}
                              alt=""
                              width={24}
                              height={24}
                            />
                          </div>
                          <span className="inline-block whitespace-nowrap ">
                            {platform?.value}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <div className="my-5">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeGroupKey}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {content({})}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="my-5">
                  {/* <div className="flex gap-5 flex-wrap">
                {groupedList[activeGroupKey]?.map((d) => {
                  return <CartRow {...d} key={d?.name} />;
                })}
              </div> */}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="border-gray-200/50  border-t-2 py-2">
        <Footer />
      </div>
    </>
  );
}

export default Account;
