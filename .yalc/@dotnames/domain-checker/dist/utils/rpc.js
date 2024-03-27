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

// src/utils/rpc.ts
var rpc_exports = {};
__export(rpc_exports, {
  RPC: () => RPC
});
module.exports = __toCommonJS(rpc_exports);
var RPC = {
  eth: "https://rpc.ankr.com/eth",
  polygon: "https://rpc.ankr.com/polygon",
  bnb: "https://rpc.ankr.com/bsc",
  arb: "https://1rpc.io/arb",
  sui: "https://sui.getblock.io/3b3d419a-32f2-40f0-a0fc-9a7da31a227c/mainnet/",
  sei: "https://sei-rpc.polkachu.com/",
  osmosis: "https://rpc.osmosis.zone"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RPC
});
