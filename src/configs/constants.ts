import { convertEVMChainIdToCoinType } from "@ensdomains/address-encoder";
import { ChainId } from "./chainIds";
import _ from "lodash";
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export const TEXT_RECORD_KEYS = [
  "snapshot",
  "email",
  "url",
  "avatar",
  "description",
  "notice",
  "keywords",
  "com.discord",
  "com.github",
  "com.reddit",
  "com.twitter",
  "org.telegram",
  "eth.ens.delegate",
];

export const SOCIAL_RECORD_KEYS = [
  {
    key: "com.discord",
    formKey: "discord",
    icon: "/images/icons/discord.svg",
    color: "#7289da",
  },
  {
    key: "com.github",
    formKey: "github",
    icon: "/images/icons/github.svg",
    color: "#ffffff",
  },
  {
    key: "com.reddit",
    formKey: "reddit",
    icon: "/images/icons/reddit.svg",
    color: "#ff4500",
  },
  {
    key: "com.twitter",
    formKey: "twitter",
    icon: "/images/icons/twitter.svg",
    color: "#00aced",
  },
  {
    key: "org.telegram",
    formKey: "telegram",
    icon: "/images/icons/telegram.svg",
    color: "#0088CC",
  },
];

export const SUPPORTED_COIN_TYPES = [
  {
    type: convertEVMChainIdToCoinType(ChainId.OMNI_TESTNET),
    symbol: "OMNI",
    logo: "https://www.gitbook.com/cdn-cgi/image/width=40,dpr=2,height=40,fit=contain,format=auto/https%3A%2F%2F3448384003-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FPD4tBiwNHtSAkQcMZDtr%252Ficon%252FTdNehkxO4cSU6OlCjlPa%252FYoutube%2520Channel%2520icon_Black.png%3Falt%3Dmedia%26token%3Dd9a6d8af-7901-4693-9bfc-04e9dfe99432",
  },
  {
    type: 60,
    symbol: "ETH",
    logo: "https://raw.githubusercontent.com/sushiswap/list/master/logos/token-logos/token/eth.jpg",
  },
  {
    type: 714,
    symbol: "BNB",
    logo: "https://raw.githubusercontent.com/sushiswap/list/master/logos/token-logos/token/bnb.jpg",
  },
];

export const UNSUPPORTED_BALANCES_FROM_CONTRACT_TLDS = ["eth"];

export const YEAR_TO_SEC = 31536000;
export const DAY_TO_SEC = 86400;
export const ENS_COMMITMENT_SECRET =
  "0x446f744e616d6573000000000000000000000000000000000000000000000000"; // secret https://www.devoven.com/encoding/string-to-bytes32 bytes for "DotNames"

export const EXPLORER_URL = {
  [ChainId.OMNI_TESTNET]: "https://testnet.explorer.omni.network",
  [ChainId.ARBITRUM_GOERLI]: "https://goerli.arbiscan.io",
  [ChainId.OPTIMISM_GOERLI]: "https://goerli-optimism.etherscan.io",
};

// "x":            "UnstoppableDomains",
// "polygon":      "UnstoppableDomains",
// "zil":          "UnstoppableDomains",
// "nft":          "UnstoppableDomains",
// "wallet":       "UnstoppableDomains",
// "dao":          "UnstoppableDomains",
// "blockchain":   "UnstoppableDomains",
// "bitcoin":      "UnstoppableDomains",
export const SUPPORTED_TLDS = [
  "eth",
  "arb",
  "bnb",
  // "bit",
  // "zk",
  // "osmo",
  // "stars",
  // "sol",
  // "apt",
  "sui",
  "sei",
  "crypto",
  "x",
  "polygon",
  "zil",
  "nft",
  "wallet",
  "dao",
  "blockchain",
  "bitcoin",
];
export const UD_SUPPORTED_TLDS = [
  "crypto",
  "x",
  "polygon",
  "zil",
  "nft",
  "wallet",
  "dao",
  "blockchain",
  "bitcoin",
];
export const TLD_TO_PLATFORM_DETAILS = {
  eth: {
    platform: "ENS",
    network: "ETHEREUM",
    icon: "/images/platforms/ens.png",
    coin: {
      icon: "/images/chains/eth.svg",
      symbol: "ETH",
    },
  },
  sei: {
    platform: "DotSei",
    network: "SEI",
    icon: "/images/platforms/native/dotsei.svg",
    coin: {
      icon: "/images/chains/sei.svg",
      symbol: "SEI",
    },
  },
  sui: {
    platform: "SUINS",
    network: "SUI",

    icon: "/images/chains/sui.svg",
    coin: {
      icon: "/images/chains/sui.svg",
      symbol: "SUI",
    },
  },
  apt: {
    platform: "Aptos NS",
    network: "APTOS",
    icon: "/images/chains/aptos.svg",
    coin: {
      icon: "/images/chains/aptos.svg",
      symbol: "APT",
    },
  },
  bnb: {
    platform: "Space ID BNB",
    network: "BNB",
    icon: "/images/platforms/sid.png",
    coin: {
      icon: "/images/chains/bnb.svg",
      symbol: "BNB",
    },
  },
  crypto: {
    platform: "Unstoppable",
    network: "POLYGON",

    icon: "/images/platforms/unstoppable.png",
    coin: {
      icon: "/images/chains/polygon.svg",
      symbol: "USDT",
    },
  },
  x: {
    platform: "Unstoppable",
    network: "POLYGON",

    icon: "/images/platforms/unstoppable.png",
    coin: {
      icon: "/images/chains/polygon.svg",
      symbol: "USDT",
    },
  },
  polygon: {
    platform: "Unstoppable",
    network: "POLYGON",

    icon: "/images/platforms/unstoppable.png",
    coin: {
      icon: "/images/chains/polygon.svg",
      symbol: "USDT",
    },
  },
  zil: {
    platform: "Unstoppable",
    network: "POLYGON",

    icon: "/images/platforms/unstoppable.png",
    coin: {
      icon: "/images/chains/polygon.svg",
      symbol: "USDT",
    },
  },
  nft: {
    platform: "Unstoppable",
    network: "POLYGON",

    icon: "/images/platforms/unstoppable.png",
    coin: {
      icon: "/images/chains/polygon.svg",
      symbol: "USDT",
    },
  },
  wallet: {
    platform: "Unstoppable",
    network: "POLYGON",

    icon: "/images/platforms/unstoppable.png",
    coin: {
      icon: "/images/chains/polygon.svg",
      symbol: "USDT",
    },
  },
  dao: {
    platform: "Unstoppable",
    network: "POLYGON",

    icon: "/images/platforms/unstoppable.png",
    coin: {
      icon: "/images/chains/polygon.svg",
      symbol: "USDT",
    },
  },
  blockchain: {
    platform: "Unstoppable",
    network: "POLYGON",

    icon: "/images/platforms/unstoppable.png",
    coin: {
      icon: "/images/chains/polygon.svg",
      symbol: "USDT",
    },
  },
  bitcoin: {
    platform: "Unstoppable",
    network: "POLYGON",
    icon: "/images/platforms/unstoppable.png",
    coin: {
      icon: "/images/chains/polygon.svg",
      symbol: "USDT",
    },
  },
  arb: {
    platform: "Space ID ARB",
    network: "ARBITRUM",
    icon: "/images/platforms/arb.png",
    coin: {
      icon: "/images/chains/eth.svg",
      symbol: "aETH",
    },
  },
};

// Define your TypeScript enum
export enum PLATFORMS_ENUM {
  ENS = "ENS",
  DotSei = "DotSei",
  SUINS = "SUINS",
  AptosNS = "Aptos NS",
  Unstoppable = "Unstoppable",
  SpaceID = "Space ID",
  SpaceIDBNB = "Space ID BNB",
  SpaceIDARB = "Space ID ARB",
}

export const PRODUCT_IMG_FILE = [
  {
    title: "ENS",
    link: "https://dotshm.me",
    logo: "images/assets/ens.png",
  },
  {
    title: "Unstoppable Domain",
    link: "https://dotshm.me",
    logo: "images/assets/asset-1.png",
  },
  {
    title: "SpaceID ARB Domain",
    link: "https://dotshm.me",
    logo: "images/assets/asset-2.png",
  },
  {
    title: "SpaceID BNB Domain",
    link: "https://dotshm.me",
    logo: "images/assets/asset-3.png",
  },
  {
    title: "SUINS",
    link: "https://dotshm.me",
    logo: "images/assets/asset-6.png",
  },
  {
    title: "Bonfida SNS",
    link: "https://dotshm.me",
    logo: "images/assets/asset-7.png",
  },
];

export const PRODUCT_IMG_FILE_NATIVE = [
  {
    title: "DotShm",
    link: "https://dotshm.me",
    logo: "/images/platforms/native/dotshm.svg",
  },
  {
    title: "DotZeta",
    link: "https://dotzeta.me",
    logo: "/images/platforms/native/dotzeta.svg",
  },
  {
    title: "DotOmni",
    link: "https://dotomni.me",
    logo: "/images/platforms/native/dotomni.png",
  },
  {
    title: "DotSei",
    link: "https://dotsei.me",
    logo: "/images/platforms/native/dotsei.svg",
  },
  {
    title: "DotTaiko",
    link: "https://dottaiko.me",
    logo: "/images/platforms/native/dottaiko.svg",
  },
];

export const DOMAIN_STATUS = [
  {
    value: "Available",
    label: "Available",
  },
  {
    value: "Registered",
    label: "Registered",
  },
  {
    value: "GracePeriod",
    label: "Grace Period",
  },
  {
    value: "Premium",
    label: "Premium",
  },
];

export const MARKET_STATUS = [
  {
    value: "RegisterNow",
    label: "Register Now",
  },
  {
    value: "BuyNow",
    label: "Buy Now",
  },
  {
    value: "others",
    label: "Others",
  },
];

export const PROJECT_FILTER = _.uniqBy(
  SUPPORTED_TLDS.map((tld) => {
    const tldData =
      // @ts-ignore
      TLD_TO_PLATFORM_DETAILS[tld as keyof TLD_TO_PLATFORM_DETAILS];
    return {
      value: tldData.platform as string,
      label: tldData.platform,
      tldData,
    };
  }),
  "value"
);
export const PLATFORMS_LIST = _.uniqBy(
  SUPPORTED_TLDS.map((tld) => {
    const tldData =
      // @ts-ignore
      TLD_TO_PLATFORM_DETAILS[tld as keyof TLD_TO_PLATFORM_DETAILS];
    return {
      ...tldData,
      value: tldData.platform as string,
      label: tldData.platform,
    };
  }),
  "value"
).reverse();

export const TLD_FILTER = SUPPORTED_TLDS.map((tld) => {
  return {
    value: tld,
    label: tld,
  };
});

export const CHAIN_FILTER = _.uniqBy(
  SUPPORTED_TLDS.map((tld) => {
    const tldData =
      // @ts-ignore
      TLD_TO_PLATFORM_DETAILS[tld as keyof TLD_TO_PLATFORM_DETAILS];
    return {
      value: tldData.network as string,
      label: tldData.network,
    };
  }),
  "value"
);
