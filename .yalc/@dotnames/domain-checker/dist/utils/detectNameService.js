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

// src/utils/detectNameService.ts
var detectNameService_exports = {};
__export(detectNameService_exports, {
  detectNameService: () => detectNameService
});
module.exports = __toCommonJS(detectNameService_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  detectNameService
});
