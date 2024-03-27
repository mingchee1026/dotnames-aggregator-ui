declare function getAvailableSui(domainName: string, fullnode: string): Promise<boolean>;
declare function getPriceSuiNs(domainName: string, duration: number, fullnode: string): Promise<number>;
declare function getDomainExpirySuiNs(domainName: string, fullnode: string): Promise<any>;

export { getAvailableSui, getDomainExpirySuiNs, getPriceSuiNs };
