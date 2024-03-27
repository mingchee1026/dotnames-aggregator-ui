declare function getAvailableEns(domainName: string, providerUrl: string): Promise<any>;
declare function getRentPriceEns(domainName: string, duration: number, providerUrl: string): Promise<number>;
declare function getDomainExpiryEns(domainName: string, providerUrl: string): Promise<string>;

export { getAvailableEns, getDomainExpiryEns, getRentPriceEns };
