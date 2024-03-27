import { useRouter } from "next/router";

import RegisterExt from "./RegisterExt";
import { Toaster, toast } from "react-hot-toast";
import { useEnsDomainRentPrice } from "@/hooks/Ens/useDomainPrice";
import { useEnsRegister } from "@/hooks/Ens/useEnsController";
import { useSidDomainRentPrice } from "@/hooks/Sid/useDomainPrice";
import { useSidRegister } from "@/hooks/Sid/useSidController";
import { useSuiNsDomainRentPrice } from "@/hooks/SuiNs/useDomainPrice";
import { useSuiNsRegister } from "@/hooks/SuiNs/useSuiNsController";
import { useSeiDomainRentPrice } from "@/hooks/DotSei/useDomainPrice";
import { useDotSeiRegister } from "@/hooks/DotSei/useSeiController";
import { useUdDomainRentPrice } from "@/hooks/Ud/useDomainPrice";
import { useUdRegister } from "@/hooks/Ud/useUdController";

type Props = {
  _label: string;
  refetchDomain?: () => void;
};

const Register = ({ _label, refetchDomain }: Props) => {
  const router = useRouter();

  let useDomainRentPriceFn;
  let registerDomainFn;

  const splitedLabel = _label.split(".");
  const tld = splitedLabel.pop();

  if (tld === "eth") {
    useDomainRentPriceFn = useEnsDomainRentPrice;
    registerDomainFn = useEnsRegister;
  } else if (tld === "bnb") {
    useDomainRentPriceFn = useSidDomainRentPrice;
    registerDomainFn = useSidRegister;
  } else if (tld === "sui") {
    useDomainRentPriceFn = useSuiNsDomainRentPrice;
    registerDomainFn = useSuiNsRegister;
  } else if (tld === "sei") {
    useDomainRentPriceFn = useSeiDomainRentPrice;
    registerDomainFn = useDotSeiRegister;
  } else if (tld === "crypto") {
    useDomainRentPriceFn = useUdDomainRentPrice;
    registerDomainFn = useUdRegister;
  } else {
    toast.error("Invalid Domain or TLD", {
      style: {
        background: "#363636",
        color: "lightgray",
      },
    });
    router.push("/");
    return;
  }

  return (
    <div>
      {/* Your JSX content */}
      <RegisterExt
        domainName={_label}
        useDomainRentPrice={useDomainRentPriceFn}
        // @ts-ignore
        registerDomain={registerDomainFn}
      />
      <Toaster />
    </div>
  );
};

export default Register;
