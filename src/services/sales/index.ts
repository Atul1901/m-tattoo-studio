import { GetAllSalesByShopIdResponseType } from "./interface";
import { fetchAPI } from "../../utils/fetch/fetchAPI";
import { URLS } from "../../utils/constants/urls";
import { AddNewSaleFormType } from "../../utils/types/types";

const GetAllSalesByShopId = async (params: {
  shopId?: string | null;
  startDate?: string | null;
  endDate?: string | null;
}): Promise<GetAllSalesByShopIdResponseType> => {
  try {
    const { data, status } = await fetchAPI({
      endpoint: URLS.getAllSalesByShopId,
      method: "GET",
      params: params,
    });
    return { data, status };
  } catch (error: any) {
    throw error;
  }
};

const PostAddNewSale = async ({ body }: { body: AddNewSaleFormType }) => {
  try {
    const { data, status } = await fetchAPI({
      endpoint: URLS.postAddSale,
      method: "POST",
      body: body,
    });
    return { data, status };
  } catch (error: any) {
    throw error;
  }
};

const DeleteSale = async ({ saleId }: { saleId: string }) => {
  try {
    const { data, status } = await fetchAPI({
      endpoint: URLS.deleteSale(saleId),
      method: "DELETE",
    });
    return { data, status };
  } catch (error: any) {
    throw error;
  }
};

export { GetAllSalesByShopId, PostAddNewSale, DeleteSale };
