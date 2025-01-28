import { SaleInfoType } from "../../utils/types/types";

interface GetAllSalesByShopIdResponseType {
  status: number;
  data: Array<SaleInfoType>;
}

export type { GetAllSalesByShopIdResponseType };
