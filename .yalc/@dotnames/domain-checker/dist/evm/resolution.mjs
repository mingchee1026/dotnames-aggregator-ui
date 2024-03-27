import {
  __async
} from "../chunk-6U7FN32R.mjs";

// src/evm/resolution.ts
import { Resolution } from "@unstoppabledomains/resolution";
function getRecordsResolution(domainName, ethProviderUrl, polygonProviderUrl) {
  return __async(this, null, function* () {
    try {
      const resolution = new Resolution({
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
      const resolution = new Resolution({
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
      const resolution = new Resolution({
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
export {
  getAddressResolution,
  getNameResolution,
  getRecordsResolution
};
