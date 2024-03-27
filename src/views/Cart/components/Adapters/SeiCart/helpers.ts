import { getDomainWitoutTld } from "@/utils";
import { SEI_DEFAULT_RESOLVER } from "./config";
import { contracts } from "@/configs/contracts";
import { GasPrice, coins } from "@cosmjs/stargate";
import { DomainInterFace } from "@/types/domain";
import { YEAR_TO_SEC } from "@/configs/constants";
import BigNumber from "bignumber.js";

export const bulkRegisterDotSeiNft = async ({
  signerCosmWasm,
  sender,
  domainsList,
  chainId,
}: {
  signerCosmWasm: any | undefined;
  sender: string;
  domainsList: DomainInterFace[];
  chainId: any;
}) => {


  try {
    const mintmsgs = domainsList?.map((domain: DomainInterFace) => {
      const lowercasedLabel = domain?.name?.toLowerCase();

      const labelWitoutTld = getDomainWitoutTld(lowercasedLabel);
      return {
        typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
        value: {
          sender,
          msg: Buffer.from(
            JSON.stringify({
              register: {
                address: sender,
                duration: domain?.years! * YEAR_TO_SEC,
                name: labelWitoutTld,
                owner: sender,
                resolver: SEI_DEFAULT_RESOLVER,
                reverse_record: false,
              },
            }).trim()
          ),
          // @ts-ignore
          contract: contracts.Controller[chainId],
          funds: [
            {
              denom: "usei",
              amount: new BigNumber(domain?.fullPrice as number)
                ?.multipliedBy(1e6)
                .toString(),
            },
          ],
        },
      };
    });
    const gasData = {
      amount: coins(2 * domainsList?.length, "usei"),
      gas: "3000000",
    };

    const tx = await signerCosmWasm?.signAndBroadcast(
      sender,
      mintmsgs,
      "auto",
      ""
    );
    if (tx) {
      return tx;
    } else {
      throw new Error("Unable to execute txn");
    }
  } catch (error) {
    console.log(`🚀 ~ file: helpers.ts:69 ~ error:`, error);

    return null;
  }
};
export const registerDotSeiNft = async ({
  signerCosmWasm,
  sender,
  label,
  duration,
  funds,
  chainId,
}: {
  signerCosmWasm: any | undefined;
  sender: string;
  label: string;
  duration: number;
  funds: string;
  chainId: any;
}) => {
  console.log(`🚀 ~ file: helpers.ts:67 ~ funds:`, funds);
  const lowercasedLabel = label?.toLowerCase();

  const labelWitoutTld = getDomainWitoutTld(lowercasedLabel);
  const mintmsg = {
    typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
    value: {
      sender,
      msg: Buffer.from(
        JSON.stringify({
          register: {
            address: sender,
            duration: duration,
            name: labelWitoutTld,
            owner: sender,
            resolver: SEI_DEFAULT_RESOLVER,
            reverse_record: false,
          },
        }).trim()
      ),
      // @ts-ignore
      contract: contracts.Controller[chainId],
      funds: [
        {
          denom: "usei",
          amount: funds,
        },
      ],
    },
  };

  //   const msg = {
  //     register: {
  //       address: sender,
  //       name: label,
  //       owner: sender,
  //       duration: duration,
  //       resolver: SEI_DEFAULT_RESOLVER,
  //     },
  //   };
  //   const fundsAmt: any = [
  //     {
  //       denom: "usei",
  //       amount: funds,
  //     },
  //   ];
  const fee = "auto";
  //   const result = await signerCosmWasm?.execute(
  //     sender,
  //     // @ts-ignore
  //     contracts.Controller[chainId],
  //     msg,
  //     fee,
  //     undefined, //"",
  //     fundsAmt //amts
  //   );
  //   console.log(`🚀 ~ file: helpers.ts:128 ~ result:`, result);
  const gasData = {
    amount: coins(1, "usei"),
    gas: "3000000",
  };
  try {
    const tx = await signerCosmWasm?.signAndBroadcast(
      sender,
      [mintmsg],
      gasData,
      ""
    );
    if (tx) {
      return tx;
    } else {
      throw new Error("Unable to execute txn");
    }
  } catch (error) {
    console.log(`controller85 ~ error:`, error);

    return null;
  }
};
