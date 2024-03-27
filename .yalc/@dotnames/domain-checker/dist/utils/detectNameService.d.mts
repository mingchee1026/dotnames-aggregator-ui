import { SupportedNS } from '../types.mjs';

declare function detectNameService(domainName: String): Promise<SupportedNS>;

export { detectNameService };
