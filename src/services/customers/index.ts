import { GetAllCustomersByShopIdResponseType } from "./interface";
import { fetchAPI } from "../../utils/fetch/fetchAPI";
import { URLS } from "../../utils/constants/urls";
import { AddNewCustomerFormType } from "../../utils/types/types";

const GetAllCustomersByShopId = async (params: {
  shopId?: string | null;
  startDate?: string | null;
  endDate?: string | null;
}): Promise<GetAllCustomersByShopIdResponseType> => {
  try {
    const { data, status } = await fetchAPI({
      endpoint: URLS.getAllCustomersByShopId,
      method: "GET",
      params: params,
    });
    return { data, status };
  } catch (error: any) {
    throw error;
  }
};

const PostAddNewCustomer = async ({
  body,
  shopId,
}: {
  body: AddNewCustomerFormType;
  shopId: string;
}) => {
  try {
    const { data, status } = await fetchAPI({
      endpoint: URLS.postAddCustomer,
      method: "POST",
      body: {
        ...body,
        onboardedShopId: shopId,
      },
    });
    return { data, status };
  } catch (error: any) {
    throw error;
  }
};

const PutEditCustomer = async ({
  body,
  shopId,
  customerId,
}: {
  body: AddNewCustomerFormType;
  shopId: string;
  customerId: string;
}) => {
  try {
    const { data, status } = await fetchAPI({
      endpoint: URLS.putEditCustomer(customerId),
      method: "PUT",
      body: {
        ...body,
        onboardedShopId: shopId,
      },
    });
    return { data, status };
  } catch (error: any) {
    throw error;
  }
};

const DeleteCustomer = async ({ customerId }: { customerId: string }) => {
  try {
    const { data, status } = await fetchAPI({
      endpoint: URLS.deleteCustomer(customerId),
      method: "DELETE",
    });
    return { data, status };
  } catch (error: any) {
    throw error;
  }
};

export {
  GetAllCustomersByShopId,
  PostAddNewCustomer,
  PutEditCustomer,
  DeleteCustomer,
};
