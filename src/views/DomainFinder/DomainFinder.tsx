import DashboardLayout from "@/components/Layout/DashboardLayout";
import React from "react";
import { Toaster } from "react-hot-toast";
import SearchFilters from "./components/SearchFilter/SearchFilters";
import DomainList from "./components/DomainList/DomainList";
import OtherDomains from "./components/OtherDomains";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

type Props = { _label: string };

function DomainFinder({ _label }: Props) {
  return (
    <>
      <div className="container w-full min-h-screen mx-auto my-0 px-2 xl:px-0">
        <div className="py-5">
          <Header />
        </div>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-5  w-full">
          <div className="w-full hidden lg:block ">
            <SearchFilters defaultInput={_label} />
          </div>
          <div className="w-full ">
            <DomainList defaultInput={_label} />
          </div>
          {/* <div className="w-full hidden lg:block">
          <OtherDomains />
        </div> */}
        </div>
        <Toaster />
      </div>
      <div className="border-gray-200/50  border-t-2 py-2">
        <Footer />
      </div>
    </>
  );
}

export default DomainFinder;
