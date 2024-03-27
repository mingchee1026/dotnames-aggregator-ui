export const formatAddress = (account: string) => {
  const address = account;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
export const formatZetaName = (label: string) => {
  if (label?.split(".")?.length == 2) {
    if (label?.split(".")[0]!.length >= 8) {
      return `${label.slice(0, 4)}...${label.slice(-2)}`;
    }
    return `${label}`;
  }
  if (label?.length >= 8) {
    return `${label.slice(0, 4)}...${label.slice(-2)}`;
  }
  return label;
};

export const formatWrapedText = (
  label: string,
  startChar: number = 4,
  endChar: number = 6
) => {
  if (startChar + endChar >= label?.length) {
    return label;
  }
  if (label?.split(".")?.length == 2) {
    if (label?.split(".")[0]!.length >= 8) {
      return `${label.slice(0, startChar)}...${label.slice(-endChar)}`;
    }
    return `${label}`;
  }
  if (label?.length >= 8) {
    return `${label.slice(0, startChar)}...${label.slice(-endChar)}`;
  }
  return label;
};

export const getDomainWitoutTld = (label: string) => {
  try {
    return label
      ?.split(".")
      ?.slice(0, -1)
      ?.toLocaleString()
      ?.replaceAll(",", ".");
  } catch (error) {
    console.log(`🚀 ~ file: index.ts:62 ~ error:`, error);
    return label;
  }
};

export const hexBytesToString = (input: string) => {
  let parsedInput = input;
  try {
    if (input.startsWith("0x")) {
      parsedInput = input.substring(2);
    }
    let buf = Buffer.from(parsedInput, "hex");
    let data = buf.toString("utf8");
    return data;
  } catch (error) {
    return input;
  }
};

export const gAevent = ({ action, category, label, value }: any) => {
  try {
    // @ts-ignore
    window?.gtag("event", action, {
      event_category: category,
      event_label: label,
      value,
    });
  } catch (error) {
    console.log(`index:15 ~ error:`, error);
  }
};

export const getTldByChainId = (chainId: number) => {
  switch (chainId) {
    case 1:
    case 5:
      return "eth";
    case 56:
    case 97:
      return "bnb";
    case 42161:
    case 421613:
      return "arb";
    default:
      return "bnb";
  }
};
