import { ZERO_ADDRESS } from "@/configs/constants";

export const UD_CHAIN_ID = 137;
export const UD_REDUX_GRP_KEY = "UD";

export const UD_COIN_DENOM = {
  address: "0x0B55F46bFea46f50DD39700e1f5b3c7840818C6f",
  decimals: 18, // TODO : Unknown
  symbol: "USDT",
  icon: "/images/chains/matic.svg",
  networkName: "Polygon",
};
export const UD_PAYMASTER = "0xAd72FE77a2ccbeDcEFBfa2065B3D3ba7814eFA0E";
export const UD_CONSUMER = "0xdDe4358eD5B4E01cb0Fb05EFdFBB8509802EF91f";
export const UD_MINT_API = "https://ud-api.dotnames.me/api";
export enum UD_MINT_ERROR_CODES {
  INVALID_TXN_HASH = 101,
  DOMAIN_ALREADY_REGISTERED = 102,
  INSUFFICIENT_FUNDS = 103,
}
export const UD_EXPLORER_URL = "https://polygonscan.com";
export const UD_DOMAIN_VIEW_URL = "https://ud.me";
