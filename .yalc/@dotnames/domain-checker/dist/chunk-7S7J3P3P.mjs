// src/utils/domainFormat.ts
function getNameFromDomain(domainName) {
  const extension = domainName.split(".");
  if (!extension)
    return "";
  return extension[0].toLowerCase();
}

export {
  getNameFromDomain
};
