import {
  DomainChecker
} from "../chunk-3MWKBYTZ.mjs";
import "../chunk-EC3G3GSM.mjs";
import "../chunk-ZEAF7NGH.mjs";
import "../chunk-APXYS2DS.mjs";
import "../chunk-B2PM5JTZ.mjs";
import {
  YEAR_TO_SEC
} from "../chunk-ITEORNBY.mjs";
import {
  detectNameService
} from "../chunk-OS6HSI6Q.mjs";
import "../chunk-XKUMOIRY.mjs";
import "../chunk-RBFNNELV.mjs";
import "../chunk-L3NQIU7O.mjs";
import "../chunk-QQVCINNS.mjs";
import "../chunk-7S7J3P3P.mjs";
import "../chunk-ZI3MMQNI.mjs";
import "../chunk-6U7FN32R.mjs";

// src/___tests___/index.test.ts
describe("testing detect nameservice function", () => {
  test("DetectNameService", () => {
    return detectNameService("alice.eth").then((result) => {
      expect(result).toBe(1 /* ENS */);
    });
  });
});
describe("testing resolveAddress function", () => {
  let dotnames;
  beforeEach(() => {
    dotnames = new DomainChecker();
  });
  test("ENS ===> hello.eth", () => {
    return dotnames.getAvailable("hello.eth").then((address) => {
      expect(address).toBe(false);
    });
  }, 4e3);
  test("ENS ===> helkllllo.eth", () => {
    return dotnames.getAvailable("helkllllo.eth").then((address) => {
      expect(address).toBe(true);
    });
  }, 4e3);
  test("SIDBnb ===> hello.bnb", () => {
    return dotnames.getAvailable("hello.bnb").then((address) => {
      expect(address).toBe(false);
    });
  }, 4e3);
  test("SIDBnb ====> helefeflo.bnb", () => {
    return dotnames.getAvailable("helefeflo.bnb").then((address) => {
      expect(address).toBe(true);
    });
  }, 4e3);
  test("SIDArb ====> hello.arb", () => {
    return dotnames.getAvailable("hello.arb").then((address) => {
      expect(address).toBe(false);
    });
  }, 9e3);
  test("SIDArb ====> helefeflo.arb", () => {
    return dotnames.getAvailable("helefeflo.arb").then((address) => {
      expect(address).toBe(true);
    });
  }, 9e3);
  test("SeiNs ====> 1234567890.sei", () => {
    return dotnames.getAvailable("1234567890.sei").then((address) => {
      expect(address).toBe(false);
    });
  }, 9e3);
  test("SeiNs ====> 1234dsd567890.sei", () => {
    return dotnames.getAvailable("1234dsd567890.sei").then((address) => {
      expect(address).toBe(true);
    });
  }, 9e3);
  test("SuiNs ====> hello.sui", () => {
    return dotnames.getAvailable("hello.sui").then((result) => {
      expect(result).toBe(false);
    });
  }, 9e3);
  test("SuiNs ====> hellosdsds.sui", () => {
    return dotnames.getAvailable("hellosdsds.sui").then((address) => {
      expect(address).toBe(true);
    });
  }, 9e3);
});
describe("testing rentPrice function", () => {
  let dotnames;
  beforeEach(() => {
    dotnames = new DomainChecker();
  });
  test("ENS Price ===> hello.eth", () => {
    return dotnames.getRentPrice("hello.eth", YEAR_TO_SEC * 2).then((price) => {
      console.log(`\u{1F680} ~ file: index.test.ts:87 ~ price:`, price);
    });
  });
  test("SIDBnb Price===> hello.bnb", () => {
    return dotnames.getRentPrice("hello.bnb", YEAR_TO_SEC * 2).then((price) => {
      console.log(`\u{1F680} ~ file: index.test.ts:95 ~ price:`, price);
    });
  });
  test("SIDArb Price====> hello.arb", () => {
    return dotnames.getRentPrice("hello.arb", YEAR_TO_SEC * 2).then((price) => {
      console.log(`\u{1F680} ~ file: index.test.ts:95 ~ price:`, price);
    });
  });
  test("SeiNs getRentPrice====> 1234dsd567890.sei", () => {
    return dotnames.getRentPrice("1234567890.sei", YEAR_TO_SEC * 2).then((price) => {
      console.log(`\u{1F680} ~ file: index.test.ts:109 ~ price:`, price);
    });
  });
  test("SuiNs getRentPrice====> hello.sui", () => {
    return dotnames.getRentPrice("hello.sui", YEAR_TO_SEC * 2).then((price) => {
      console.log(`\u{1F680} ~ file: index.test.ts:118 ~ price:`, price);
    });
  });
});
describe("testing getDomainExpiry function", () => {
  let dotnames;
  beforeEach(() => {
    dotnames = new DomainChecker();
  });
  test("ENS getDomainExpiry ===> hello.eth", () => {
    return dotnames.getDomainExpiry("hello.eth").then((expiry) => {
      console.log(`\u{1F680} ~ file: index.test.ts:129 ~ expiry:`, expiry);
      expect(expiry).toBe("1830096106000");
    });
  });
  test("ENS Unregistered getDomainExpiry  ===> fjakfjhjsfdhkahfj.eth", () => {
    return dotnames.getDomainExpiry("fjakfjhjsfdhkahfj.eth").then((expiry) => {
      console.log(`\u{1F680} ~ file: index.test.ts:129 ~ expiry:`, expiry);
      expect(expiry).toBe("0");
    });
  });
  test("SIDBnb getDomainExpiry===> hello.bnb", () => {
    return dotnames.getDomainExpiry("hello.bnb").then((expiry) => {
      console.log(`\u{1F680} ~ file: index.test.ts:135 ~ expiry:`, expiry);
      expect(expiry).toBe("1756086947000");
    });
  });
  test("SIDBnb Unregistered getDomainExpiry===> fjakfjhjsfdhkahfj.bnb", () => {
    return dotnames.getDomainExpiry("fjakfjhjsfdhkahfj.bnb").then((expiry) => {
      console.log(`\u{1F680} ~ file: index.test.ts:135 ~ expiry:`, expiry);
      expect(expiry).toBe("0");
    });
  });
  test("SIDArb getDomainExpiry====> hello.arb", () => {
    return dotnames.getDomainExpiry("hello.arb").then((expiry) => {
      console.log(`\u{1F680} ~ file: index.test.ts:141 ~ expiry:`, expiry);
      expect(expiry).toBe("1771588175000");
    });
  });
  test("SIDArb Unregistered getDomainExpiry====> fjakfjhjsfdhkahfj.arb", () => {
    return dotnames.getDomainExpiry("fjakfjhjsfdhkahfj.arb").then((expiry) => {
      console.log(`\u{1F680} ~ file: index.test.ts:141 ~ expiry:`, expiry);
      expect(expiry).toBe("0");
    });
  });
  test("SeiNs getDomainExpiry====> hello.sei", () => {
    return dotnames.getDomainExpiry("hello.sei").then((expiry) => {
      console.log(`\u{1F680} ~ file: index.test.ts:141 ~ expiry:`, expiry);
      expect(expiry).toBe("1723914033000");
    });
  });
  test("SeiNs Unregistered getDomainExpiry====> fjakfjhjsfdhkahfj.sei", () => {
    return dotnames.getDomainExpiry("fjakfjhjsfdhkahfj.sei").then((expiry) => {
      console.log(`\u{1F680} ~ file: index.test.ts:141 ~ expiry:`, expiry);
      expect(expiry).toBe("0");
    });
  });
  test("SuiNs getDomainExpiry====> hello.sui", () => {
    return dotnames.getDomainExpiry("hello.sui").then((expiry) => {
      console.log(`\u{1F680} ~ file: index.test.ts:153 ~ expiry:`, expiry);
      expect(expiry).toBe("1717036149094");
    });
  });
  test("SuiNs Unregistered getDomainExpiry====> fjakfjhjsfdhkahfj.sui", () => {
    return dotnames.getDomainExpiry("fjakfjhjsfdhkahfj.sui").then((expiry) => {
      console.log(`\u{1F680} ~ file: index.test.ts:153 ~ expiry:`, expiry);
      expect(expiry).toBe("0");
    });
  });
});
