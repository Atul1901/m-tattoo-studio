import { URLS } from "../../utils/constants/urls";
import { fetchAPI } from "../../utils/fetch/fetchAPI";
import { AddNewShopFormType } from "../../utils/types/types";
import { GetAllShopsResponse, ShopResponse } from "./interface";

const ShopsDetailsApi = async (params: [string]): Promise<ShopResponse> => {
  const bodyRequest = {
    shopIds: params,
  };
  try {
    const { data, status } = await fetchAPI({
      endpoint: URLS.shopsDetails,
      method: "POST",
      body: bodyRequest,
      // isErrorShow: false,
    });
    return { data, status };
  } catch (error: any) {
    throw error;
  }
};

const GetAllShops = async (): Promise<GetAllShopsResponse> => {
  try {
    const { data, status } = await fetchAPI({
      endpoint: URLS.getAllShops,
      method: "GET",
    });
    return { data, status };
  } catch (error: any) {
    throw error;
  }
};

const PostAddNewShop = async ({ body }: { body: AddNewShopFormType }) => {
  try {
    const { data, status } = await fetchAPI({
      endpoint: URLS.postAddShop,
      method: "POST",
      body: body,
    });
    return { data, status };
  } catch (error: any) {
    throw error;
  }
};

const PutEditShop = async ({
  body,
  shopId,
}: {
  body: AddNewShopFormType;
  shopId: string;
}) => {
  try {
    const { data, status } = await fetchAPI({
      endpoint: URLS.putEditShop(shopId),
      method: "PUT",
      body: body,
    });
    return { data, status };
  } catch (error: any) {
    throw error;
  }
};

const DeleteShop = async ({ shopId }: { shopId: string }) => {
  try {
    const { data, status } = await fetchAPI({
      endpoint: URLS.deleteShop(shopId),
      method: "DELETE",
    });
    return { data, status };
  } catch (error: any) {
    throw error;
  }
};

export {
  GetAllShops,
  ShopsDetailsApi,
  PostAddNewShop,
  PutEditShop,
  DeleteShop,
};
