import { AppointmentInfoType } from "../../utils/types/types";

interface GetAllAppointmentsByShopIdResponseType {
  status: number;
  data: Array<AppointmentInfoType>;
}

export type { GetAllAppointmentsByShopIdResponseType };
