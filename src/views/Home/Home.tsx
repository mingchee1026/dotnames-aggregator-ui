import Header from "@/components/Header/Header";
import Hero from "./components/Hero";
import Products from "./components/Products";
import SearchDomainInput from "@/components/SearchDomain/SearchDomainInput";
import SubHeader from "./components/SubHeader";
import DomainCollection from "./components/DomainCollection";
import Wrapper from "./components/Wrapper";
import Cards from "./components/Cards";
import { useTheme } from "next-themes";
import Footer from "@/components/Footer/Footer";

type Props = {};

function Home({}: Props) {
  const { theme } = useTheme();
  return (
    <>
      <div className="min-h-screen">
        <div className={` bg-top `}>
          <div className="container w-full  mx-auto my-0 px-2 xl:px-0 flex flex-col  min-h-screen">
            <div className="py-5">
              <Header />
            </div>
            <div
              className={`grid h-full grid-cols-1  p-10 md:grid-cols-1 w-full  rounded-2xl hero-bg-image bg-cover bg-[50em] `}
            >
              <div className="flex flex-col items-center px-0 lg:px-28 xl:px-72">
                <Hero />
                <div className="flex w-full gap-1 my-10 md:w-4/5">
                  <SearchDomainInput />
                </div>
                <Products />
              </div>
            </div>
          </div>
          <div className="border-gray-200/50  border-t-2 py-2">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
