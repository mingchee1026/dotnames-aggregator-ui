declare function getAvailableSIDBnb(domainName: string, providerUrl: string): Promise<any>;
declare function getAvailableSIDArb(domainName: string, providerUrl: string): Promise<any>;
declare function getRentPriceSIDBnb(domainName: string, duration: number, providerUrl: string): Promise<number>;
declare function getRentPriceSIDArb(domainName: string, duration: number, providerUrl: string): Promise<number>;
declare function getDomainExpirySIDBnb(domainName: string, providerUrl: string): Promise<string>;
declare function getDomainExpirySIDArb(domainName: string, providerUrl: string): Promise<string>;

export { getAvailableSIDArb, getAvailableSIDBnb, getDomainExpirySIDArb, getDomainExpirySIDBnb, getRentPriceSIDArb, getRentPriceSIDBnb };
