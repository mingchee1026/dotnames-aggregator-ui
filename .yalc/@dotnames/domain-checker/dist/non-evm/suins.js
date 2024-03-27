"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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

// src/non-evm/suins.ts
var suins_exports = {};
__export(suins_exports, {
  getAvailableSui: () => getAvailableSui,
  getDomainExpirySuiNs: () => getDomainExpirySuiNs,
  getPriceSuiNs: () => getPriceSuiNs
});
module.exports = __toCommonJS(suins_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getAvailableSui,
  getDomainExpirySuiNs,
  getPriceSuiNs
});
