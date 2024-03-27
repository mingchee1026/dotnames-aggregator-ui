import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import { useRouter } from "next/router";
import { useWallet } from "multichain-walletkit-sdk-react";
import { toast } from "react-hot-toast";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import Image from "next/image";
import { formatAddress, formatWrapedText, getDomainWitoutTld } from "@/utils";
import BigNumber from "bignumber.js";
import { DEFAULT_CHAIN_ID, DEFAULT_FEE_DENOM } from "@/configs";
import { EXPLORER_URL, YEAR_TO_SEC } from "@/configs/constants";
import MultichainSelector from "@/components/register/MultiChainSelector";
// import WalletConnectorModal from "@/components/Header/Wallet/WalletConnectorModal";
import RegistrationModal from "./components/RegistrationModal";
// import {
//   useDomainRentPrice,
//   registerDomain,
// } from "@/hooks/useEthRegistrarController";

type Props = {
  domainName: string;
  useDomainRentPrice: (
    labelWithoutTld: string,
    duaration: number
  ) => { data: string; isLoading: boolean };
  registerDomain: (
    wallet: any,
    labelWithoutTld: string,
    duaration: number
  ) => Promise<boolean>;
  refetchDomain?: () => void;
};

const RegisterExt = ({
  domainName,
  useDomainRentPrice,
  registerDomain,
  refetchDomain,
}: Props) => {
  const router = useRouter();
  const wallet = useWallet();
  // @ts-ignore
  const account = useSelector((state) => state.login.account);

  const labelWithoutTld = getDomainWitoutTld(domainName);
  const tld = domainName.split(".").pop()?.toUpperCase();
  const [year, setYear] = useState(1);
  const [debouncedYear] = useDebounce(year, 500);
  const [isPriceRecalculating, setIsPriceRecalculating] = useState(false);
  const { data: domainRentPrice, isLoading: domainRentPriceIsLoading } =
    useDomainRentPrice(labelWithoutTld, YEAR_TO_SEC * debouncedYear);

  const [isSetToPrimary, setisSetToPrimary] = useState(false);

  const [registerStatus, setRegisterStatus] = useState({
    loading: false,
    success: false,
    error: false,
  });

  const yearSuffix = year === 1 ? "year" : "years";

  const increaseYear = () => {
    setIsPriceRecalculating(true);
    setYear((prevYear) => prevYear + 1);
  };

  const decreaseYear = () => {
    setIsPriceRecalculating(true);
    if (year > 1) {
      setYear((prevYear) => prevYear - 1);
    }
  };

  const handleRegisterDomain = async () => {
    setRegisterStatus({
      loading: true,
      success: false,
      error: false,
    });

    try {
      const tx = await registerDomain(
        wallet,
        labelWithoutTld,
        YEAR_TO_SEC * debouncedYear
      );

      if (tx) {
        setRegisterStatus({
          loading: false,
          success: true,
          error: false,
        });
      } else {
        setRegisterStatus({
          loading: false,
          success: false,
          error: true,
        });
      }
    } catch (error) {
      console.log(`🚀 ~ file: Register.tsx:57 ~ error:`, error);
      setRegisterStatus({
        loading: false,
        success: false,
        error: true,
      });
    }
  };

  useEffect(() => {
    setIsPriceRecalculating(false);
  }, [debouncedYear]);

  return (
    <>
      <div className="flex flex-col items-center justify-center mx-auto h-full w-[100%] sm:w-[60%] md:w-[60%] lg:w-[40%] p-5 mt-5">
        {/* <Image
          src="/pfp.png"
          width={120}
          height={120}
          alt="Avatar"
          className="rounded-full"
        /> */}
        <p className="mt-5 text-lg font-medium md:text-2xl">
          {formatWrapedText(domainName, 4, 6)}
        </p>
        {account ? (
          <p className="text-[12px] font-medium md:text-[15px] mt-2 text-gray-400">
            <span className="hidden md:block">{account}</span>
            <span className="block md:hidden">{formatAddress(account!)}</span>
          </p>
        ) : (
          ""
        )}
        <div className="w-full mt-5 text-left">
          <h3 className="mt-5 font-medium text-md md:text-lg">
            Register {formatWrapedText(domainName, 4, 6)}
          </h3>
        </div>
        <div className="flex flex-row w-[100%] md:w-[100%] p-4 bg-white/10 justify-between items-center rounded-xl mt-2 border border-gray-600">
          <button
            className="px-2 ml-1 text-lg border-2 border-gray-400 rounded-lg"
            onClick={decreaseYear}
          >
            -
          </button>
          <p className="flex w-fit text-md md:text-lg">
            {year} {yearSuffix}
          </p>
          <button
            className="px-2 mr-1 text-lg border-2 border-gray-400 rounded-lg"
            onClick={increaseYear}
          >
            +
          </button>
        </div>
        <div className="w-full text-left">
          <p className="mt-5 text-sm tracking-wider text-gray-400 font-regular md:text-md">
            NOTE: Extending for multiple years saves on network costs by
            avoiding yearly transactions.
          </p>
        </div>
        <div className="flex flex-col w-[100%] md:w-[100%] p-4 bg-white/10 space-y-2 justify-between items-center rounded-xl mt-8 border border-gray-600">
          <span className="flex flex-row justify-between w-full md:px-5">
            <p className=" text-md md:text-lg">Fees</p>
          </span>{" "}
          <span className="flex flex-row justify-between w-full md:px-5">
            <p className="text-gray-400 text-md md:text-lg">
              {year} {yearSuffix} registration
            </p>
            {isPriceRecalculating || domainRentPriceIsLoading ? (
              <p className="w-32 h-6 text-gray-400 rounded-2xl text-md md:text-lg animate-pulse bg-base-200"></p>
            ) : (
              <p className="text-gray-400 text-md md:text-lg">
                {/* @ts-ignore */}
                {/* {new BigNumber(domainRentPrice)?.div(1e18)?.toString()}{" "} */}
                {domainRentPrice} {tld}
              </p>
            )}
          </span>
        </div>
        {account ? ( // chain?.id !== DEFAULT_CHAIN_ID ? (
          <RegistrationModal
            onCloseReset={() => {
              setTimeout(async () => {
                refetchDomain && (await refetchDomain());
                await setRegisterStatus({
                  loading: false,
                  success: false,
                  error: false,
                });
              }, 5000);
            }}
          >
            {registerStatus.loading && (
              <div className="flex flex-col justify-center mx-auto">
                <h3 className="mx-auto text-xl font-semibold">
                  Pending Transaction
                </h3>
                <Player
                  autoplay
                  loop
                  src="/lottie/pending.json"
                  style={{ height: "200px", width: "200px" }}
                >
                  <Controls
                    visible={false}
                    buttons={["play", "repeat", "frame"]}
                  />
                </Player>
              </div>
            )}
            {registerStatus.success && (
              <div className="flex flex-col justify-center">
                <h3 className="text-xl font-semibold">
                  Transaction Successful
                </h3>
                <p className="mt-2 mb-4 text-md">
                  Your registration transaction of{" "}
                  {formatWrapedText(domainName, 4, 6)} domain was successful
                </p>
                <Player
                  autoplay
                  loop
                  src="/lottie/success.json"
                  style={{ height: "150px", width: "150px" }}
                >
                  <Controls
                    visible={false}
                    buttons={["play", "repeat", "frame"]}
                  />
                </Player>
                <div className="flex flex-row mx-auto space-x-3">
                  <button
                    className="px-4 py-2 mx-auto mt-5 text-sm border border-gray-400 w-fit bg-white/10 rounded-3xl"
                    onClick={() => {
                      router.push(`/domain/${domainName}`);
                      setRegisterStatus({
                        loading: false,
                        success: false,
                        error: false,
                      });
                    }}
                  >
                    Close
                  </button>
                  {/* <button
                    className="px-4 py-2 text-sm border border-gray-400 w-fit bg-white/10 rounded-3xl"
                    onClick={() => {
                      window.open(
                        `${
                          // @ts-ignore
                          EXPLORER_URL[1] //(chain?.unsupported ? chainId : chain?.id) as number
                        }/tx/${txnHash}`,
                        "_blank"
                      );
                      router.push(`/registered/${domainName}`);
                    }}
                  >
                    View on Explorer
                  </button>
                  <button
                    className="px-4 py-2 text-sm border border-gray-400 w-fit bg-white/10 rounded-3xl"
                    onClick={() => {
                      router.push(`/registered/${domainName}`);
                    }}
                  >
                    Continue
                  </button> */}
                </div>
              </div>
            )}
            {registerStatus.error && (
              <div className="flex flex-col justify-center">
                <h3 className="text-xl font-semibold">Transaction Failed</h3>
                <p className="mt-2 mb-4 text-md">
                  Something went wrong... Try Again!
                </p>
                <Player
                  autoplay
                  loop
                  src="/lottie/failed.json"
                  style={{ height: "100px", width: "100px" }}
                >
                  <Controls
                    visible={false}
                    buttons={["play", "repeat", "frame"]}
                  />
                </Player>
                <button
                  className="px-4 py-2 mx-auto mt-5 text-sm border border-gray-400 w-fit bg-white/10 rounded-3xl"
                  onClick={() => {
                    router.push(`/domain/${domainName}`);
                    setRegisterStatus({
                      loading: false,
                      success: false,
                      error: false,
                    });
                  }}
                >
                  Close
                </button>
              </div>
            )}
            {!registerStatus.loading &&
              !registerStatus?.success &&
              !registerStatus.error && (
                <div className="flex flex-col justify-center mx-auto">
                  <h3 className="mx-auto text-xl font-semibold">
                    Confirm Details
                  </h3>
                  <p className="mx-auto mt-2 mb-4 text-sm">
                    Double check these details before confirming in your wallet.
                  </p>
                  <div className="flex flex-col space-y-2">
                    <div className="flex flex-row w-[100%] p-4 bg-white/10 justify-between border border-gray-600 rounded-lg">
                      <p>Name</p>
                      <p>{formatWrapedText(domainName, 4, 6)}</p>
                    </div>
                    <div className="flex flex-row w-[100%] p-4 bg-white/10 justify-between border border-gray-600 rounded-lg">
                      <p>Action</p>
                      <p>Register Name</p>
                    </div>
                    <div className="flex flex-row w-[100%] p-4 bg-white/10 justify-between border border-gray-600 rounded-lg">
                      <p>Fee</p>
                      <p>
                        {/* @ts-ignore */}
                        {/* {new BigNumber(
                          //  @ts-ignore
                          domainRentPrice?.base
                        )
                          ?.div(1e18)
                          ?.toString()}{" "} */}
                        {domainRentPrice} {tld}
                      </p>
                    </div>
                    <div className="flex flex-row w-[100%] p-4 bg-white/10 justify-between border border-gray-600 rounded-lg">
                      <p>Duration</p>
                      <p>
                        {year} {yearSuffix}
                      </p>
                    </div>
                    <div className="flex flex-row w-[100%] p-4 bg-white/10 justify-between border border-gray-600 rounded-lg">
                      <p>Primary</p>
                      <input
                        type="checkbox"
                        className="bg-green-500 toggle toggle-green-500"
                        checked={isSetToPrimary}
                        onChange={(e) => setisSetToPrimary(e?.target?.checked)}
                      />
                    </div>
                  </div>
                  <button
                    className="px-4 py-2 mx-auto mt-5 text-sm border border-gray-400 w-fit bg-white/10 rounded-3xl"
                    onClick={() => {
                      if (!account) {
                        toast.error("Please connect wallet", {
                          style: {
                            background: "#363636",
                            color: "lightgray",
                          },
                        });
                        return;
                      } else {
                        handleRegisterDomain();
                      }
                    }}
                  >
                    Confirm
                  </button>
                </div>
              )}
          </RegistrationModal>
        ) : (
          !account && (
            <div className="flex items-center justify-center w-full my-5"></div>
          )
        )}
        <MultichainSelector />
      </div>
    </>
  );
};

export default RegisterExt;
