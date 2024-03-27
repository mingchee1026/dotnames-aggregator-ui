import { TLD_TO_PLATFORM_DETAILS } from "@/configs/constants";
import {
  useUDDomainRefundStatusSG,
  useUDDomainStatusDB,
} from "@/hooks/Ud/useUDTransactionBal";
import { formatWrapedText } from "@/utils";
import {
  UD_COIN_DENOM,
  UD_DOMAIN_VIEW_URL,
  UD_EXPLORER_URL,
  UD_MINT_API,
} from "@/views/Cart/components/Adapters/UDomainsCart/config";
import axios from "axios";
import BigNumber from "bignumber.js";
import Link from "next/link";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

type Props = {};

function UDDomainStatusCard({ domainPaid, account }: any) {
  const {
    data: dbData,
    error: dbAPIError,
    isLoading,
    refetch: refetchDomainDataFromDB,
  } = useUDDomainStatusDB(account, domainPaid?.domain);
  const {
    data: refundedStatusData,
    isLoading: refundedStatusDataIsLoading,
    error: refundedStatusDataError,
  } = useUDDomainRefundStatusSG(
    account,
    domainPaid?.domain,
    dbData?.status === "FAILED" && !isLoading ? true : false
  );

  console.log(`🚀 ~ file: UDDomainStatusCard.tsx:33 ~ refundedStatusData:`, {
    status: dbData?.status,
    refundedStatusData,
    refundedStatusDataIsLoading,
    refundedStatusDataError,
    name: domainPaid?.domain,
    domainPaid,
  });

  const tld = (domainPaid?.domain as string).split(".").at(-1);
  // @ts-ignore
  const platformData = TLD_TO_PLATFORM_DETAILS[tld];
  //   const isLoading = false;
  const handleRetryMint = async () => {
    const tid = toast.loading("Pending Txn");

    try {
      const mintResult = await axios.get(
        `${UD_MINT_API}/mint/${domainPaid?.transactionHash}`
      );
      if (mintResult) {
        console.log(
          `🚀 ~ file: CheckoutDomainModal.tsx:248 ~ mintResult:`,
          mintResult
        );
        toast.success(
          <div>
            <p>Transaction submitted to UD</p>
            <p>
              {" "}
              <a
                className="text-secondary text-xs"
                target="_blank"
                referrerPolicy="no-referrer"
                href={`${UD_EXPLORER_URL}/tx/${domainPaid?.transactionHash}`}
              >
                View On Explorer
              </a>
            </p>
          </div>,
          {
            id: tid,
          }
        );
      }
      await refetchDomainDataFromDB();
    } catch (error) {
      await refetchDomainDataFromDB();

      toast.error(
        <div>
          <p>UD Mint Failed</p>
        </div>,
        {
          id: tid,
        }
      );
      console.log(`🚀 ~ file: CheckoutDomainModal.tsx:241 ~ error:`, error);
    }
  };
  const handleCheckRefundStatus = async () => {
    const tid = toast.loading("Pending Txn");

    try {
      const mintResult = await axios.get(
        `${UD_MINT_API}/mint/${domainPaid?.transactionHash}`
      );
      if (mintResult) {
        console.log(
          `🚀 ~ file: CheckoutDomainModal.tsx:248 ~ mintResult:`,
          mintResult
        );
        toast.success(
          <div>
            <p>Transaction submitted to UD</p>
            <p>
              {" "}
              <a
                className="text-secondary text-xs"
                target="_blank"
                referrerPolicy="no-referrer"
                href={`${UD_EXPLORER_URL}/tx/${domainPaid?.transactionHash}`}
              >
                View On Explorer
              </a>
            </p>
          </div>,
          {
            id: tid,
          }
        );
      }
      await refetchDomainDataFromDB();
    } catch (error) {
      await refetchDomainDataFromDB();

      toast.error(
        <div>
          <p>UD Mint Failed</p>
        </div>,
        {
          id: tid,
        }
      );
      console.log(`🚀 ~ file: CheckoutDomainModal.tsx:241 ~ error:`, error);
    }
  };
  return (
    <div className="p-3 rounded-xl items-center gap-2 shadow-sm border border-gray-400/40 space-y-3 w-full  ">
      <div className="flex justify-between items-center">
        <div className="border border-gray-400/30 w-fit p-3 rounded-[1em] bg-base-100">
          <img
            src={platformData?.icon ?? "/images/platforms/ens.png"}
            alt=""
            className="w-[20px] h-[20px] lg:w-[40px] lg:h-[40px]"
          />
        </div>

        {dbData?.status === "COMPLETED" && (
          <Link
            href={`${UD_DOMAIN_VIEW_URL}/${domainPaid?.domain}`}
            target="_blank"
            referrerPolicy="no-referrer"
            className="btn  btn-circle   btn-xs lg:btn-sm btn-success text-white opacity-75 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="lg:w-[22px] lg:h-[22px] w-[14px] h-[14px]"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
            </svg>
          </Link>
        )}
        {dbData?.status === "FAILED" && (
          <button className="btn  btn-circle  btn-sm btn-error text-white opacity-75 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="lg:w-[22px] lg:h-[22px] w-[14px] h-[14px]"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          </button>
        )}
        {dbData?.status === "PROCESSING" && (
          <button className="btn  btn-circle  btn-sm   ">
            <span className="loading loading-spinner loading-md"></span>
          </button>
        )}
        {!dbData?.status && (
          <div className="tooltip" data-tip="Unknown Domain Status">
            <button className="btn btn-circle  btn-sm btn-accent text-white ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.475 5.458c-.284 0-.514-.237-.47-.517C4.28 3.24 5.576 2 7.825 2c2.25 0 3.767 1.36 3.767 3.215 0 1.344-.665 2.288-1.79 2.973-1.1.659-1.414 1.118-1.414 2.01v.03a.5.5 0 0 1-.5.5h-.77a.5.5 0 0 1-.5-.495l-.003-.2c-.043-1.221.477-2.001 1.645-2.712 1.03-.632 1.397-1.135 1.397-2.028 0-.979-.758-1.698-1.926-1.698-1.009 0-1.71.529-1.938 1.402-.066.254-.278.461-.54.461h-.777ZM7.496 14c.622 0 1.095-.474 1.095-1.09 0-.618-.473-1.092-1.095-1.092-.606 0-1.087.474-1.087 1.091S6.89 14 7.496 14"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="tooltip" data-tip={domainPaid?.domain}>
        <p className=" text-sm lg:text-xl font-[500]">
          {formatWrapedText(domainPaid?.domain, 5, 6)}
        </p>
      </div>

      <div>
        {isLoading ? (
          <p className="w-full h-[2em] animate-pulse bg-gray-400/20 rounded-xl"></p>
        ) : (
          <p className="text-xs lg:text-sm capitalize">
            {dbData?.status?.toLowerCase() || "Unknown"}
          </p>
        )}
      </div>
      {isLoading ? (
        <p className="w-full h-[2em] animate-pulse bg-gray-400/20 rounded-xl"></p>
      ) : (
        <div>
          {dbAPIError && (
            <button
              onClick={handleRetryMint}
              className="btn text-[10px] btn-sm lg:btn-md lg:text-md btn-error text-white w-full  rounded-full"
            >
              Retry Mint
            </button>
          )}
          {!refundedStatusData && dbData?.status === "FAILED" && (
            <button
              onClick={handleCheckRefundStatus}
              className="btn text-[10px] btn-sm lg:btn-md lg:text-md btn-secondary  w-full rounded-full"
            >
              Check refund status
            </button>
          )}
          {dbData?.status === "COMPLETED" && (
            <Link
              href={`${UD_DOMAIN_VIEW_URL}/${domainPaid?.domain}`}
              target="_blank"
              referrerPolicy="no-referrer"
              className="btn w-full rounded-full btn-secondary text-[10px] btn-sm lg:btn-md lg:text-md"
            >
              <img
                src={platformData?.icon ?? "/images/platforms/ens.png"}
                alt={platformData?.platform}
                className="w-[12px] h-[12px] lg:w-[16px] lg:h-[16px]"
              />{" "}
              View on UD
            </Link>
          )}
          {dbData?.status === "PROCESSING" && (
            <Link
              href={`${UD_EXPLORER_URL}/tx/${domainPaid?.transactionHash}`}
              target="_blank"
              referrerPolicy="no-referrer"
              className="btn w-full rounded-full btn-secondary text-[10px] btn-sm lg:btn-md lg:text-md "
            >
              View  Txn
            </Link>
          )}
        </div>
      )}
      <Toaster />
    </div>
  );
}

export default UDDomainStatusCard;
