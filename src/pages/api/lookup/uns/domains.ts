import { NextApiRequest, NextApiResponse } from "next";
// import { getAddressResolution } from "../sdk/evm/resolution";

const unsEndpointUrl: string = "https://api.unstoppabledomains.com";
const unsSandboxEndpointUrl: string = "https://api.ud-sandbox.com";
let unsEthProviderUrl: string = "https://mainnet.infura.io/v3";
let unsPolygonProviderUrl: string = "https://polygon-mainnet.infura.io/v3";
const unsApiKey: string = "jykfkgvapza5_9lrvsczxqypouvxqfw3w_ydtdzpfq7pao0d";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  let { names } = _req.query;

  names = JSON.parse(names as string);

  const results = await lookupNS(names as string[]);

  res.status(200).json(results);
};
const lookupNS = async (domainNames: string[]) => {
  const query = new URLSearchParams({
    $expand: "records",
  }).toString();
  const createdNamesQuery = domainNames?.reduce((a, item, idx) => {
    return a + `&query=${item}`;
  });

  const resp = await fetch(
    `${unsSandboxEndpointUrl}/partner/v3/domains/?${query}&query=${createdNamesQuery}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${unsApiKey}`,
      },
    }
  );

  const results = await resp.json();

  return results;
};

export default handler;
