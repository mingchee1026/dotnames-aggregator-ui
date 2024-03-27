import SeoHead from "@/components/SeoHead/SeoHead";
import About from "@/views/About/About";
import Account from "@/views/Account/Account";
import React from "react";

type Props = {};

function accountPage({}: Props) {
  return (
    <main>
      <SeoHead title="Aggregator | About" />
      <Account />
    </main>
  );
}

export default accountPage;
