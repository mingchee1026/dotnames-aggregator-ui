import {
  extensionData_default
} from "./chunk-XKUMOIRY.mjs";
import {
  __async
} from "./chunk-6U7FN32R.mjs";

// src/utils/detectNameService.ts
function getExtensionFromDomain(domainName) {
  const extension = domainName.split(".").pop();
  if (!extension)
    return "";
  return extension.toLowerCase();
}
function fetchExtensionData() {
  return extensionData_default;
}
function detectNameService(domainName) {
  return __async(this, null, function* () {
    const extension = getExtensionFromDomain(domainName).toLowerCase();
    if (extension === "") {
      return 13 /* None */;
    }
    const extensionMap = fetchExtensionData();
    const domainServiceName = extensionMap.hasOwnProperty(extension) ? extensionMap[extension] : null;
    switch (domainServiceName) {
      case "ENS":
        return 1 /* ENS */;
      case "SpaceIdBnb":
        return 2 /* SpaceIdBnb */;
      case "SpaceIdArb":
        return 3 /* SpaceIdArb */;
      case "UnstoppableDomains":
        return 4 /* UnstoppableDomains */;
      case "SuiNs":
        return 10 /* SuiNs */;
      case "SeiNS":
        return 12 /* SeiNS */;
      default:
        return 1 /* ENS */;
    }
  });
}

export {
  detectNameService
};
