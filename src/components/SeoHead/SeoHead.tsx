import Head from "next/head";
import React from "react";

type Props = {
  title?: string;
  description?: string;
  isDynamic?: boolean;
  ogImage?: string;
  ogSite?: string;
  isSameTwitterOg?: boolean;
};

function SeoHead({
  title,
  description,

  ogImage,

  ogSite,
}: Props) {
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="57x57"
        href="/meta/apple-icon-57x57.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="60x60"
        href="/meta/apple-icon-60x60.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="/meta/apple-icon-72x72.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href="/meta/apple-icon-76x76.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="/meta/apple-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/meta/apple-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/meta/apple-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/meta/apple-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/meta/apple-icon-180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/meta/android-icon-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/meta/favicon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/meta/favicon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/meta/favicon.png"
      />
      <link rel="manifest" href="/meta/manifest.json" />
      <link rel="icon" href="/meta/favicon.png" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta
        name="msapplication-TileImage"
        content="/meta/ms-icon-144x144.png"
      />
      <meta name="theme-color" content="#ffffff"></meta>

      {/* START : DYNAMIC SEO HEAD  */}

      {/* <!-- Primary Meta Tags --> */}
      <meta
        name="title"
        content={title || "DotNames Domains : GoDaddy for Web3 "}
      />
      <meta
        name="description"
        content={
          description ||
          "Your ultimate Web3 domain aggregator. Effortlessly buy, manage ENS, Unstoppable Domains, .bnb, and more. Secure your digital identity with exclusive rewards on a single platform."
        }
      />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogSite || "dotomni.me"} />
      <meta
        property="og:title"
        content={title || "DotNames Domains : GoDaddy for Web3 "}
      />
      <meta
        property="og:description"
        content={
          description ||
          "Your ultimate Web3 domain aggregator. Effortlessly buy, manage ENS, Unstoppable Domains, .bnb, and more. Secure your digital identity with exclusive rewards on a single platform."
        }
      />
      <meta
        property="og:image"
        content={ogImage || "/meta/summary_large_image.png"}
      />

      {/* <!-- Twitter --> */}
      <link rel="icon" href="/meta/favicon.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@dotomnidomains" />
      <meta name="twitter:site" content="@dotomnidomains" />
      <meta property="twitter:url" content={ogSite || "https://dotomni.me/"} />
      <meta
        property="twitter:title"
        content={title || "DotNames Domains : GoDaddy for Web3 "}
      />
      <meta
        property="twitter:description"
        content={
          description ||
          "Your ultimate Web3 domain aggregator. Effortlessly buy, manage ENS, Unstoppable Domains, .bnb, and more. Secure your digital identity with exclusive rewards on a single platform."
        }
      />
      <meta
        property="twitter:image"
        content={ogImage || "/meta/summary_large_image.png"}
      />
      <title>{title || "DotNames Domains : GoDaddy for Web3 "}</title>
      {/* END : DYNAMIC SEO HEAD  */}
    </Head>
  );
}

export default SeoHead;
