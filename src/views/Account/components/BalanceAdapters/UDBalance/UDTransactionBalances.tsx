import { useUDDomainPaids } from "@/hooks/Ud/useUDTransactionBal";
import { useAppSelector } from "@/redux/store";
import React from "react";
import UDDomainStatusCard from "./UDDomainStatusCard";

type Props = {};

function UDTransactionBalances({}: Props) {
  const account = useAppSelector((state) => state.login.account);

  const { data, isLoading, error } = useUDDomainPaids(account!);
  console.log(
    `🚀 ~ file: UDTransactionBalances.tsx:11 ~  { data, isLoading ,error}:`,
    { data, isLoading, error }
  );
  return (
    <div className="grid grid-cols-2  lg:grid-cols-4  gap-4 ">
      {data?.map((d: any) => {
        return (
          <UDDomainStatusCard domainPaid={d} key={d?.id} account={account} />
        );
      })}
    </div>
  );
}

export default UDTransactionBalances;
