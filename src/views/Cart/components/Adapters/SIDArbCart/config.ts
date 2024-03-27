import { ChainId } from "@/configs/chainIds";
import { ZERO_ADDRESS } from "@/configs/constants";

export const SIDARB_CHAIN_ID = ChainId.ARBITRUM_GOERLI;
export const SIDARB_REDUX_GRP_KEY = "sidarb";
export const SIDARB_TLD = "arb";
export const SIDARB_DEFAULT_RESOLVER =
  "0xfc81140Cd374Fe235c8398A0Ae57101Eac79Ae35";
export const SIDARB_IS_USE_GIFT_CARD = false;
export const SIDARB_REFERRAL_INFO = {
  referrerAddress: "0x0000000000000000000000000000000000000000",
  referrerNodehash:
    "0x0000000000000000000000000000000000000000000000000000000000000000",
  referralAmount: 0,
  signedAt: 0,
  signature:
    "0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
};
export const SIDARB_COIN_DENOM = {
  address: ZERO_ADDRESS,
  decimals: 18, // TODO : Unknown
  symbol: "ETH",
  icon: "/images/chains/arbitrum.svg",
  networkName: "Arbitrum",
};

export const SIDARB_EXPLORER_URL = "https://arbiscan.io";
export const SIDARB_DOMAIN_URL = "https://space.id/name/2";
export const SIDARB_PLATFORM_URL = "https://space.id/tld/2";
