const {
  ChainId,
  Wallet,
  toChainName,
} = require("multichain-walletkit-sdk-core");
export interface ChainInfo {
  id: typeof ChainId;
  name: string;
  logo: any;
}
export const CHAINS = {
  unset: 0,
  // solana: 1,
  ethereum: 2,
  terra: 3,
  bsc: 4,
  polygon: 5,
  avalanche: 6,
  oasis: 7,
  algorand: 8,
  aurora: 9,
  fantom: 10,
  karura: 11,
  acala: 12,
  klaytn: 13,
  celo: 14,
  near: 15,
  moonbeam: 16,
  neon: 17,
  terra2: 18,
  injective: 19,
  osmosis: 20,
  sui: 21,
  aptos: 22,
  arbitrum: 23,
  optimism: 24,
  gnosis: 25,
  pythnet: 26,
  xpla: 28,
  btc: 29,
  base: 30,
  sei: 32,
  stargaze: 33,
  wormchain: 3104,
  sepolia: 10002,
} as const;
// export const AVAILABLE_CHAINS = [
//   {
//     id: CHAINS["ethereum"],
//     name: toChainName(CHAINS["ethereum"]), //"Ethereum (Goerli)",
//     logo: "",
//   },
//   {
//     id: CHAINS["solana"],
//     name: "Solana",
//     logo: "solanaIcon",
//   },
//   {
//     id: CHAINS["aptos"],
//     name: "Apthos",
//     logo: "aptosIcon",
//   },
//   {
//     id: CHAINS["sui"],
//     name: "Sui",
//     logo: "suiIcon",
//   },
//   {
//     id: CHAINS["osmosis"],
//     name: "Osmosis",
//     logo: "osmosisIcon",
//   },
//   {
//     id: CHAINS["stargaze"],
//     name: "Stargaze",
//     logo: "starsIcon",
//   },
//   {
//     id: CHAINS["sei"],
//     name: "Sei",
//     logo: "seiIcon",
//   },
// ];
type ChainData = {
  id: number;
  name: string;
  icon: string;
};

type ChainIndexDataMap = {
  [key: number]: ChainData;
};
// TODO: Add other chain indexes
export const CHAIN_INDEX_DATA_MAP: ChainIndexDataMap = {
  // 1: {
  //   id: 1,
  //   name: "Solana",
  //   icon: "/images/chains/solana.png",
  // },
  2: {
    id: 2,
    name: "Ethereum",
    icon: "/images/chains/eth.svg",
  },
  3: {
    id: 3,
    name: "Terra",
    icon: "/images/chains/terra.svg",
  },
  4: {
    id: 4,
    name: "BNB Chain",
    icon: "/images/chains/bnb.svg",
  },
  20: {
    id: 20,
    name: "Osmosis",
    icon: "/images/chains/osmosis.svg",
  },
  21: {
    id: 21,
    name: "SUI",
    icon: "/images/chains/sui.svg",
  },
  22: {
    id: 22,
    name: "Aptos",
    icon: "/images/chains/aptos.svg",
  },
  32: {
    id: 32,
    name: "Sei",
    icon: "/images/chains/sei.svg",
  },
};
