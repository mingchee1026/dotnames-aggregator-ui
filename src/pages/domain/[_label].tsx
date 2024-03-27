import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Toaster, toast } from "react-hot-toast";

import SeoHead from "@/components/SeoHead/SeoHead";
import { SUPPORTED_TLDS } from "@/configs/constants";

import { getDomainWitoutTld } from "@/utils";
import { hasSpecialCharacters } from "@/utils/validators";

import DomainSearchDashboard from "@/views/DomainSearch/DomainSearchDashboard";

type Props = {};

const RegisteredDomain = ({}: Props) => {
  const router = useRouter();
  const { query } = router;
  const { _label = "" } = router.query;
  const [loading, setLoading] = useState(true);
  const [label, setLabel] = useState<string | undefined>(undefined);

  useEffect(() => {
    setLabel(query._label as string);
  }, [query._label]);

  useEffect(() => {
    const validateDomain = () => {
      if (!label) {
        toast.error("Domain label is missing.", {
          style: {
            background: "#363636",
            color: "lightgray",
          },
        });
        router.push("/");
        return;
      }

      const labelWithoutTld = getDomainWitoutTld(label);
      const splitedLabel = label.split(".");
      const tld = splitedLabel.pop();
      //   console.log("default tld", tld);
      if (
        !SUPPORTED_TLDS.includes(tld!) ||
        splitedLabel.length == 2 ||
        hasSpecialCharacters(labelWithoutTld) ||
        (labelWithoutTld as string).length >= 65
      ) {
        toast.error("Invalid Domain or TLD", {
          style: {
            background: "#363636",
            color: "lightgray",
          },
        });
        router.push("/");
      }
    };

    if (loading) {
      setLoading(false);
    } else {
      // Check if the label is not empty before proceeding with validation
      if (label && label !== "") {
        validateDomain();
      }
    }
  }, [loading, label, router]);

  // Check if the label is not empty before rendering the component
  if (!label) {
    return null;
  }

  return (
    <div>
      {/* @ts-ignore */}
      <SeoHead title={`D Search Domain ${_label}`} />

      <DomainSearchDashboard _label={label} />
      <Toaster />
    </div>
  );
};

export default RegisteredDomain;
