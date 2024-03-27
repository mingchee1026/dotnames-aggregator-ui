import { ZERO_ADDRESS } from "@/configs/constants";

export const SIDBNB_CHAIN_ID = 97;
export const SIDBNB_REDUX_GRP_KEY = "sidbnb";
export const SIDBNB_TLD = "bnb";
export const SIDBNB_DEFAULT_RESOLVER =
  "0x43204A1d9544CdBcE8F281eE211Fa82DD57203dc";
export const SIDBNB_IS_USE_GIFT_CARD = false;
export const SIDBNB_REFERRAL_INFO = {
  referrerAddress: "0x0000000000000000000000000000000000000000",
  referrerNodehash:
    "0x0000000000000000000000000000000000000000000000000000000000000000",
  referralAmount: 0,
  signedAt: 0,
  signature:
    "0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
};
export const SIDBNB_COIN_DENOM = {
  address: ZERO_ADDRESS,
  decimals: 18, // TODO : Unknown
  symbol: "BNB",
  icon: "/images/chains/bnb.svg",
  networkName: "BNB Chain",
};
export const SIDBNB_EXPLORER_URL = "https://testnet.bscscan.com";
export const SIDBNB_DOMAIN_URL = "https://space.id/name/1";
export const SIDBNB_PLATFORM_URL = "https://space.id/tld/1";
