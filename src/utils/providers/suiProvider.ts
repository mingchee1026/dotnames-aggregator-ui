import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";

export const suiProvider = async () => {
  const rpcUrl = getFullnodeUrl("mainnet");
  const client = new SuiClient({ url: rpcUrl });
  return client;
};
