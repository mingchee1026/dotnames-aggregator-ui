import {
  YEAR_TO_SEC
} from "./chunk-ITEORNBY.mjs";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-6U7FN32R.mjs";

// src/non-evm/suins.ts
import {
  Connection,
  JsonRpcProvider,
  normalizeSuiAddress,
  SuiAddress
} from "@mysten/sui.js";
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
      const connection = new Connection({
        fullnode
      });
      const provider = new JsonRpcProvider(connection);
      const [, domain, topLevelDomain] = domainName.match(/^(.+)\.([^.]+)$/) || [];
      const registryAddress = SuiAddress.create(suiNsPackage.REGISTRY);
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
      const connection = new Connection({
        fullnode
      });
      const provider = new JsonRpcProvider(connection);
      const [, domain, topLevelDomain] = domainName.match(/^(.+)\.([^.]+)$/) || [];
      const registryAddress = SuiAddress.create(suiNsPackage.REGISTRY);
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
        [camelCase(key)]: c.type.includes("Address") || key === "addr" ? normalizeSuiAddress(value) : value
      });
    },
    {}
  );
  return __spreadValues(__spreadValues({}, object), data);
};

export {
  getAvailableSui,
  getPriceSuiNs,
  getDomainExpirySuiNs
};
