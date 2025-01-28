import { useQuery } from "@tanstack/react-query";
import { GetAllShops } from "../../services/shops";
import { constants } from "../constants/constants";
import { HttpStatus } from "../fetch/fetchAPI";
import { ShopInfoType } from "../types/types";

export const useGetAllShops = () => {
  const fetchAllShops = async () => {
    try {
      const { data, status } = await GetAllShops();
      if (status === HttpStatus.OK) {
        return data ? data : ([] as ShopInfoType[]);
      }
    } catch (error: any) {
      return [];
    }
  };

  const { data: allShops, isLoading: allShopsLoading } = useQuery({
    queryFn: fetchAllShops,
    queryKey: [constants.queryKeys.getAllShops],
  });
  return { allShops, allShopsLoading };
};
