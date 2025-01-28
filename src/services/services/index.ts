import { URLS } from "../../utils/constants/urls";
import { fetchAPI } from "../../utils/fetch/fetchAPI";
import { AddNewServiceFormType } from "../../utils/types/types";
import {
  GetAllServicesByShopIdResponseType,
  GetAllServicesResponse,
} from "./interface";

const GetAllServicesByShopId = async (params: {
  shopId?: string | null;
  startDate?: string | null;
  endDate?: string | null;
}): Promise<GetAllServicesByShopIdResponseType> => {
  try {
    const { data, status } = await fetchAPI({
      endpoint: URLS.getAllServicesByShopId(params.shopId ? params.shopId : ""),
      method: "GET",
      // isErrorShow: false,
    });
    return { data, status };
  } catch (error: any) {
    throw error;
  }
};

const GetAllServices = async (): Promise<GetAllServicesResponse> => {
  try {
    const { data, status } = await fetchAPI({
      endpoint: URLS.getAllServices,
      method: "GET",
    });
    return { data, status };
  } catch (error: any) {
    throw error;
  }
};

const PostAddNewService = async ({ body }: { body: AddNewServiceFormType }) => {
  try {
    const { data, status } = await fetchAPI({
      endpoint: URLS.postAddService,
      method: "POST",
      body: body,
    });
    return { data, status };
  } catch (error: any) {
    throw error;
  }
};

const DeleteService = async ({ serviceId }: { serviceId: string }) => {
  try {
    const { data, status } = await fetchAPI({
      endpoint: URLS.deleteService(serviceId),
      method: "DELETE",
    });
    return { data, status };
  } catch (error: any) {
    throw error;
  }
};

export {
  GetAllServicesByShopId,
  GetAllServices,
  PostAddNewService,
  DeleteService,
};
