import React, { useEffect } from "react";
import DomainRow from "./DomainRow";
import { useQueryAllDomains } from "@/hooks/useQueryDomains";
import { useAppSelector } from "@/redux/store";
import _ from "lodash";
type Props = {};

function DomainRows({}: Props) {
  const filteredList = useAppSelector(
    (state) => state.domainQuery.filteredList
  );
  return (
    <div className="h-[75vh] overflow-scroll relative top-0 ">
      <div className="overflow-x-auto lg:my-5 relative top-0">
        {/* TODO : ORDER TABLE */}
        {filteredList?.length <= 0 && (
          <p className="text-center w-full">No domain found</p>
        )}
        {filteredList?.length > 0 && (
          <table className="table p-0 ">
            {/* head */}
            <thead>
              <tr>
                <th className="px-2">Domain</th>
                <th>Price</th>
                <th className="lg:block hidden">Expiry</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="">
              {filteredList?.map((domainData) => {
                console.log(
                  `🚀 ~ file: DomainRows.tsx:34 ~ domainData:`,
                  domainData
                );

                // @ts-ignore
                return <DomainRow key={domainData?.name} {...domainData} />;
              })}
            </tbody>
            {/* foot */}
          </table>
        )}
      </div>
    </div>
  );
}

export default DomainRows;
