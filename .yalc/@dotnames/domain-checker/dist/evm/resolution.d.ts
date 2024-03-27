interface Records {
    text: {
        avatar?: string;
        description?: string;
        display?: string;
        email?: string;
        keywords?: string;
        mail?: string;
        notice?: string;
        location?: string;
        phone?: string;
        url?: string;
    };
    address: string | undefined;
    contentHash: string | undefined;
}
declare function getRecordsResolution(domainName: string, ethProviderUrl: string, polygonProviderUrl: string): Promise<Records>;
declare function getAddressResolution(domainName: string, ethProviderUrl: string, polygonProviderUrl: string): Promise<string | undefined>;
declare function getNameResolution(address: string, ethProviderUrl: string, polygonProviderUrl: string): Promise<string | null>;

export { getAddressResolution, getNameResolution, getRecordsResolution };
