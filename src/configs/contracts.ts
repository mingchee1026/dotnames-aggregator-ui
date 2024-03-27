import { ChainId } from "./chainIds";

export const contracts = {
  Registry: {},

  Resolver: {
    [ChainId.ETHEREUM]: "0x231b0Ee14048e9dCcD1d247744d114a4EB5E8E63",
  },

  Controller: {
    [ChainId.ETHEREUM]: "0x253553366Da8546fC250F225fe3d25d0C782303b",
    [ChainId.GÖRLI]: "0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5",

    [ChainId.SEI]:
      "sei1mrw7gcd76nng8p554f2c00557txjtxhpmrmskfyn39gjcs4ewhlqnzqmmf",
    ["pacific-1"]:
      "sei1mrw7gcd76nng8p554f2c00557txjtxhpmrmskfyn39gjcs4ewhlqnzqmmf",
    ["atlantic-2"]:
      "sei12p2mwewadmf46zmulydyuphdrsxlss6j924ef7wppylaa2g5eypsg403f3",
    [ChainId.SUI]:
      "0x9d451fa0139fef8f7c1f0bd5d7e45b7fa9dbb84c2e63c2819c7abd0a7f7d749d::register::register",
    [ChainId.BSC]: "0x3aaec59fd6efa66f147855f2e8132248480daf3c",
    [ChainId.BSC_TESTNET]: "0x7a85af7df7ef1b1c9d41b29168485c90816b65a1",
    [ChainId.ARBITRUM_GOERLI]: "0xdA8219C2011732fF4179407f531ce30845462607",
    [ChainId.ARBITRUM]: "0x36bDa80739B6cF725a324454fB060Fe963348d2B",
  },
  // https://etherscan.io/address/0x5ba1e12693dc8f9c48aad8770482f4739beed696#code
  multicall: {
    [ChainId.ETHEREUM]: "0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696",
    [ChainId.GÖRLI]: "0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696",
    [ChainId.SEI]:
      "sei16jjfjtzzapr37v7xmap0rp9c4ms33q9ewkh4yurwk52gxmqjehkqjhzpxt",
    ["pacific-1"]:
      "sei16jjfjtzzapr37v7xmap0rp9c4ms33q9ewkh4yurwk52gxmqjehkqjhzpxt",
    ["atlantic-2"]:
      "sei128l7dq73xamd5grxym3syxqr6x5gnztqnwurdq4tkss0cmx09drsu032lf",
    [ChainId.BSC_TESTNET]: "0xA6949B8FBa9DF546b9c66F98CFCa960A96E3b68e",
    [ChainId.BSC]: "0xed386fe855c1eff2f843b910923dd8846e45c5a4",
    [ChainId.ARBITRUM_GOERLI]: "0xffA73Efe507e01e2f1DCB3Ea467bcb7d79401FFC",
    [ChainId.ARBITRUM]: "0x80C7DD17B01855a6D2347444a0FCC36136a314de",
  },
  bulkRegister: {
    [ChainId.ETHEREUM]: "0x705BfBcFCCde554E11DF213Bf6d463Ea00Dd57Cc",
    [ChainId.GÖRLI]: "0x64866f59F41675b1d123268b7787330E2cEa42C4",
    [ChainId.BSC]: "0x3aaEC59fD6eFa66f147855f2e8132248480DaF3c",
    [ChainId.BSC_TESTNET]: "0x7a85af7df7ef1b1c9d41b29168485c90816b65a1",
    [ChainId.ARBITRUM_GOERLI]: "0x7b39da92dd043C7376F289D3B69d517f7D811486",
    [ChainId.ARBITRUM]: "0x36bDa80739B6cF725a324454fB060Fe963348d2B",
  },
};
