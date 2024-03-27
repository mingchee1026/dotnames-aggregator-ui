import _ from "lodash";
import { useBatchDomainPriceSei } from "./DotSei/useBatchDomainPriceSei";
import { YEAR_TO_SEC } from "@/configs/constants";

interface SearchResult {
  name: string;
  status: string;
  address: string;
  price: number;
  canRegister: boolean;
  isLoading: boolean;
  platform: any;
  index: number;
  tld: string;
}
