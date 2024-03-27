import {
  getContractByChainId
} from "./chunk-DVANIDQW.mjs";
import {
  getNameFromDomain
} from "./chunk-7S7J3P3P.mjs";
import {
  __async
} from "./chunk-6U7FN32R.mjs";

// src/evm/ens.ts
import { BigNumber, ethers, utils } from "ethers";
import { BigNumber as BigNumberNative } from "bignumber.js";
function getAvailableEns(domainName, providerUrl) {
  return __async(this, null, function* () {
    try {
      const provider = new ethers.providers.JsonRpcProvider(providerUrl);
      const { chainId } = yield provider.getNetwork();
      const contractInstance = getContractByChainId(chainId, provider);
      const name = getNameFromDomain(domainName);
      const labelHash = utils.keccak256(utils.toUtf8Bytes(name));
      const tokenId = BigNumber.from(labelHash).toString();
      const available = yield contractInstance.available(tokenId);
      return available;
    } catch (err) {
      throw err;
    }
  });
}
function getRentPriceEns(domainName, duration, providerUrl) {
  return __async(this, null, function* () {
    try {
      const provider = new ethers.providers.JsonRpcProvider(providerUrl);
      const { chainId } = yield provider.getNetwork();
      const contractInstance = getContractByChainId(chainId, provider);
      const name = getNameFromDomain(domainName);
      const price = yield contractInstance.rentPrice(name, duration);
      return new BigNumberNative(price.base._hex).div(1e18).toNumber();
    } catch (err) {
      throw err;
    }
  });
}

export {
  getAvailableEns,
  getRentPriceEns
};
