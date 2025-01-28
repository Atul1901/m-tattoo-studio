import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { GetAllAppointmentsByShopIdResponseType } from "../../services/appointments/interface";
import { GetAllCustomersByShopIdResponseType } from "../../services/customers/interface";
import { GetAllSalesByShopIdResponseType } from "../../services/sales/interface";
import { GetAllServicesByShopIdResponseType } from "../../services/services/interface";
import { HttpStatus } from "../fetch/fetchAPI";
import { SelectedShopId } from "../redux/reducer/appState-slice";
import { useState } from "react";

type QueryFnResponseType =
  | GetAllAppointmentsByShopIdResponseType["data"]
  | GetAllSalesByShopIdResponseType["data"]
  | GetAllCustomersByShopIdResponseType["data"]
  | GetAllServicesByShopIdResponseType["data"];

type PropsType<T> = {
  queryKey: string;
  queryFn: ({
    shopId,
    startDate,
    endDate,
  }: {
    shopId?: string | null;
    startDate?: string | null;
    endDate?: string | null;
  }) => Promise<{
    status: number;
    data: T;
  }>;
  startDate?: string;
  endDate?: string;
};

export const useGetDataByShopId = <T extends QueryFnResponseType>({
  queryFn,
  queryKey,
  startDate,
  endDate,
}: PropsType<T>) => {
  const shopId = useSelector(SelectedShopId);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const fetch = async () => {
    setIsLoading(true);
    try {
      const { data, status } = await queryFn(
        startDate && endDate
          ? { shopId, startDate, endDate }
          : {
              shopId: shopId ? shopId : null,
            }
      );
      if (status === HttpStatus.OK) {
        return data?.length > 0 ? data : [];
      }
    } catch (error) {
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const { data } = useQuery({
    queryKey: [queryKey, shopId, startDate, endDate],
    queryFn: fetch,
    enabled: !!shopId,
  });
  return { data, isLoading };
};
