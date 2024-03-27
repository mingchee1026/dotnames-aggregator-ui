import { SupportedNS } from '../types.js';

declare function detectNameService(domainName: String): Promise<SupportedNS>;

export { detectNameService };
