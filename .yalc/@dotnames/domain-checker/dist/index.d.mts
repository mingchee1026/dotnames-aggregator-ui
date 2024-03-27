import { SupportedNS } from './types.mjs';

interface ProviderUrlsProps {
    ethRPC?: string;
    polygonRPC?: string;
    bnbRPC?: string;
    arbRPC?: string;
    suiRPC?: string;
    seiRPC?: string;
    osmosisRPC?: string;
}
declare class DomainChecker {
    constructor(param?: ProviderUrlsProps);
    setProviderUrl(param: ProviderUrlsProps): Promise<void>;
    getAvailable(domainName: string, ns?: SupportedNS): Promise<any>;
    getRentPrice(domainName: string, duration: number, ns?: SupportedNS): Promise<number | "Not supported name service" | undefined>;
    getDomainExpiry(domainName: string, ns?: SupportedNS): Promise<any>;
}

export { DomainChecker, type ProviderUrlsProps };
