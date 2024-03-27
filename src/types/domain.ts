export type DomainPlatform = {
  platform: string;
  icon: string;
  coin: {
    icon: string;
    symbol: string;
  };
};

export interface DomainInterFace {
  name: string;
  status: string;
  address: string;
  canRegister: boolean;
  isLoading?: boolean;
  isRefetching?: boolean;
  platform: DomainPlatform;
  index: number;
  tld: string;
  price?: number;
  commitment?: string;
  commitmentValidity?: number;
  fullPrice?: number;
  years?: number;
  expiry?: number | string;
}
