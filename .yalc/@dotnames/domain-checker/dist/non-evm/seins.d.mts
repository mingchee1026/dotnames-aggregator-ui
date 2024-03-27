declare function getAvailableSeiNs(domainName: string, providerUrl: string): Promise<any>;
declare function getRentPriceSeiNs(domainName: string, duration: number, providerUrl: string): Promise<number>;
declare function getDomainExpirySeiNs(domainName: string, providerUrl: string): Promise<string>;

export { getAvailableSeiNs, getDomainExpirySeiNs, getRentPriceSeiNs };
