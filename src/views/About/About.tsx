import Header from "@/components/Header/Header";
import React from "react";
import Products from "./components/Products";
import OurStats from "./components/OurStats";
import DotNamesSDK from "./components/DotNamesSDK";
import ContactUs from "./components/ContactUs";
import Footer from "@/components/Footer/Footer";

type Props = {};

function About({}: Props) {
  return (
    <div className=" min-h-screen bg-base-200">
      <div className="py-5 container w-full mx-auto my-0 px-2 xl:px-0">
        <Header />
      </div>

      <div
        className=" min-h-[75vh]  bg-no-repeat w-full flex  justify-center flex-col"
        style={{
          backgroundImage:
            "url('/images/about-left.png'),url('/images/about-right.png') ",
          backgroundPosition: "left center, right center",
          backgroundSize: "10% ,10%",
        }}
      >
        <div className="container w-full mx-auto my-0 px-5 lg:px-20 space-y-4">
          <p className="lg:text-6xl text-4xl font-[500] text-center ">
            Connecting the dots in the ecosystem for a unified web3.
          </p>
          <p className="text-xl lg:text-4xl text-center ">
            DotNames is streamlining web3 onboarding with a multi-chain,
            reward-based domain aggregator. In future, we are focused on
            crafting an identity-driven economy. Elevating the web3 community to
            new dimensions.
          </p>
        </div>
      </div>
      <div className="container w-full mx-auto space-y-32">
        <div>
          <Products />
        </div>
        <div>
          <OurStats />
        </div>
        <div>
          <DotNamesSDK />
        </div>
        <div id="contactus">
          <ContactUs />
        </div>
      </div>
      <div className="border-gray-200/50  border-t-2 py-2">
        <Footer />
      </div>
    </div>
  );
}

export default About;
