import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Toaster, toast } from "react-hot-toast";

import SeoHead from "@/components/SeoHead/SeoHead";
import { SUPPORTED_TLDS } from "@/configs/constants";

import { getDomainWitoutTld } from "@/utils";
import { hasSpecialCharacters } from "@/utils/validators";

import DomainSearchDashboard from "@/views/DomainSearch/DomainSearchDashboard";
import DomainFinder from "@/views/DomainFinder/DomainFinder";

type Props = {};

const SearchDomainsPage = ({}: Props) => {
  const router = useRouter();
  const { query } = router;
  const { _label = "" } = router.query;
  console.log(`🚀 ~ file: [_label].tsx:20 ~ _label:`, _label);
  const [loading, setLoading] = useState(true);
  const [label, setLabel] = useState<string | undefined>(undefined);

  useEffect(() => {
    setLabel(query._label as string);
  }, [query._label]);

  // Check if the label is not empty before rendering the component
  if (!label) {
    return null;
  }

  return (
    <div>
      {/* @ts-ignore */}
      <SeoHead title={`DotNames Domains : Search Domain ${_label}`} />

      <DomainFinder _label={label} />
      <Toaster />
    </div>
  );
};

export default SearchDomainsPage;
