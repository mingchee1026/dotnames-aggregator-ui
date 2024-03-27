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

// src/types.ts
var types_exports = {};
__export(types_exports, {
  SupportedNS: () => SupportedNS
});
module.exports = __toCommonJS(types_exports);
var SupportedNS = /* @__PURE__ */ ((SupportedNS2) => {
  SupportedNS2[SupportedNS2["ENS"] = 1] = "ENS";
  SupportedNS2[SupportedNS2["SpaceIdBnb"] = 2] = "SpaceIdBnb";
  SupportedNS2[SupportedNS2["SpaceIdArb"] = 3] = "SpaceIdArb";
  SupportedNS2[SupportedNS2["UnstoppableDomains"] = 4] = "UnstoppableDomains";
  SupportedNS2[SupportedNS2["DotBit"] = 5] = "DotBit";
  SupportedNS2[SupportedNS2["Zkns"] = 6] = "Zkns";
  SupportedNS2[SupportedNS2["ICNS"] = 7] = "ICNS";
  SupportedNS2[SupportedNS2["StargazeDomains"] = 8] = "StargazeDomains";
  SupportedNS2[SupportedNS2["Bonfida"] = 9] = "Bonfida";
  SupportedNS2[SupportedNS2["SuiNs"] = 10] = "SuiNs";
  SupportedNS2[SupportedNS2["AptosNs"] = 11] = "AptosNs";
  SupportedNS2[SupportedNS2["SeiNS"] = 12] = "SeiNS";
  SupportedNS2[SupportedNS2["None"] = 13] = "None";
  return SupportedNS2;
})(SupportedNS || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SupportedNS
});
