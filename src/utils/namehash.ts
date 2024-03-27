// @ts-nocheck

import { ethers } from "ethers";
import { isEncodedLabelhash, decodeLabelhash } from "./labelhash";
// @ts-ignore
import { normalize } from "eth-ens-namehash";
import BigNumber from "bignumber.js";
import { DEFAULT_TLD } from "@/configs";
const sha3 = require("js-sha3").keccak_256;

const util = require("ethereumjs-util");
const nameashEns = require("eth-ens-namehash");
export const namehash = nameashEns.namehash;
export const normalise = nameashEns.normalize;
export const keccak256Hash = (input: string) => {
  const inputBuffer = Buffer.from(input, "utf8");
  return util.keccak256(inputBuffer).toString("hex");
};
export const namehashString = (input: string) => {
  var hash = nameashEns.hash(input);
  return (hash as string).substring(2);
};

export function generateTokenId(inputName: string) {
  if (inputName.endsWith(DEFAULT_TLD)) {
    // throw new Error("Contains tld")
    const inputNameNoTld = inputName.slice(0, inputName.length - 4);
    const tid = ethers.utils.keccak256(
      ethers.utils.toUtf8Bytes(inputNameNoTld)
    );
    const tidNum = new BigNumber(tid).toFormat().replaceAll(",", "");
    return tidNum;
  }
  if (inputName) {
    const tid = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(inputName));
    const tidNum = new BigNumber(tid).toFormat().replaceAll(",", "");
    return tidNum;
  }
  return 0;
}
