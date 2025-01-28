import { CustomerInfoType } from "../../utils/types/types";

interface GetAllCustomersByShopIdResponseType {
  status: number;
  data: Array<CustomerInfoType>;
}

export type { GetAllCustomersByShopIdResponseType };
