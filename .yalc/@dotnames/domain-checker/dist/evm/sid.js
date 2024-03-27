"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/evm/sid.ts
var sid_exports = {};
__export(sid_exports, {
  getAvailableSIDArb: () => getAvailableSIDArb,
  getAvailableSIDBnb: () => getAvailableSIDBnb,
  getDomainExpirySIDArb: () => getDomainExpirySIDArb,
  getDomainExpirySIDBnb: () => getDomainExpirySIDBnb,
  getRentPriceSIDArb: () => getRentPriceSIDArb,
  getRentPriceSIDBnb: () => getRentPriceSIDBnb
});
module.exports = __toCommonJS(sid_exports);
var import_ethers2 = require("ethers");

// src/utils/contractAddresses.ts
var import_ethers = require("ethers");
var import_BNBRegistrarController = __toESM(require("@siddomains/sid-contracts/build/contracts/BNBRegistrarController.json"));
var import_BaseRegistrarImplementation = __toESM(require("@siddomains/sid-contracts/build/contracts/BaseRegistrarImplementation.json"));

// src/abi/ENSRegControllerABI.json
var ENSRegControllerABI_default = [
  {
    inputs: [
      {
        internalType: "contract BaseRegistrarImplementation",
        name: "_base",
        type: "address"
      },
      { internalType: "contract IPriceOracle", name: "_prices", type: "address" },
      { internalType: "uint256", name: "_minCommitmentAge", type: "uint256" },
      { internalType: "uint256", name: "_maxCommitmentAge", type: "uint256" },
      {
        internalType: "contract ReverseRegistrar",
        name: "_reverseRegistrar",
        type: "address"
      },
      { internalType: "contract INameWrapper", name: "_nameWrapper", type: "address" },
      { internalType: "contract ENS", name: "_ens", type: "address" }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    inputs: [{ internalType: "bytes32", name: "commitment", type: "bytes32" }],
    name: "CommitmentTooNew",
    type: "error"
  },
  {
    inputs: [{ internalType: "bytes32", name: "commitment", type: "bytes32" }],
    name: "CommitmentTooOld",
    type: "error"
  },
  {
    inputs: [{ internalType: "uint256", name: "duration", type: "uint256" }],
    name: "DurationTooShort",
    type: "error"
  },
  { inputs: [], name: "InsufficientValue", type: "error" },
  { inputs: [], name: "MaxCommitmentAgeTooHigh", type: "error" },
  { inputs: [], name: "MaxCommitmentAgeTooLow", type: "error" },
  {
    inputs: [{ internalType: "string", name: "name", type: "string" }],
    name: "NameNotAvailable",
    type: "error"
  },
  { inputs: [], name: "ResolverRequiredWhenDataSupplied", type: "error" },
  {
    inputs: [{ internalType: "bytes32", name: "commitment", type: "bytes32" }],
    name: "UnexpiredCommitmentExists",
    type: "error"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "string", name: "name", type: "string" },
      { indexed: true, internalType: "bytes32", name: "label", type: "bytes32" },
      { indexed: true, internalType: "address", name: "owner", type: "address" },
      { indexed: false, internalType: "uint256", name: "baseCost", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "premium", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "expires", type: "uint256" }
    ],
    name: "NameRegistered",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "string", name: "name", type: "string" },
      { indexed: true, internalType: "bytes32", name: "label", type: "bytes32" },
      { indexed: false, internalType: "uint256", name: "cost", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "expires", type: "uint256" }
    ],
    name: "NameRenewed",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "previousOwner", type: "address" },
      { indexed: true, internalType: "address", name: "newOwner", type: "address" }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    inputs: [],
    name: "MIN_REGISTRATION_DURATION",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "string", name: "name", type: "string" }],
    name: "available",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "bytes32", name: "commitment", type: "bytes32" }],
    name: "commit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    name: "commitments",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "duration", type: "uint256" },
      { internalType: "bytes32", name: "secret", type: "bytes32" },
      { internalType: "address", name: "resolver", type: "address" },
      { internalType: "bytes[]", name: "data", type: "bytes[]" },
      { internalType: "bool", name: "reverseRecord", type: "bool" },
      { internalType: "uint16", name: "ownerControlledFuses", type: "uint16" }
    ],
    name: "makeCommitment",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [],
    name: "maxCommitmentAge",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "minCommitmentAge",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "nameWrapper",
    outputs: [{ internalType: "contract INameWrapper", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "prices",
    outputs: [{ internalType: "contract IPriceOracle", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "_token", type: "address" },
      { internalType: "address", name: "_to", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" }
    ],
    name: "recoverFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "duration", type: "uint256" },
      { internalType: "bytes32", name: "secret", type: "bytes32" },
      { internalType: "address", name: "resolver", type: "address" },
      { internalType: "bytes[]", name: "data", type: "bytes[]" },
      { internalType: "bool", name: "reverseRecord", type: "bool" },
      { internalType: "uint16", name: "ownerControlledFuses", type: "uint16" }
    ],
    name: "register",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "uint256", name: "duration", type: "uint256" }
    ],
    name: "renew",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "uint256", name: "duration", type: "uint256" }
    ],
    name: "rentPrice",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "base", type: "uint256" },
          { internalType: "uint256", name: "premium", type: "uint256" }
        ],
        internalType: "struct IPriceOracle.Price",
        name: "price",
        type: "tuple"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "reverseRegistrar",
    outputs: [{ internalType: "contract ReverseRegistrar", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceID", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "string", name: "name", type: "string" }],
    name: "valid",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];

// src/utils/contractAddresses.ts
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
    return new import_ethers.Contract(contractAddress, ENSRegControllerABI_default, provider);
  }
  return new import_ethers.Contract(contractAddress, import_BNBRegistrarController.default, provider);
};
var getBaseImplContractByChainId = (chainId, provider) => {
  const contractAddress = getBaseImplContractAddressByChainId(chainId) || "";
  console.log("\u{1F680} ~ getContractByChainId ~ contractAddress:", contractAddress);
  return new import_ethers.Contract(contractAddress, import_BaseRegistrarImplementation.default, provider);
};

// src/utils/domainFormat.ts
function getNameFromDomain(domainName) {
  const extension = domainName.split(".");
  if (!extension)
    return "";
  return extension[0].toLowerCase();
}

// src/evm/sid.ts
var import_bignumber = require("bignumber.js");
function getAvailableSIDBnb(domainName, providerUrl) {
  return __async(this, null, function* () {
    try {
      const provider = new import_ethers2.ethers.providers.JsonRpcProvider(providerUrl);
      const { chainId } = yield provider.getNetwork();
      const contractInstance = getContractByChainId(chainId, provider);
      const name = getNameFromDomain(domainName);
      const available = yield contractInstance.available(name);
      return available;
    } catch (err) {
      throw err;
    }
  });
}
function getAvailableSIDArb(domainName, providerUrl) {
  return __async(this, null, function* () {
    try {
      const provider = new import_ethers2.ethers.providers.JsonRpcProvider(providerUrl);
      const { chainId } = yield provider.getNetwork();
      const contractInstance = getContractByChainId(chainId, provider);
      const name = getNameFromDomain(domainName);
      const available = yield contractInstance.available(name);
      return available;
    } catch (err) {
      throw err;
    }
  });
}
function getRentPriceSIDBnb(domainName, duration, providerUrl) {
  return __async(this, null, function* () {
    try {
      const provider = new import_ethers2.ethers.providers.JsonRpcProvider(providerUrl);
      const { chainId } = yield provider.getNetwork();
      const contractInstance = getContractByChainId(chainId, provider);
      const name = getNameFromDomain(domainName);
      const price = yield contractInstance.rentPrice(name, duration);
      return new import_bignumber.BigNumber(price.base._hex).div(1e18).toNumber();
    } catch (err) {
      throw err;
    }
  });
}
function getRentPriceSIDArb(domainName, duration, providerUrl) {
  return __async(this, null, function* () {
    try {
      const provider = new import_ethers2.ethers.providers.JsonRpcProvider(providerUrl);
      const { chainId } = yield provider.getNetwork();
      const contractInstance = getContractByChainId(chainId, provider);
      const name = getNameFromDomain(domainName);
      const price = yield contractInstance.rentPrice(name, duration);
      return new import_bignumber.BigNumber(price.base._hex).div(1e18).toNumber();
    } catch (err) {
      throw err;
    }
  });
}
function getDomainExpirySIDBnb(domainName, providerUrl) {
  return __async(this, null, function* () {
    try {
      const provider = new import_ethers2.ethers.providers.JsonRpcProvider(providerUrl);
      const { chainId } = yield provider.getNetwork();
      const contractInstance = getBaseImplContractByChainId(chainId, provider);
      const name = getNameFromDomain(domainName);
      const labelHash = import_ethers2.utils.keccak256(import_ethers2.utils.toUtf8Bytes(name));
      const tokenId = import_ethers2.BigNumber.from(labelHash).toString();
      const expiry = yield contractInstance.nameExpires(tokenId);
      return new import_bignumber.BigNumber(expiry._hex).multipliedBy(1e3).toString();
    } catch (err) {
      throw err;
    }
  });
}
function getDomainExpirySIDArb(domainName, providerUrl) {
  return __async(this, null, function* () {
    try {
      const provider = new import_ethers2.ethers.providers.JsonRpcProvider(providerUrl);
      const { chainId } = yield provider.getNetwork();
      const contractInstance = getBaseImplContractByChainId(chainId, provider);
      const name = getNameFromDomain(domainName);
      const labelHash = import_ethers2.utils.keccak256(import_ethers2.utils.toUtf8Bytes(name));
      const tokenId = import_ethers2.BigNumber.from(labelHash).toString();
      const expiry = yield contractInstance.nameExpires(tokenId);
      return new import_bignumber.BigNumber(expiry._hex).multipliedBy(1e3).toString();
    } catch (err) {
      throw err;
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getAvailableSIDArb,
  getAvailableSIDBnb,
  getDomainExpirySIDArb,
  getDomainExpirySIDBnb,
  getRentPriceSIDArb,
  getRentPriceSIDBnb
});
