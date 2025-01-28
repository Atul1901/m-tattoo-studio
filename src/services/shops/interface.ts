import { ShopInfoType } from "../../utils/types/types";

interface Shop {
  _id: string;
  shopName: string;
  location: string;
}

interface ShopResponse {
  status: number;
  data: ShopInfoType[];
}

interface GetAllShopsResponse {
  status: number;
  data: ShopInfoType[];
}

export type { GetAllShopsResponse, Shop, ShopResponse };
