import {
  ENSRegControllerABI_default
} from "./chunk-ZI3MMQNI.mjs";

// src/utils/contractAddresses.ts
import { Contract } from "ethers";
import Registrar from "@siddomains/sid-contracts/build/contracts/BNBRegistrarController.json";
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
var getContractByChainId = (chainId, provider) => {
  const contractAddress = getContractAddressByChainId(chainId) || "";
  console.log("\u{1F680} ~ getContractByChainId ~ contractAddress:", contractAddress);
  if ([5, 1].includes(chainId)) {
    return new Contract(contractAddress, ENSRegControllerABI_default, provider);
  }
  return new Contract(contractAddress, Registrar, provider);
};

export {
  getContractAddressByChainId,
  getContractByChainId
};
