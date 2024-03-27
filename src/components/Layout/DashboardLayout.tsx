import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import classNames from "classnames";
type Props = {
  children: React.ReactNode;
  childClassNames?: string;
  headerWithSearch?: boolean;
};

function DashboardLayout({
  children,
  childClassNames,
  headerWithSearch = true,
}: Props) {
  return (
    <div className="min-h-[100vh] flex flex-col justify-between w-full container mx-auto ">
      <Header isFromDashLayout={headerWithSearch} />
      <div
        className={classNames("container flex-grow mx-auto ", childClassNames)}
      >
        {children}
      </div>

      <Footer />
    </div>
  );
}

export default DashboardLayout;
