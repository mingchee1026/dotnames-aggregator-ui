import DashboardLayout from "@/components/Layout/DashboardLayout";
import RegisteredDomain from "./RegisteredDomain";
import Register from "./Register";
import { Toaster } from "react-hot-toast";
import { isAbsolute } from "path";

type Props = { _label: string };

const DomainSearchDashboard = ({ _label }: Props) => {
  const isLoading = false;
  const isAvailable = true;
  const isFetched = true;

  const refetchDomain = () => {};

  return (
    <DashboardLayout>
      {!isLoading && isAvailable && isFetched ? (
        <Register _label={_label as string} refetchDomain={refetchDomain} />
      ) : (
        isFetched && <RegisteredDomain _label={_label as string} />
      )}
      <Toaster />
    </DashboardLayout>
  );
};

export default DomainSearchDashboard;
