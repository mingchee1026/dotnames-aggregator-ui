import { ChainId } from "./chainIds";

export const RPC_URL = {
  [ChainId.ETHEREUM]: "https://eth.public-rpc.com/",
  [ChainId.ARBITRUM]: "https://rpc.ankr.com/arbitrum",
  [ChainId.BSC]: "https://1rpc.io/bnb",
  [ChainId.BSC_TESTNET]: "https://data-seed-prebsc-2-s2.bnbchain.org:8545",
  [ChainId.POLYGON]: "https://polygon-rpc.com",
  [ChainId.GÖRLI]: "https://ethereum-goerli.publicnode.com",
  [ChainId.ARBITRUM_GOERLI]: "https://goerli-rollup.arbitrum.io/rpc",

  //Non-EVM
  [ChainId.SUI]:
    "https://sui.getblock.io/3b3d419a-32f2-40f0-a0fc-9a7da31a227c/mainnet/",
  [ChainId.SEI]: "https://sei-m.rpc.n0ok.net/",
  ["pacific-1"]: "https://sei-m.rpc.n0ok.net/",
  ["atlantic-2"]: "https://sei-testnet-rpc.polkachu.com/",

  [ChainId.OSMOSIS]: "https://rpc.osmosis.zone",
  [ChainId.SOLANA]: "https://polygon-rpc.com",
};
