import Link from "next/link";
export interface LinkSection {
  title: string;
  links: Array<{
    to: string;
    text: string;
  }>;
}

function Footer() {
  const linkSections: Array<LinkSection> = [
    {
      title: "About",
      links: [
        {
          to: "/about",
          text: "About us",
        },
        {
          to: "https://dotnames.me/blogs",
          text: "Blog",
        },
        {
          to: `/about#contactus`,
          text: "Contact us",
        },
        {
          to: `/`,
          text: "Join the team",
        },
        {
          to: "/",
          text: "Privacy Policy",
        },
      ],
    },
    {
      title: "Products",
      links: [
        {
          to: "https://dotnames.me",
          text: "DotNames",
        },
        {
          to: `https://dotshm.me/`,
          text: "DotShm",
        },
        {
          to: "https://dottaiko.me/",
          text: "DotTaiko",
        },
        {
          to: "/",
          text: "DotBlast",
        },
        {
          to: `https://dotomni.me/`,
          text: "DotOmni",
        },
        {
          to: "https://dotsei.me/",
          text: "DotSei",
        },
      ],
    },

    {
      title: "Quick Links",
      links: [
        {
          to: "/",
          text: "Developer Docs",
        },
        {
          to: `/`,
          text: "Report a bug",
        },
        {
          to: "/",
          text: "Support",
        },
        {
          to: "https://www.dotnames.me/quests/names",
          text: "Names Quest",
        },
      ],
    },
  ];
  return (
    <>
      <div className="flex flex-wrap lg:flex-row justify-between items-start px-4 py-8  lg:px-28 lg:py-16 text-[##333333] gap-y-8 sm:gap-y-0 sm:gap-x-4 lg:gap-x-0">
        <div className="flex flex-col gap-y-6 w-full lg:w-fit">
          <div className="flex flex-col gap-y-4">
            <Link
              href={"/"}
              className="flex items-center justify-start gap-2 w-fit"
            >
              <div className="flex flex-wrap items-center w-fit">
                <Link
                  href={"/"}
                  className="flex items-center justify-start h-fit"
                >
                  <img
                    src="/images/logos/dotnames-pink.svg"
                    alt="Dotnames"
                    width={150}
                  />
                </Link>
              </div>
            </Link>
            <div className="text-sm">
              <p className="w-[20em]">Your ultimate Web3 domain aggregator.</p>
            </div>
          </div>

          <div className="flex flex-row items-center gap-5">
            <a
              href="https://twitter.com/dotshmdomains"
              target="_blank"
              className="flex items-center justify-start w-[1.5em] h-fit"
            >
              <img src="/images/icons/twitter.svg" alt="Twitter" />
            </a>
            <a
              href="https://t.me/DotNamesDomains"
              target="_blank"
              className="flex items-center justify-start w-[1.5em] h-fit"
            >
              <img src="/images/icons/telegram.svg" alt="Telegram" />
            </a>
            <a
              href="https://discord.gg/dotnames"
              target="_blank"
              className="flex items-center justify-start w-[1.5em] h-fit"
            >
              <img src="/images/icons/discord.svg" alt="Discord" />
            </a>
            <a
              href=""
              target="_blank"
              className="flex items-center justify-start w-[1.4em] h-fit"
            >
              <img src="/images/icons/farcaster.svg" alt="Farcaster" />
            </a>
          </div>
        </div>
        {/* Link-Section */}

        {linkSections.map((section, _idx) => {
          return (
            <div key={_idx} className="text-sm">
              <h3 className="font-medium text-lg mb-6">{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map((link, _linkIdx) => {
                  return (
                    <li className="font-normal" key={_linkIdx}>
                      <Link href={link.to}>{link.text}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
      {/* Footer  */}
      <div>
        <div className="my-0 w-[85%] divider text-[1px] m-auto"></div>
        <div className="flex flex-row justify-center my-5 text-center">
          <p className="text-sm">
            Copyright © 2024 DotNames | All Rights Reserved
          </p>
        </div>
      </div>
    </>
  );
}
export default Footer;
