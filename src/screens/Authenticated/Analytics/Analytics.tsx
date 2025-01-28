import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { GetAllAppointmentsByShopId } from "../../../services/appointments";
import { GetAllCustomersByShopId } from "../../../services/customers";
import { GetAllSalesByShopId } from "../../../services/sales";
import { constants } from "../../../utils/constants/constants";
import { useGetDataByShopId } from "../../../utils/hooks/useGetDataByShopId";
import { User } from "../../../utils/redux/reducer/user-slice";
import DashboardTotalOverview from "./DashboardTotalOverview/DashboardTotalOverview";

const Analytics = () => {
  const user = useSelector(User);
  const { data: allCustomersByShopId, isLoading: allCustomersByShopIdLoading } =
    useGetDataByShopId({
      queryFn: GetAllCustomersByShopId,
      queryKey: constants.queryKeys.getAllCustomersByShopId,
    });
  const { data: allSalesByShopId, isLoading: allSalesByShopIdLoading } =
    useGetDataByShopId({
      queryFn: GetAllSalesByShopId,
      queryKey: constants.queryKeys.getAllSalesByShopId,
    });
  const {
    data: allAppointmentsByShopId,
    isLoading: allAppointmentsByShopIdLoading,
  } = useGetDataByShopId({
    queryFn: GetAllAppointmentsByShopId,
    queryKey: constants.queryKeys.getAllAppointmentsByShopId,
  });

  const dashboardTotalOverviewData = {
    total_customers: allCustomersByShopId?.length!,
    total_sales:
      allSalesByShopId && allSalesByShopId?.length > 0
        ? allSalesByShopId?.reduce(
            (total, item) => total + item?.amount! || 0,
            0
          )
        : 0,
    total_appointments: allAppointmentsByShopId?.length!,
    total_transactions: allSalesByShopId?.length!,
  };

  return (
    <>
      <DashboardTotalOverview
        dashboardTotalOverviewData={dashboardTotalOverviewData}
        loading={
          allCustomersByShopIdLoading ||
          allSalesByShopIdLoading ||
          allAppointmentsByShopIdLoading
        }
      />
    </>
  );
};

export default Analytics;
