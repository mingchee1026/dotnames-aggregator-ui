import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { useAppSelector } from "@/redux/store";
import React, { useEffect, useState } from "react";
import CartRow from "./components/CartRow";
import _ from "lodash";
import {
  PLATFORMS_ENUM,
  TLD_TO_PLATFORM_DETAILS,
  YEAR_TO_SEC,
} from "@/configs/constants";
import { motion, AnimatePresence } from "framer-motion";

// import MoreItemsDrawer from "./components/MoreItemsDrawer";
// import { formatWrapedText, formatZetaName } from "@/utils";
// import {
//   useBatchDomainPrice,
//   useBatchDomainPriceSei,
// } from "@/hooks/DotSei/useBatchDomainPriceSei";
import SeiCart from "./components/Adapters/SeiCart/SeiCart";
import ENSCart from "./components/Adapters/EnsCart/ENSCart";
import UDCart from "./components/Adapters/UDomainsCart/UDCart";
import SUICart from "./components/Adapters/SUICart/SUICart";
import SIDBnbCart from "./components/Adapters/SIDBnbCart/SIDBnbCart";
import SIDArbCart from "./components/Adapters/SIDArbCart/SIDArbCart";

type Props = {};
const CART_ITEMS_SHOW_COUNT = 3;
function Cart({}: Props) {
  const cart = useAppSelector((state) => state.cart.cart);
  const indexedCart = cart?.map((d, index) => {
    // @ts-ignore
    return { ...d, index };
  });
  const groupedListUnsorted = _.groupBy(indexedCart, (item) =>
    _.get(item, "platform.platform")
  );
  const groupedList = Object.keys(groupedListUnsorted)
    .sort(
      (a, b) => groupedListUnsorted[b]?.length - groupedListUnsorted[a]?.length
    )
    .reduce((acc, key) => {
      //  @ts-ignore
      acc[key] = groupedListUnsorted[key];
      return acc;
    }, {});

  const [activeGroupKey, setactiveGroupKey] = useState(
    Object.keys(groupedList)[0] || ""
  );

  // const { ...res } = useBatchDomainPriceSei(
  //   [
  //     "a",
  //     "aaa.sei",
  //     "bdsbyutytytuyyurtuds.sei",
  //     "dadsdas.sei",
  //     "dasds.sei",
  //     "gvggg.sei",
  //   ],
  //   YEAR_TO_SEC
  // );
  // console.log(`🚀 ~ file: Cart.tsx:29 ~ res:`, res);
  const content = ({ setactiveGroupKey, grpKey, list }: any) => {
    if (list?.length <= 0) {
      return <div>No data found</div>;
    }
    switch (activeGroupKey) {
      case PLATFORMS_ENUM.DotSei:
        return (
          <SeiCart
            setactiveGroupKey={setactiveGroupKey}
            grpKey={grpKey}
            list={list}
          />
        );
      case PLATFORMS_ENUM.ENS:
        return (
          <ENSCart
            setactiveGroupKey={setactiveGroupKey}
            grpKey={grpKey}
            list={list}
          />
        );
      case PLATFORMS_ENUM.Unstoppable:
        return (
          <UDCart
            setactiveGroupKey={setactiveGroupKey}
            grpKey={grpKey}
            list={list}
          />
        );
      case PLATFORMS_ENUM.SUINS:
        return (
          <SUICart
            setactiveGroupKey={setactiveGroupKey}
            grpKey={grpKey}
            list={list}
          />
        );
      case PLATFORMS_ENUM.SpaceIDBNB:
        return (
          <SIDBnbCart
            setactiveGroupKey={setactiveGroupKey}
            grpKey={grpKey}
            list={list}
          />
        );
      case PLATFORMS_ENUM.SpaceIDARB:
        return (
          <SIDArbCart
            setactiveGroupKey={setactiveGroupKey}
            grpKey={grpKey}
            list={list}
          />
        );
      default:
        return (
          <div className="flex gap-5 flex-wrap">
            {list?.map((d: any) => {
              return <CartRow {...d} key={d?.name} />;
            })}
          </div>
        );
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
          <div className="w-full gap-2">
            <div className="w-full">
              <div className="flex justify-between items-center my-5">
                <div>
                  <p className="text-2xl font-semibold">Your Cart</p>
                  {/* <p>Checkout for your domains</p> */}
                </div>
                <input
                  type="text"
                  placeholder="Search cart"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => {
                    const value = e?.target?.value;
                    if (value?.trim() !== "") {
                      const found = cart?.find((d) =>
                        ((d as any)?.name as string).match(value)
                      );

                      if (found) {
                        setactiveGroupKey((found as any)?.platform?.platform);
                      }
                    }
                  }}
                />
              </div>
              <ul className="flex w-full  h-full pt-2 overflow-x-scroll no-scrollbar text-sm font-medium text-center text-gray-500 border-b-2 border-gray-300/20">
                {Object.keys(groupedList)?.map((grpKey, idx) => {
                  // @ts-ignore
                  const list = groupedList[grpKey];
                  // @ts-ignore
                  const grpplatform = TLD_TO_PLATFORM_DETAILS[list[0]?.tld];

                  return (
                    <li
                      className="cursor-pointer"
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
                          {list?.length > 0 && (
                            <span className="indicator-item  bg-primary rounded-full w-[20px] h-[20px] flex items-center justify-center text-white text-[0.7em]">
                              {list?.length}
                            </span>
                          )}
                          <img
                            src={grpplatform?.icon}
                            alt=""
                            width={24}
                            height={24}
                          />
                        </div>
                        <span className="inline-block whitespace-nowrap ">
                          {grpKey}
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
                    {content({
                      setactiveGroupKey,
                      grpKey: activeGroupKey,
                      // @ts-ignore
                      list: groupedList[activeGroupKey],
                    })}
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
        </div>
      </div>
      <div className="border-gray-200/50  border-t-2 py-2">
        <Footer />
      </div>
    </>
  );
}

export default Cart;
