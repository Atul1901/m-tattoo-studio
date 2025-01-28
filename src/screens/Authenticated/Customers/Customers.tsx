import { Box, Button, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomDateRange from "../../../components/CustomDateRange/CustomDateRange";
import CustomerTable from "../../../components/CustomerTable/CustomerTable";
import { GetAllCustomersByShopId } from "../../../services/customers";
import { constants } from "../../../utils/constants/constants";
import { useGetDataByShopId } from "../../../utils/hooks/useGetDataByShopId";
import { DateRangeStateType } from "../../../utils/types/types";
import { IconCard } from "../../../components";
import { AppImages } from "../../../assets/assets";

const Customers = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState<DateRangeStateType>({
    startDate: dayjs().startOf("day"),
    endDate: dayjs().endOf("day"),
  });
  const { data: allCustomersByShopId, isLoading: allCustomersByShopIdLoading } =
    useGetDataByShopId({
      queryFn: GetAllCustomersByShopId,
      queryKey: constants.queryKeys.getAllCustomersByShopId,
      startDate: dateRange?.startDate.format(constants.dateFormat.dateTime),
      endDate: dateRange?.endDate.format(constants.dateFormat.dateTime),
    });

  return (
    <Box className="flex fdc ai-c jc-c fullW g15">
      <Box className="flex fdr ai-c jc-sb fullW  mt5">
        <Box className="flex fdr jc-c ai-c g10">
          <IconCard
            backgroundColor={constants.colors.customerBgColor}
            image={AppImages.PersonGroupIcon}
            size={20}
            className="p5 br5"
          />
          <Typography variant="h6" className="fw500">
            Customers
          </Typography>
        </Box>
        <CustomDateRange dateRange={dateRange} setDateRange={setDateRange} />
        <Button
          onClick={() =>
            navigate(constants.routeNames.addNewCustomer, {
              state: { isEdit: false },
            })
          }
          variant="outlined"
          className="captilaize"
          color="primary"
          sx={{ textTransform: "capitalize" }}
        >
          Add Customer
        </Button>
      </Box>
      <Paper sx={{ height: 400, width: "100%" }}>
        <CustomerTable
          data={
            allCustomersByShopId && allCustomersByShopId?.length > 0
              ? allCustomersByShopId
              : []
          }
          loading={allCustomersByShopIdLoading}
        />
      </Paper>
    </Box>
  );
};

export default Customers;
