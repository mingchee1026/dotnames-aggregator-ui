const { ethers } = require("ethers");

async function fetchRecentTransactions(address) {
  // Replace 'your_infura_api_key' with your Infura API key

  const infuraUrl = `https://goerli-rollup.arbitrum.io/rpc	`;

  // Create a provider using the JSON-RPC provider with Infura URL
  const provider = new ethers.providers.JsonRpcProvider(infuraUrl);
  const block = await provider?.getBlockNumber();
  console.log(`🚀 ~ file: test.js:11 ~ block:`, block);
  const filter = {
    address: address,
    fromBlock: 60198437,
    toBlock: "latest",
  };
  // Get the transaction history for the address
  //   const history = await provider.getHistory(address);
  const logs = await provider.getLogs(filter);
  const txn = await provider.getTransaction(
    "0xfc86973ae3a0230d3a87ed3e59c9a7ac7fed4339a008fb3d1b20e0eb8f25d352"
  );

  console.log(`🚀 ~ file: test.js:23 ~ txn:`, txn);
  // Print the details of each transaction
  logs.forEach(async (log, index) => {
    const txnFrom = await provider.getTransaction(log.transactionHash);
    console.log(`🚀 ~ file: test.js:28 ~ txnFrom:`, txnFrom.from);
    // console.log(`Transaction ${index + 1}:`);
    // console.log(`Transaction Hash: ${log.transactionHash}`);
    // console.log(`Block Number: ${log.blockNumber}`);
    // console.log(`Timestamp: `);
    // console.log(`From: ${log.topics[1]}`);
    // console.log(`To: ${log.topics[2]}`);
    // console.log(`Value: ${ethers.utils.formatUnits(log.data, "wei")} WEI`);
    // console.log("------------------------");
  });
}

// Replace 'your_ethereum_address' with the address you want to fetch transactions for
const address = "0x1f70fc8de5669eaa8C9ce72257c94500DC5ff2E4";

fetchRecentTransactions(address);
