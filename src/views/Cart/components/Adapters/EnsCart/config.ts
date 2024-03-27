import { ZERO_ADDRESS } from "@/configs/constants";

export const ETH_CHAIN_ID = 5;
export const ENS_CHAIN_ID = 5;
export const ENS_REDUX_GRP_KEY = "ens";
export const ENS_COIN_DENOM = {
  address: ZERO_ADDRESS,
  decimals: 18, // TODO : Unknown
  symbol: "ETH",
  icon: "/images/chains/eth.svg",
  networkName: "Ethereum",
};

export const ENS_EXPLORER_URL = "https://goerli.etherscan.io";
export const ENS_DOMAIN_URL = "https://app.ens.domains/my/names";
export const ENS_PLATFORM_URL = "https://app.ens.domains";
