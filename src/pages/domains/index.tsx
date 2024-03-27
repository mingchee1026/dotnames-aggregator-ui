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
  return (
    <div>
      {/* @ts-ignore */}
      <SeoHead title={`DotNames Domains : Search Domain`} />

      <DomainFinder _label={""} />
      <Toaster />
    </div>
  );
};

export default SearchDomainsPage;
