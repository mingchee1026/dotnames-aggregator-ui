import SeoHead from "@/components/SeoHead/SeoHead";
import About from "@/views/About/About";
import React from "react";

type Props = {};

function aboutPage({}: Props) {
  return (
    <main>
      <SeoHead title="Aggregator | About" />
      <About />
    </main>
  );
}

export default aboutPage;
