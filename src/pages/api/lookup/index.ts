import type { NextApiRequest, NextApiResponse } from "next";
// @ts-ignore
import { DotNamesSDK } from "@dotnames/dotnames-js";
// @ts-ignore
import { DomainChecker } from "@dotnames/domain-checker";

import { RPC_URL } from "@/configs/rpc";
import { ChainId } from "@/configs/chainIds";
import { YEAR_TO_SEC, ZERO_ADDRESS } from "@/configs/constants";
interface SearchResult {
  name: string;
  status: string;
  address: string;
  price: number;
  canRegister: boolean;
  error?: boolean;
  expiry?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const tld = req.query.prefix as string | "";
  const domainName = req.query.name as string | "";

  let result: SearchResult;
  try {
    //@ts-ignore
    const dotChecker = new DomainChecker({
      ethRPC: RPC_URL[ChainId.ETHEREUM],
      polygonRPC: RPC_URL[ChainId.POLYGON],
      bnbRPC: RPC_URL[ChainId.BSC],
      suiRPC: RPC_URL[ChainId.SUI],
      seiRPC: RPC_URL[ChainId.SEI],
      osmosisRPC: RPC_URL[ChainId.OSMOSIS],
    });

    // const address = await dotnames.resolveAddress(`${domainName}.${tld}`);
    const available = await dotChecker.getAvailable(`${domainName}.${tld}`);
    const expiry = await dotChecker.getDomainExpiry(`${domainName}.${tld}`);

    console.log(`🚀 ~ file: index.ts:43 ~ expiry:`, {
      expiry,
      domainName,
      name: `${domainName}.${tld}`,
    });

    if (available) {
      const price = await dotChecker.getRentPrice(
        `${domainName}.${tld}`,
        YEAR_TO_SEC
      );

      result = {
        name: `${domainName}.${tld}`,
        status: "Available",
        address: ZERO_ADDRESS,
        price: (price as number) || 0,
        canRegister: true,
        expiry: "0",
      };
    } else {
      result = {
        name: `${domainName}.${tld}`,
        status: "Registered",
        address: ZERO_ADDRESS,
        price: 0,
        canRegister: false,
        expiry,
      };
    }
  } catch (error) {
    console.log(error);

    result = {
      name: `${domainName}.${tld}`,
      status: "Error",
      address: "",
      price: 0,
      canRegister: false,
      error: true,
      expiry: "0",
    };
  }

  console.log(`🚀 ~ file: index.ts:53 ~ result:`, result);
  res.status(200).json(result);
}
