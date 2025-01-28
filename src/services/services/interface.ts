import { ServiceInfoType } from "../../utils/types/types";

interface GetAllServicesByShopIdResponseType {
  status: number;
  data: Array<ServiceInfoType>;
}

interface GetAllServicesResponse {
  status: number;
  data: Array<ServiceInfoType>;
}

export type { GetAllServicesByShopIdResponseType, GetAllServicesResponse };
