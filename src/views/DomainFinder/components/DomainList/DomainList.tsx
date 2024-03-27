import React from "react";
import DomainListHead from "./DomainListHead";

import DomainRows from "./DomainRows";
 
type Props = {
  defaultInput?: string;
};

function DomainList({ defaultInput }: Props) {
  return (
    <div className="lg:p-2 border  border-gray-500/20 rounded-xl h-[80vh] overflow-hidden">
      <DomainListHead defaultInput={defaultInput} />
      <DomainRows />
    </div>
  );
}

export default DomainList;
