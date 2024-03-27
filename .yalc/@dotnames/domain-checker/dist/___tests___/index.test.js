"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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

// src/evm/ens.ts
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

// src/evm/ens.ts
var import_bignumber = require("bignumber.js");
function getAvailableEns(domainName, providerUrl) {
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
function getRentPriceEns(domainName, duration, providerUrl) {
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
function getDomainExpiryEns(domainName, providerUrl) {
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

// src/evm/sid.ts
var import_ethers3 = require("ethers");
var import_bignumber2 = require("bignumber.js");
function getAvailableSIDBnb(domainName, providerUrl) {
  return __async(this, null, function* () {
    try {
      const provider = new import_ethers3.ethers.providers.JsonRpcProvider(providerUrl);
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
      const provider = new import_ethers3.ethers.providers.JsonRpcProvider(providerUrl);
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
      const provider = new import_ethers3.ethers.providers.JsonRpcProvider(providerUrl);
      const { chainId } = yield provider.getNetwork();
      const contractInstance = getContractByChainId(chainId, provider);
      const name = getNameFromDomain(domainName);
      const price = yield contractInstance.rentPrice(name, duration);
      return new import_bignumber2.BigNumber(price.base._hex).div(1e18).toNumber();
    } catch (err) {
      throw err;
    }
  });
}
function getRentPriceSIDArb(domainName, duration, providerUrl) {
  return __async(this, null, function* () {
    try {
      const provider = new import_ethers3.ethers.providers.JsonRpcProvider(providerUrl);
      const { chainId } = yield provider.getNetwork();
      const contractInstance = getContractByChainId(chainId, provider);
      const name = getNameFromDomain(domainName);
      const price = yield contractInstance.rentPrice(name, duration);
      return new import_bignumber2.BigNumber(price.base._hex).div(1e18).toNumber();
    } catch (err) {
      throw err;
    }
  });
}
function getDomainExpirySIDBnb(domainName, providerUrl) {
  return __async(this, null, function* () {
    try {
      const provider = new import_ethers3.ethers.providers.JsonRpcProvider(providerUrl);
      const { chainId } = yield provider.getNetwork();
      const contractInstance = getBaseImplContractByChainId(chainId, provider);
      const name = getNameFromDomain(domainName);
      const labelHash = import_ethers3.utils.keccak256(import_ethers3.utils.toUtf8Bytes(name));
      const tokenId = import_ethers3.BigNumber.from(labelHash).toString();
      const expiry = yield contractInstance.nameExpires(tokenId);
      return new import_bignumber2.BigNumber(expiry._hex).multipliedBy(1e3).toString();
    } catch (err) {
      throw err;
    }
  });
}
function getDomainExpirySIDArb(domainName, providerUrl) {
  return __async(this, null, function* () {
    try {
      const provider = new import_ethers3.ethers.providers.JsonRpcProvider(providerUrl);
      const { chainId } = yield provider.getNetwork();
      const contractInstance = getBaseImplContractByChainId(chainId, provider);
      const name = getNameFromDomain(domainName);
      const labelHash = import_ethers3.utils.keccak256(import_ethers3.utils.toUtf8Bytes(name));
      const tokenId = import_ethers3.BigNumber.from(labelHash).toString();
      const expiry = yield contractInstance.nameExpires(tokenId);
      return new import_bignumber2.BigNumber(expiry._hex).multipliedBy(1e3).toString();
    } catch (err) {
      throw err;
    }
  });
}

// src/non-evm/seins.ts
var import_ethers4 = require("ethers");
var import_core = require("@sei-js/core");
var import_bignumber3 = require("bignumber.js");
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
    const labelHash0x = import_ethers4.utils.keccak256(import_ethers4.utils.toUtf8Bytes(name));
    const labelHash = labelHash0x.slice(2);
    console.log("\u{1F680} ~ getAvailableSeiNs ~ labelHash:", labelHash);
    const cosmWasmClient = yield (0, import_core.getCosmWasmClient)(providerUrl);
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
    const cosmWasmClient = yield (0, import_core.getCosmWasmClient)(providerUrl);
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
        return new import_bignumber3.BigNumber(data.price).div(1e6).toNumber();
      } else {
        throw new Error("Unable to fetch data");
      }
    } catch (err) {
      throw err;
    }
  });
}
function getDomainExpirySeiNs(domainName, providerUrl) {
  return __async(this, null, function* () {
    const name = getNameFromDomain(domainName);
    const lowercasedLabel = name == null ? void 0 : name.toLowerCase();
    const labelHash0x = import_ethers4.utils.keccak256(import_ethers4.utils.toUtf8Bytes(lowercasedLabel));
    const nameHash = labelHash0x.slice(2);
    const cosmWasmClient = yield (0, import_core.getCosmWasmClient)(providerUrl);
    const chainid = yield cosmWasmClient.getChainId();
    try {
      const queryValue = {
        get_expires: {
          id: nameHash
        }
      };
      const data = yield cosmWasmClient.queryContractSmart(
        // @ts-ignore
        registrars[chainid],
        // registrars
        queryValue
      );
      if (data) {
        return new import_bignumber3.BigNumber(data.expires).multipliedBy(1e3).toString();
      } else {
        throw new Error("Unable to fetch data");
      }
    } catch (err) {
      throw err;
    }
  });
}

// src/non-evm/suins.ts
var import_sui = require("@mysten/sui.js");

// src/utils/constants.ts
var YEAR_TO_SEC = 31536e3;

// src/non-evm/suins.ts
var suiNsPackage = {
  PACKAGE_ADDRESS: "0xd22b24490e0bae52676651b4f56660a5ff8022a2576e0089f79b3c88d44e08f0",
  SUINS_ADDRESS: "0x6e0ddefc0ad98889c04bab9639e512c21766c5e6366f89e696956d9be6952871",
  AUCTION_HOUSE: "0x2588e11685b460c725e1dc6739a57c483fcd23977369af53d432605225e387f9",
  AUCTIONS: "0x26ae0b9d1c4cd775cb39c8817498eef23adadbe7936302cf717d77b0a61b59b7",
  REGISTRY: "0xe64cd9db9f829c6cc405d9790bd71567ae07259855f4fba6f02c84f52298c106",
  REVERSE_REGISTRY: "0x2fd099e17a292d2bc541df474f9fafa595653848cbabb2d7a4656ec786a1969f"
};
function getAvailableSui(domainName, fullnode) {
  return __async(this, null, function* () {
    try {
      const connection = new import_sui.Connection({
        fullnode
      });
      const provider = new import_sui.JsonRpcProvider(connection);
      const [, domain, topLevelDomain] = domainName.match(/^(.+)\.([^.]+)$/) || [];
      const registryAddress = import_sui.SuiAddress.create(suiNsPackage.REGISTRY);
      const registryResponse = yield getDynamicFieldObject(
        registryAddress,
        [topLevelDomain, domain],
        `${suiNsPackage.PACKAGE_ADDRESS}::domain::Domain`,
        provider
      );
      const nameObject = parseRegistryResponse(registryResponse);
      if (!nameObject.id) {
        return true;
      }
      return false;
    } catch (err) {
      return true;
    }
  });
}
function getPriceSuiNs(domainName, duration, fullnode) {
  return __async(this, null, function* () {
    const durationInYears = duration / YEAR_TO_SEC;
    if (durationInYears > 5) {
      throw new Error("Duration should be less than 6 Years");
    }
    try {
      const [, domain, topLevelDomain] = domainName.match(/^(.+)\.([^.]+)$/) || [];
      let price = 20 * durationInYears;
      if (domain.length === 3) {
        price = 500 * durationInYears;
      } else if (domain.length === 4) {
        price = 100 * durationInYears;
      }
      return price;
    } catch (err) {
      throw err;
    }
  });
}
function getDomainExpirySuiNs(domainName, fullnode) {
  return __async(this, null, function* () {
    try {
      const connection = new import_sui.Connection({
        fullnode
      });
      const provider = new import_sui.JsonRpcProvider(connection);
      const [, domain, topLevelDomain] = domainName.match(/^(.+)\.([^.]+)$/) || [];
      const registryAddress = import_sui.SuiAddress.create(suiNsPackage.REGISTRY);
      const registryResponse = yield getDynamicFieldObject(
        registryAddress,
        [topLevelDomain, domain],
        `${suiNsPackage.PACKAGE_ADDRESS}::domain::Domain`,
        provider
      );
      const nameObject = parseRegistryResponse(registryResponse);
      return nameObject.expirationTimestampMs || "0";
    } catch (err) {
      throw err;
    }
  });
}
function getDynamicFieldObject(parentObjectId, key, type = "0x1::string::String", suiProvider) {
  return __async(this, null, function* () {
    var _a;
    const dynamicFieldObject = yield suiProvider.getDynamicFieldObject({
      parentId: parentObjectId,
      name: {
        type,
        value: key
      }
    });
    if (((_a = dynamicFieldObject.error) == null ? void 0 : _a.code) === "dynamicFieldNotFound")
      return;
    return dynamicFieldObject;
  });
}
var camelCase = (string) => string.replace(/(_\w)/g, (g) => g[1].toUpperCase());
var parseObjectDataResponse = (response) => {
  var _a, _b;
  return (_b = (_a = response == null ? void 0 : response.data) == null ? void 0 : _a.content) == null ? void 0 : _b.fields;
};
var parseRegistryResponse = (response) => {
  var _a, _b, _c, _d;
  const fields = ((_b = (_a = parseObjectDataResponse(response)) == null ? void 0 : _a.value) == null ? void 0 : _b.fields) || {};
  const object = Object.fromEntries(
    Object.entries(__spreadValues({}, fields)).map(([key, val]) => [camelCase(key), val])
  );
  if ((_c = response == null ? void 0 : response.data) == null ? void 0 : _c.objectId) {
    object.id = response.data.objectId;
  }
  delete object.data;
  const data = (((_d = fields.data) == null ? void 0 : _d.fields.contents) || []).reduce(
    (acc, c) => {
      const key = c.fields.key;
      const value = c.fields.value;
      return __spreadProps(__spreadValues({}, acc), {
        [camelCase(key)]: c.type.includes("Address") || key === "addr" ? (0, import_sui.normalizeSuiAddress)(value) : value
      });
    },
    {}
  );
  return __spreadValues(__spreadValues({}, object), data);
};

// src/utils/extensionData.json
var extensionData_default = {
  eth: "ENS",
  ens: "ENS",
  bnb: "SpaceIdBnb",
  arb: "SpaceIdArb",
  crypto: "UnstoppableDomains",
  x: "UnstoppableDomains",
  polygon: "UnstoppableDomains",
  zil: "UnstoppableDomains",
  nft: "UnstoppableDomains",
  wallet: "UnstoppableDomains",
  dao: "UnstoppableDomains",
  blockchain: "UnstoppableDomains",
  bitcoin: "UnstoppableDomains",
  sui: "SuiNs",
  sei: "SeiNS"
};

// src/utils/detectNameService.ts
function getExtensionFromDomain(domainName) {
  const extension = domainName.split(".").pop();
  if (!extension)
    return "";
  return extension.toLowerCase();
}
function fetchExtensionData() {
  return extensionData_default;
}
function detectNameService(domainName) {
  return __async(this, null, function* () {
    const extension = getExtensionFromDomain(domainName).toLowerCase();
    if (extension === "") {
      return 13 /* None */;
    }
    const extensionMap = fetchExtensionData();
    const domainServiceName = extensionMap.hasOwnProperty(extension) ? extensionMap[extension] : null;
    switch (domainServiceName) {
      case "ENS":
        return 1 /* ENS */;
      case "SpaceIdBnb":
        return 2 /* SpaceIdBnb */;
      case "SpaceIdArb":
        return 3 /* SpaceIdArb */;
      case "UnstoppableDomains":
        return 4 /* UnstoppableDomains */;
      case "SuiNs":
        return 10 /* SuiNs */;
      case "SeiNS":
        return 12 /* SeiNS */;
      default:
        return 1 /* ENS */;
    }
  });
}

// src/utils/rpc.ts
var RPC = {
  eth: "https://rpc.ankr.com/eth",
  polygon: "https://rpc.ankr.com/polygon",
  bnb: "https://rpc.ankr.com/bsc",
  arb: "https://1rpc.io/arb",
  sui: "https://sui.getblock.io/3b3d419a-32f2-40f0-a0fc-9a7da31a227c/mainnet/",
  sei: "https://sei-rpc.polkachu.com/",
  osmosis: "https://rpc.osmosis.zone"
};

// src/index.ts
var ethRPC;
var polygonRPC;
var bnbRPC;
var arbRPC;
var suiRPC;
var seiRPC;
var osmosisRPC;
var DomainChecker = class {
  constructor(param) {
    ethRPC = (param == null ? void 0 : param.ethRPC) ? param == null ? void 0 : param.ethRPC : RPC.eth;
    polygonRPC = (param == null ? void 0 : param.polygonRPC) ? param == null ? void 0 : param.polygonRPC : RPC.polygon;
    bnbRPC = (param == null ? void 0 : param.bnbRPC) ? param == null ? void 0 : param.bnbRPC : RPC.bnb;
    arbRPC = (param == null ? void 0 : param.arbRPC) ? param == null ? void 0 : param.arbRPC : RPC.arb;
    suiRPC = (param == null ? void 0 : param.suiRPC) ? param == null ? void 0 : param.suiRPC : RPC.sui;
    seiRPC = (param == null ? void 0 : param.seiRPC) ? param == null ? void 0 : param.seiRPC : RPC.sei;
    osmosisRPC = (param == null ? void 0 : param.osmosisRPC) ? param == null ? void 0 : param.osmosisRPC : RPC.osmosis;
  }
  setProviderUrl(param) {
    return __async(this, null, function* () {
      ethRPC = (param == null ? void 0 : param.ethRPC) ? param == null ? void 0 : param.ethRPC : RPC.eth;
      polygonRPC = (param == null ? void 0 : param.polygonRPC) ? param == null ? void 0 : param.polygonRPC : RPC.polygon;
      bnbRPC = (param == null ? void 0 : param.bnbRPC) ? param == null ? void 0 : param.bnbRPC : RPC.bnb;
      suiRPC = (param == null ? void 0 : param.suiRPC) ? param == null ? void 0 : param.suiRPC : RPC.sui;
      seiRPC = (param == null ? void 0 : param.seiRPC) ? param == null ? void 0 : param.seiRPC : RPC.sei;
      osmosisRPC = (param == null ? void 0 : param.osmosisRPC) ? param == null ? void 0 : param.osmosisRPC : RPC.osmosis;
    });
  }
  getAvailable(domainName, ns) {
    return __async(this, null, function* () {
      let service;
      if (ns) {
        service = ns;
      } else {
        service = yield detectNameService(domainName);
        switch (service) {
          case 1 /* ENS */:
            return getAvailableEns(domainName, ethRPC);
          case 2 /* SpaceIdBnb */:
            return getAvailableSIDBnb(domainName, bnbRPC);
          case 3 /* SpaceIdArb */:
            return getAvailableSIDArb(domainName, arbRPC);
          case 12 /* SeiNS */:
            return getAvailableSeiNs(domainName, seiRPC);
          case 10 /* SuiNs */:
            return getAvailableSui(domainName, suiRPC);
          default:
            return "Not supported name service";
        }
      }
    });
  }
  getRentPrice(domainName, duration, ns) {
    return __async(this, null, function* () {
      let service;
      if (ns) {
        service = ns;
      } else {
        service = yield detectNameService(domainName);
        switch (service) {
          case 1 /* ENS */:
            return getRentPriceEns(domainName, duration, ethRPC);
          case 2 /* SpaceIdBnb */:
            return getRentPriceSIDBnb(domainName, duration, bnbRPC);
          case 3 /* SpaceIdArb */:
            return getRentPriceSIDArb(domainName, duration, arbRPC);
          case 12 /* SeiNS */:
            return getRentPriceSeiNs(domainName, duration, seiRPC);
          case 10 /* SuiNs */:
            return getPriceSuiNs(domainName, duration, suiRPC);
          default:
            return "Not supported name service";
        }
      }
    });
  }
  getDomainExpiry(domainName, ns) {
    return __async(this, null, function* () {
      let service;
      if (ns) {
        service = ns;
      } else {
        service = yield detectNameService(domainName);
        switch (service) {
          case 1 /* ENS */:
            return getDomainExpiryEns(domainName, ethRPC);
          case 2 /* SpaceIdBnb */:
            return getDomainExpirySIDBnb(domainName, bnbRPC);
          case 3 /* SpaceIdArb */:
            return getDomainExpirySIDArb(domainName, arbRPC);
          case 12 /* SeiNS */:
            return getDomainExpirySeiNs(domainName, seiRPC);
          case 10 /* SuiNs */:
            return getDomainExpirySuiNs(domainName, suiRPC);
          default:
            return "Not supported name service";
        }
      }
    });
  }
};

// src/___tests___/index.test.ts
describe("testing detect nameservice function", () => {
  test("DetectNameService", () => {
    return detectNameService("alice.eth").then((result) => {
      expect(result).toBe(1 /* ENS */);
    });
  });
});
describe("testing resolveAddress function", () => {
  let dotnames;
  beforeEach(() => {
    dotnames = new DomainChecker();
  });
  test("ENS ===> hello.eth", () => {
    return dotnames.getAvailable("hello.eth").then((address) => {
      expect(address).toBe(false);
    });
  }, 4e3);
  test("ENS ===> helkllllo.eth", () => {
    return dotnames.getAvailable("helkllllo.eth").then((address) => {
      expect(address).toBe(true);
    });
  }, 4e3);
  test("SIDBnb ===> hello.bnb", () => {
    return dotnames.getAvailable("hello.bnb").then((address) => {
      expect(address).toBe(false);
    });
  }, 4e3);
  test("SIDBnb ====> helefeflo.bnb", () => {
    return dotnames.getAvailable("helefeflo.bnb").then((address) => {
      expect(address).toBe(true);
    });
  }, 4e3);
  test("SIDArb ====> hello.arb", () => {
    return dotnames.getAvailable("hello.arb").then((address) => {
      expect(address).toBe(false);
    });
  }, 9e3);
  test("SIDArb ====> helefeflo.arb", () => {
    return dotnames.getAvailable("helefeflo.arb").then((address) => {
      expect(address).toBe(true);
    });
  }, 9e3);
  test("SeiNs ====> 1234567890.sei", () => {
    return dotnames.getAvailable("1234567890.sei").then((address) => {
      expect(address).toBe(false);
    });
  }, 9e3);
  test("SeiNs ====> 1234dsd567890.sei", () => {
    return dotnames.getAvailable("1234dsd567890.sei").then((address) => {
      expect(address).toBe(true);
    });
  }, 9e3);
  test("SuiNs ====> hello.sui", () => {
    return dotnames.getAvailable("hello.sui").then((result) => {
      expect(result).toBe(false);
    });
  }, 9e3);
  test("SuiNs ====> hellosdsds.sui", () => {
    return dotnames.getAvailable("hellosdsds.sui").then((address) => {
      expect(address).toBe(true);
    });
  }, 9e3);
});
describe("testing rentPrice function", () => {
  let dotnames;
  beforeEach(() => {
    dotnames = new DomainChecker();
  });
  test("ENS Price ===> hello.eth", () => {
    return dotnames.getRentPrice("hello.eth", YEAR_TO_SEC * 2).then((price) => {
      console.log(`\u{1F680} ~ file: index.test.ts:87 ~ price:`, price);
    });
  });
  test("SIDBnb Price===> hello.bnb", () => {
    return dotnames.getRentPrice("hello.bnb", YEAR_TO_SEC * 2).then((price) => {
      console.log(`\u{1F680} ~ file: index.test.ts:95 ~ price:`, price);
    });
  });
  test("SIDArb Price====> hello.arb", () => {
    return dotnames.getRentPrice("hello.arb", YEAR_TO_SEC * 2).then((price) => {
      console.log(`\u{1F680} ~ file: index.test.ts:95 ~ price:`, price);
    });
  });
  test("SeiNs getRentPrice====> 1234dsd567890.sei", () => {
    return dotnames.getRentPrice("1234567890.sei", YEAR_TO_SEC * 2).then((price) => {
      console.log(`\u{1F680} ~ file: index.test.ts:109 ~ price:`, price);
    });
  });
  test("SuiNs getRentPrice====> hello.sui", () => {
    return dotnames.getRentPrice("hello.sui", YEAR_TO_SEC * 2).then((price) => {
      console.log(`\u{1F680} ~ file: index.test.ts:118 ~ price:`, price);
    });
  });
});
describe("testing getDomainExpiry function", () => {
  let dotnames;
  beforeEach(() => {
    dotnames = new DomainChecker();
  });
  test("ENS getDomainExpiry ===> hello.eth", () => {
    return dotnames.getDomainExpiry("hello.eth").then((expiry) => {
      console.log(`\u{1F680} ~ file: index.test.ts:129 ~ expiry:`, expiry);
      expect(expiry).toBe("1830096106000");
    });
  });
  test("ENS Unregistered getDomainExpiry  ===> fjakfjhjsfdhkahfj.eth", () => {
    return dotnames.getDomainExpiry("fjakfjhjsfdhkahfj.eth").then((expiry) => {
      console.log(`\u{1F680} ~ file: index.test.ts:129 ~ expiry:`, expiry);
      expect(expiry).toBe("0");
    });
  });
  test("SIDBnb getDomainExpiry===> hello.bnb", () => {
    return dotnames.getDomainExpiry("hello.bnb").then((expiry) => {
      console.log(`\u{1F680} ~ file: index.test.ts:135 ~ expiry:`, expiry);
      expect(expiry).toBe("1756086947000");
    });
  });
  test("SIDBnb Unregistered getDomainExpiry===> fjakfjhjsfdhkahfj.bnb", () => {
    return dotnames.getDomainExpiry("fjakfjhjsfdhkahfj.bnb").then((expiry) => {
      console.log(`\u{1F680} ~ file: index.test.ts:135 ~ expiry:`, expiry);
      expect(expiry).toBe("0");
    });
  });
  test("SIDArb getDomainExpiry====> hello.arb", () => {
    return dotnames.getDomainExpiry("hello.arb").then((expiry) => {
      console.log(`\u{1F680} ~ file: index.test.ts:141 ~ expiry:`, expiry);
      expect(expiry).toBe("1771588175000");
    });
  });
  test("SIDArb Unregistered getDomainExpiry====> fjakfjhjsfdhkahfj.arb", () => {
    return dotnames.getDomainExpiry("fjakfjhjsfdhkahfj.arb").then((expiry) => {
      console.log(`\u{1F680} ~ file: index.test.ts:141 ~ expiry:`, expiry);
      expect(expiry).toBe("0");
    });
  });
  test("SeiNs getDomainExpiry====> hello.sei", () => {
    return dotnames.getDomainExpiry("hello.sei").then((expiry) => {
      console.log(`\u{1F680} ~ file: index.test.ts:141 ~ expiry:`, expiry);
      expect(expiry).toBe("1723914033000");
    });
  });
  test("SeiNs Unregistered getDomainExpiry====> fjakfjhjsfdhkahfj.sei", () => {
    return dotnames.getDomainExpiry("fjakfjhjsfdhkahfj.sei").then((expiry) => {
      console.log(`\u{1F680} ~ file: index.test.ts:141 ~ expiry:`, expiry);
      expect(expiry).toBe("0");
    });
  });
  test("SuiNs getDomainExpiry====> hello.sui", () => {
    return dotnames.getDomainExpiry("hello.sui").then((expiry) => {
      console.log(`\u{1F680} ~ file: index.test.ts:153 ~ expiry:`, expiry);
      expect(expiry).toBe("1717036149094");
    });
  });
  test("SuiNs Unregistered getDomainExpiry====> fjakfjhjsfdhkahfj.sui", () => {
    return dotnames.getDomainExpiry("fjakfjhjsfdhkahfj.sui").then((expiry) => {
      console.log(`\u{1F680} ~ file: index.test.ts:153 ~ expiry:`, expiry);
      expect(expiry).toBe("0");
    });
  });
});
