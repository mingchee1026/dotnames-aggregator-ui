import {
  getNameFromDomain
} from "./chunk-7S7J3P3P.mjs";
import {
  __async
} from "./chunk-6U7FN32R.mjs";

// src/non-evm/seins.ts
import { utils } from "ethers";
import { getCosmWasmClient } from "@sei-js/core";
import { BigNumber as BigNumberNative } from "bignumber.js";
var controllers = {
  "pacific-1": "sei1mrw7gcd76nng8p554f2c00557txjtxhpmrmskfyn39gjcs4ewhlqnzqmmf",
  "atlantic-2": "sei12p2mwewadmf46zmulydyuphdrsxlss6j924ef7wppylaa2g5eypsg403f3"
};
var registrars = {
  "pacific-1": "sei142qep0fke20yvs9s7ufgmxrxg37zhe486udrpjzsnglaw03pcyrqtf0fnx",
  "atlantic-2": "sei1ywtz0ug9syuy9mg00ce93ake4j84f0y6lshc8cxdq2czuyav895qf0mmqy"
};
function getAvailableSeiNs(domainName, providerUrl) {
  return __async(this, null, function* () {
    const name = getNameFromDomain(domainName);
    const labelHash0x = utils.keccak256(utils.toUtf8Bytes(name));
    const labelHash = labelHash0x.slice(2);
    console.log("\u{1F680} ~ getAvailableSeiNs ~ labelHash:", labelHash);
    const cosmWasmClient = yield getCosmWasmClient(providerUrl);
    const chainid = yield cosmWasmClient.getChainId();
    try {
      const queryValue = {
        is_available: {
          id: labelHash
        }
      };
      const data = yield cosmWasmClient.queryContractSmart(registrars[chainid], queryValue);
      console.log("\u{1F680} ~ getAvailableSeiNs ~ data:", data);
      if (data) {
        return data == null ? void 0 : data.available;
      } else {
        throw new Error("Unable to fetch data");
      }
    } catch (err) {
      throw err;
    }
  });
}
function getRentPriceSeiNs(domainName, duration, providerUrl) {
  return __async(this, null, function* () {
    const name = getNameFromDomain(domainName);
    const cosmWasmClient = yield getCosmWasmClient(providerUrl);
    const chainid = yield cosmWasmClient.getChainId();
    try {
      const queryValue = {
        rent_price: {
          name,
          duration
        }
      };
      const data = yield cosmWasmClient.queryContractSmart(
        // @ts-ignore
        controllers[chainid],
        // Controller
        queryValue
      );
      if (data) {
        return new BigNumberNative(data.price).div(1e6).toNumber();
      } else {
        throw new Error("Unable to fetch data");
      }
    } catch (err) {
      throw err;
    }
  });
}

export {
  getAvailableSeiNs,
  getRentPriceSeiNs
};
