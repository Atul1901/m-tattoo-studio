import { useQuery } from "@tanstack/react-query";
import { constants } from "../constants/constants";
import { HttpStatus } from "../fetch/fetchAPI";
import { ServiceInfoType, ShopInfoType } from "../types/types";
import { GetAllServices } from "../../services/services";

export const useGetAllServices = () => {
  const fetchAllServices = async () => {
    try {
      const { data, status } = await GetAllServices();
      if (status === HttpStatus.OK) {
        return data ? data : ([] as ServiceInfoType[]);
      }
    } catch (error: any) {
      return [];
    }
  };

  const { data: allServices, isLoading: allServicesLoading } = useQuery({
    queryFn: fetchAllServices,
    queryKey: [constants.queryKeys.getAllServices],
  });
  return { allServices, allServicesLoading };
};
