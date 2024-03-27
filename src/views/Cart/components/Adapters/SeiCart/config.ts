import { ZERO_ADDRESS } from "@/configs/constants";

export const SEI_CHAIN_ID = "atlantic-2";
export const DOTSEI_EXPLORER_URL = `https://www.seiscan.app/${SEI_CHAIN_ID}`;
export const SEI_REDUX_GRP_KEY = "sei";

export const SEI_TLD = "sei";
export const SEI_DEFAULT_RESOLVER =
  "sei1a74yars3jdanxj2myukt9vfmrk65p2a88jj3axdl9g6pulhgf84sqqqjas";

export const SEI_COIN_DENOM = {
  address: ZERO_ADDRESS,
  decimals: 18, // TODO : Unknown
  symbol: "SEI",
  icon: "/images/chains/sei.svg",
  networkName: "SEI",
};
export const DOTSEI_DOMAIN_URL = "https://dotsei.me/name/";
export const DOTSEI_PLATFORM_URL = "https://dotsei.me";
