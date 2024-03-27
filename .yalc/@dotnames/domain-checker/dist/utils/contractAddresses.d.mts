import { Contract } from 'ethers';
import { Provider } from 'zksync-ethers';

declare const getContractAddressByChainId: (chainId: Number) => "0x253553366Da8546fC250F225fe3d25d0C782303b" | "0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5" | "0x7a85af7df7ef1b1c9d41b29168485c90816b65a1" | "0x3aaec59fd6efa66f147855f2e8132248480daf3c" | "0x36bDa80739B6cF725a324454fB060Fe963348d2B" | "0xdA8219C2011732fF4179407f531ce30845462607" | undefined;
declare const getBaseImplContractAddressByChainId: (chainId: Number) => "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85" | "0x888A2BA9787381000Cd93CA4bd23bB113f03C5Af" | "0xE3b1D32e43Ce8d658368e2CBFF95D57Ef39Be8a6" | "0x5d482D501b369F5bA034DEC5c5fb7A50d2D6Ca20" | "0x9994166Ad2B60FE759e1b82C68F10DB2C921f711" | undefined;
declare const getContractByChainId: (chainId: number, provider: Provider) => Contract;
declare const getBaseImplContractByChainId: (chainId: number, provider: Provider) => Contract;

export { getBaseImplContractAddressByChainId, getBaseImplContractByChainId, getContractAddressByChainId, getContractByChainId };
