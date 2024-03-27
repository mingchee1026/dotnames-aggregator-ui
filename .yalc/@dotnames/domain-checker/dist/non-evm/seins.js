"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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

// src/non-evm/seins.ts
var seins_exports = {};
__export(seins_exports, {
  getAvailableSeiNs: () => getAvailableSeiNs,
  getDomainExpirySeiNs: () => getDomainExpirySeiNs,
  getRentPriceSeiNs: () => getRentPriceSeiNs
});
module.exports = __toCommonJS(seins_exports);
var import_ethers = require("ethers");

// src/utils/domainFormat.ts
function getNameFromDomain(domainName) {
  const extension = domainName.split(".");
  if (!extension)
    return "";
  return extension[0].toLowerCase();
}

// src/non-evm/seins.ts
var import_core = require("@sei-js/core");
var import_bignumber = require("bignumber.js");
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
    const labelHash0x = import_ethers.utils.keccak256(import_ethers.utils.toUtf8Bytes(name));
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
        return new import_bignumber.BigNumber(data.price).div(1e6).toNumber();
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
    const labelHash0x = import_ethers.utils.keccak256(import_ethers.utils.toUtf8Bytes(lowercasedLabel));
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
        return new import_bignumber.BigNumber(data.expires).multipliedBy(1e3).toString();
      } else {
        throw new Error("Unable to fetch data");
      }
    } catch (err) {
      throw err;
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getAvailableSeiNs,
  getDomainExpirySeiNs,
  getRentPriceSeiNs
});
