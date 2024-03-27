import {
  RPC
} from "./chunk-EC3G3GSM.mjs";
import {
  getAvailableSIDArb,
  getAvailableSIDBnb,
  getRentPriceSIDArb,
  getRentPriceSIDBnb
} from "./chunk-PSOSIP3F.mjs";
import {
  getAvailableSeiNs,
  getRentPriceSeiNs
} from "./chunk-RLHO36NF.mjs";
import {
  getAvailableSui
} from "./chunk-TVP76462.mjs";
import {
  detectNameService
} from "./chunk-OS6HSI6Q.mjs";
import {
  getAvailableEns,
  getRentPriceEns
} from "./chunk-P3V3ZAVD.mjs";
import {
  __async
} from "./chunk-6U7FN32R.mjs";

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
            return getRentPriceSIDArb(domainName, duration, bnbRPC);
          case 12 /* SeiNS */:
            return getRentPriceSeiNs(domainName, duration, seiRPC);
          default:
            return "Not supported name service";
        }
      }
    });
  }
};

export {
  DomainChecker
};
