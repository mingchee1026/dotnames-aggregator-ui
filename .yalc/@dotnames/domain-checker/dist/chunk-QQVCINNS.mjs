import {
  ENSRegControllerABI_default
} from "./chunk-ZI3MMQNI.mjs";

// src/utils/contractAddresses.ts
import { Contract } from "ethers";
import Registrar from "@siddomains/sid-contracts/build/contracts/BNBRegistrarController.json";
import BaseImpl from "@siddomains/sid-contracts/build/contracts/BaseRegistrarImplementation.json";
var getContractAddressByChainId = (chainId) => {
  switch (chainId) {
    case 1:
      return "0x253553366Da8546fC250F225fe3d25d0C782303b";
    case 5:
      return "0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5";
    case 97:
      return "0x7a85af7df7ef1b1c9d41b29168485c90816b65a1";
    case 56:
      return "0x3aaec59fd6efa66f147855f2e8132248480daf3c";
    case 42161:
      return "0x36bDa80739B6cF725a324454fB060Fe963348d2B";
    case 421613:
      return "0xdA8219C2011732fF4179407f531ce30845462607";
  }
};
var getBaseImplContractAddressByChainId = (chainId) => {
  switch (chainId) {
    case 1:
      return "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85";
    case 5:
      return "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85";
    case 97:
      return "0x888A2BA9787381000Cd93CA4bd23bB113f03C5Af";
    case 56:
      return "0xE3b1D32e43Ce8d658368e2CBFF95D57Ef39Be8a6";
    case 42161:
      return "0x5d482D501b369F5bA034DEC5c5fb7A50d2D6Ca20";
    case 421613:
      return "0x9994166Ad2B60FE759e1b82C68F10DB2C921f711";
  }
};
var getContractByChainId = (chainId, provider) => {
  const contractAddress = getContractAddressByChainId(chainId) || "";
  console.log("\u{1F680} ~ getContractByChainId ~ contractAddress:", contractAddress);
  if ([5, 1].includes(chainId)) {
    return new Contract(contractAddress, ENSRegControllerABI_default, provider);
  }
  return new Contract(contractAddress, Registrar, provider);
};
var getBaseImplContractByChainId = (chainId, provider) => {
  const contractAddress = getBaseImplContractAddressByChainId(chainId) || "";
  console.log("\u{1F680} ~ getContractByChainId ~ contractAddress:", contractAddress);
  return new Contract(contractAddress, BaseImpl, provider);
};

export {
  getContractAddressByChainId,
  getBaseImplContractAddressByChainId,
  getContractByChainId,
  getBaseImplContractByChainId
};
