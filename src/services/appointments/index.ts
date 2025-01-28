import { GetAllAppointmentsByShopIdResponseType } from "./interface";
import { fetchAPI } from "../../utils/fetch/fetchAPI";
import { URLS } from "../../utils/constants/urls";
import { AddNewAppointmentFormType } from "../../utils/types/types";

const GetAllAppointmentsByShopId = async (params: {
  shopId?: string | null;
  startDate?: string | null;
  endDate?: string | null;
}): Promise<GetAllAppointmentsByShopIdResponseType> => {
  try {
    const { data, status } = await fetchAPI({
      endpoint: URLS.getAllAppointmentsByShopId,
      method: "GET",
      params: params,
    });
    return { data, status };
  } catch (error: any) {
    throw error;
  }
};

const PostAddNewAppointment = async ({
  body,
}: {
  body: AddNewAppointmentFormType;
}) => {
  try {
    const { data, status } = await fetchAPI({
      endpoint: URLS.postAddAppointment,
      method: "POST",
      body: body,
    });
    return { data, status };
  } catch (error: any) {
    throw error;
  }
};

const PutEditAppointment = async ({
  body,
  appointmentId,
}: {
  body: AddNewAppointmentFormType;
  appointmentId: string;
}) => {
  try {
    const { data, status } = await fetchAPI({
      endpoint: URLS.putEditAppointment(appointmentId),
      method: "PUT",
      body: body,
    });
    return { data, status };
  } catch (error: any) {
    throw error;
  }
};

const DeleteAppointment = async ({
  appointmentId,
}: {
  appointmentId: string;
}) => {
  try {
    const { data, status } = await fetchAPI({
      endpoint: URLS.deleteAppointment(appointmentId),
      method: "DELETE",
    });
    return { data, status };
  } catch (error: any) {
    throw error;
  }
};

export {
  GetAllAppointmentsByShopId,
  PostAddNewAppointment,
  PutEditAppointment,
  DeleteAppointment,
};
