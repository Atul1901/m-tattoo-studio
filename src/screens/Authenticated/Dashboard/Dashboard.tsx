import { Box, Button, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { GetAllAppointmentsByShopId } from "../../../services/appointments";
import { GetAllCustomersByShopId } from "../../../services/customers";
import { GetAllSalesByShopId } from "../../../services/sales";
import { constants } from "../../../utils/constants/constants";
import { useGetDataByShopId } from "../../../utils/hooks/useGetDataByShopId";
import { User } from "../../../utils/redux/reducer/user-slice";
import {
  DashboardQuickAddActions,
  DashboardTotalAppointment,
  DashboardTodaysOverview,
} from "./index";
import moment from "moment";
import { useState } from "react";
import { AppImages } from "../../../assets/assets";
import {
  AppointmentInfoType,
  CustomerInfoType,
  SaleInfoType,
  StatsCardInfoType,
} from "../../../utils/types/types";
import CustomerTable from "../../../components/CustomerTable/CustomerTable";
import AppointmentTable from "../../../components/AppointmentTable/AppointmentTable";
import SalesTable from "../../../components/SalesTable/SalesTable";
import { useNavigate } from "react-router-dom";

const statCardsArray: StatsCardInfoType[] = [
  {
    title: "New Customers",
    image: AppImages.PersonGroupIcon,
    backgroundColor: constants.colors.customerBgColor,
    percentage: "8.5%",
    type: "increase",
    value: 4,
    unit: "",
    comparedTo: "Up from last week",
    key: "new_customers",
    getComponent: ({
      data,
      loading,
    }: {
      data: CustomerInfoType[];
      loading: boolean;
    }) => <CustomerTable data={data} loading={loading} />,
  },
  {
    title: "Appointments",
    image: AppImages.ClockIcon,
    backgroundColor: "rgba(255, 144, 102, 20%)",
    percentage: "1.8%",
    type: "increase",
    value: 2,
    unit: "",
    comparedTo: "Up from yesterday",
    key: "appointments",
    getComponent: ({
      data,
      loading,
    }: {
      data: AppointmentInfoType[];
      loading: boolean;
    }) => <AppointmentTable data={data} loading={loading} />,
  },
  {
    title: "Sales",
    image: AppImages.SaleIcon,
    backgroundColor: "rgba(74, 217, 45, 20%)",
    percentage: "4.3%",
    type: "decrease",
    value: 89,
    unit: constants.currency,
    comparedTo: "Down from yesterday",
    key: "sales",
    getComponent: ({
      data,
      loading,
    }: {
      data: SaleInfoType[];
      loading: boolean;
    }) => <SalesTable data={data} loading={loading} />,
  },
  {
    title: "Transactions",
    image: AppImages.OrderIcon,
    backgroundColor: "rgba(254,197,61, 20%)",
    percentage: "1.3%",
    type: "increase",
    value: 5,
    unit: "",
    comparedTo: "Up from last week",
    key: "transactions",
    getComponent: ({
      data,
      loading,
    }: {
      data: SaleInfoType[];
      loading: boolean;
    }) => <SalesTable data={data} loading={loading} />,
  },
];

const Dashboard = () => {
  const [active, setActive] = useState<string>("new_customers");
  const navigate = useNavigate();
  const user = useSelector(User);
  const { data: allCustomersByShopId, isLoading: allCustomersByShopIdLoading } =
    useGetDataByShopId({
      queryFn: GetAllCustomersByShopId,
      queryKey: constants.queryKeys.getAllCustomersByShopId,
      startDate: moment().startOf("day").format(constants.dateFormat.dateTime),
      endDate: moment().endOf("day").format(constants.dateFormat.dateTime),
    });
  const { data: allSalesByShopId, isLoading: allSalesByShopIdLoading } =
    useGetDataByShopId({
      queryFn: GetAllSalesByShopId,
      queryKey: constants.queryKeys.getAllSalesByShopId,
      startDate: moment().startOf("day").format(constants.dateFormat.dateTime),
      endDate: moment().endOf("day").format(constants.dateFormat.dateTime),
    });
  const {
    data: allAppointmentsByShopId,
    isLoading: allAppointmentsByShopIdLoading,
  } = useGetDataByShopId({
    queryFn: GetAllAppointmentsByShopId,
    queryKey: constants.queryKeys.getAllAppointmentsByShopId,
    startDate: moment().startOf("day").format(constants.dateFormat.dateTime),
    endDate: moment().endOf("day").format(constants.dateFormat.dateTime),
  });

  const dashboardTodaysOverviewData = {
    new_customers: allCustomersByShopId?.length!,
    sales:
      allSalesByShopId && allSalesByShopId?.length > 0
        ? allSalesByShopId?.reduce(
            (total, item) => total + item?.amount! || 0,
            0
          )
        : 0,
    appointments: allAppointmentsByShopId?.length!,
    transactions: allSalesByShopId?.length!,
  };

  return (
    <>
      <Box className="flex fdc ai-fs jc-fs g5 fullW">
        <Typography variant="h6" className="fw500">
          Dashboard
        </Typography>
        <Typography variant="body2" className="opa8 fw400">
          Hi {user.username} , Welcome back to portal
        </Typography>
      </Box>
      <DashboardTodaysOverview
        dashboardTodaysOverviewData={dashboardTodaysOverviewData}
        statCardsArray={statCardsArray}
        active={active}
        setActive={setActive}
        loading={
          allCustomersByShopIdLoading ||
          allSalesByShopIdLoading ||
          allAppointmentsByShopIdLoading
        }
      />
      <Paper sx={{ height: 400, width: "100%" }}>
        {active === "new_customers" ? (
          <CustomerTable
            data={
              allCustomersByShopId && allCustomersByShopId?.length > 0
                ? allCustomersByShopId?.slice(0, 5)
                : []
            }
            loading={allAppointmentsByShopIdLoading}
            hideCheckbox={true}
            hideActionsColumn={true}
          />
        ) : active === "appointments" ? (
          <AppointmentTable
            data={
              allAppointmentsByShopId && allAppointmentsByShopId?.length > 0
                ? allAppointmentsByShopId?.slice(0, 5)
                : []
            }
            loading={allAppointmentsByShopIdLoading}
            hideCheckbox={true}
            hideActionsColumn={true}
          />
        ) : active === "sales" ? (
          <SalesTable
            data={
              allSalesByShopId && allSalesByShopId?.length > 0
                ? allSalesByShopId?.slice(0, 5)
                : []
            }
            loading={allSalesByShopIdLoading}
            hideCheckbox={true}
            hideActionsColumn={true}
          />
        ) : active === "transactions" ? (
          <SalesTable
            data={
              allSalesByShopId && allSalesByShopId?.length > 0
                ? allSalesByShopId?.slice(0, 5)
                : []
            }
            loading={allSalesByShopIdLoading}
            hideCheckbox={true}
            hideActionsColumn={true}
          />
        ) : null}
      </Paper>
      <Box className="fullW flex fdr jc-c ai-c">
        <Button
          onClick={() =>
            navigate(
              active === "new_customers"
                ? constants.routeNames.customers
                : active === "appointments"
                ? constants.routeNames.appointments
                : active === "sales"
                ? constants.routeNames.sales
                : active === "transactions"
                ? constants.routeNames.sales
                : constants.routeNames.dashboard
            )
          }
          variant="outlined"
          className="captilaize"
          color="primary"
          sx={{ textTransform: "capitalize" }}
        >
          View All
        </Button>
      </Box>
      <DashboardQuickAddActions />
    </>
  );
};

export default Dashboard;
