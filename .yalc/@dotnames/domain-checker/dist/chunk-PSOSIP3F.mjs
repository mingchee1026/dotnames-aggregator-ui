import {
  getContractByChainId
} from "./chunk-DVANIDQW.mjs";
import {
  getNameFromDomain
} from "./chunk-7S7J3P3P.mjs";
import {
  __async
} from "./chunk-6U7FN32R.mjs";

// src/evm/sid.ts
import { BigNumber, ethers, utils } from "ethers";
function getAvailableSIDBnb(domainName, providerUrl) {
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
function getAvailableSIDArb(domainName, providerUrl) {
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
function getRentPriceSIDBnb(domainName, duration, providerUrl) {
  return __async(this, null, function* () {
    try {
      const provider = new ethers.providers.JsonRpcProvider(providerUrl);
      const { chainId } = yield provider.getNetwork();
      const contractInstance = getContractByChainId(chainId, provider);
      const name = getNameFromDomain(domainName);
      const price = yield contractInstance.rentPrice(name, duration);
      return price.base._hex;
    } catch (err) {
      throw err;
    }
  });
}
function getRentPriceSIDArb(domainName, duration, providerUrl) {
  return __async(this, null, function* () {
    try {
      const provider = new ethers.providers.JsonRpcProvider(providerUrl);
      const { chainId } = yield provider.getNetwork();
      const contractInstance = getContractByChainId(chainId, provider);
      const name = getNameFromDomain(domainName);
      const price = yield contractInstance.rentPrice(name, duration);
      return price.base._hex;
    } catch (err) {
      throw err;
    }
  });
}

export {
  getAvailableSIDBnb,
  getAvailableSIDArb,
  getRentPriceSIDBnb,
  getRentPriceSIDArb
};
