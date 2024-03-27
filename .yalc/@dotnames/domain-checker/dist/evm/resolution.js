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

// src/evm/resolution.ts
var resolution_exports = {};
__export(resolution_exports, {
  getAddressResolution: () => getAddressResolution,
  getNameResolution: () => getNameResolution,
  getRecordsResolution: () => getRecordsResolution
});
module.exports = __toCommonJS(resolution_exports);
var import_resolution = require("@unstoppabledomains/resolution");
function getRecordsResolution(domainName, ethProviderUrl, polygonProviderUrl) {
  return __async(this, null, function* () {
    try {
      const resolution = new import_resolution.Resolution({
        sourceConfig: {
          uns: {
            locations: {
              Layer1: {
                url: ethProviderUrl,
                network: "mainnet"
              },
              Layer2: {
                url: polygonProviderUrl,
                network: "polygon-mainnet"
              }
            }
          },
          zns: {
            url: "https://api.zilliqa.com",
            network: "mainnet"
          }
        }
      });
      const avatar = yield getRecord(resolution, domainName, "avatar");
      const description = yield getRecord(resolution, domainName, "description");
      const display = yield getRecord(resolution, domainName, "display");
      const email = yield getRecord(resolution, domainName, "email");
      const keywords = yield getRecord(resolution, domainName, "keywords");
      const mail = yield getRecord(resolution, domainName, "mail");
      const notice = yield getRecord(resolution, domainName, "notice");
      const location = yield getRecord(resolution, domainName, "location");
      const phone = yield getRecord(resolution, domainName, "phone");
      const url = yield getRecord(resolution, domainName, "url");
      const address = yield resolution.addr(domainName, "ETH");
      const contentHash = yield resolution.ipfsHash(domainName);
      let records = {
        text: {},
        address,
        contentHash
      };
      if (avatar) {
        records.text.avatar = avatar;
      }
      if (description) {
        records.text.description = description;
      }
      if (display) {
        records.text.display = display;
      }
      if (email) {
        records.text.email = email;
      }
      if (keywords) {
        records.text.keywords = keywords;
      }
      if (mail) {
        records.text.mail = mail;
      }
      if (notice) {
        records.text.notice = notice;
      }
      if (location) {
        records.text.location = location;
      }
      if (phone) {
        records.text.phone = phone;
      }
      if (url) {
        records.text.url = url;
      }
      return records;
    } catch (err) {
      throw err;
    }
  });
}
function getAddressResolution(domainName, ethProviderUrl, polygonProviderUrl) {
  return __async(this, null, function* () {
    try {
      const resolution = new import_resolution.Resolution({
        sourceConfig: {
          uns: {
            locations: {
              Layer1: {
                url: ethProviderUrl,
                network: "mainnet"
              },
              Layer2: {
                url: polygonProviderUrl,
                network: "polygon-mainnet"
              }
            }
          },
          zns: {
            url: "https://api.zilliqa.com",
            network: "mainnet"
          }
        }
      });
      const address = yield resolution.addr(domainName, "ETH");
      return address;
    } catch (err) {
      throw err;
    }
  });
}
function getNameResolution(address, ethProviderUrl, polygonProviderUrl) {
  return __async(this, null, function* () {
    try {
      const resolution = new import_resolution.Resolution({
        sourceConfig: {
          uns: {
            locations: {
              Layer1: {
                url: ethProviderUrl,
                network: "mainnet"
              },
              Layer2: {
                url: polygonProviderUrl,
                network: "polygon-mainnet"
              }
            }
          },
          zns: {
            url: "https://api.zilliqa.com",
            network: "mainnet"
          }
        }
      });
      const name = yield resolution.reverse(address);
      return name;
    } catch (err) {
      throw err;
    }
  });
}
function getRecord(resolution, domain, recordKey) {
  return __async(this, null, function* () {
    try {
      const value = yield resolution.record(domain, recordKey);
      return value;
    } catch (err) {
      console.error;
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getAddressResolution,
  getNameResolution,
  getRecordsResolution
});
