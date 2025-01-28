import { Box, Button, Paper, Typography } from "@mui/material";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import SalesTable from "../../../components/SalesTable/SalesTable";
import { GetAllSalesByShopId } from "../../../services/sales";
import { constants } from "../../../utils/constants/constants";
import { useGetDataByShopId } from "../../../utils/hooks/useGetDataByShopId";
import dayjs from "dayjs";
import { useState } from "react";
import { DateRangeStateType } from "../../../utils/types/types";
import CustomDateRange from "../../../components/CustomDateRange/CustomDateRange";
import { AppImages } from "../../../assets/assets";
import { IconCard } from "../../../components";

const Sales = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState<DateRangeStateType>({
    startDate: dayjs().startOf("day"),
    endDate: dayjs().endOf("day"),
  });
  const { data: allSalesByShopId, isLoading: allSalesByShopIdLoading } =
    useGetDataByShopId({
      queryFn: GetAllSalesByShopId,
      queryKey: constants.queryKeys.getAllSalesByShopId,
      startDate: dateRange?.startDate.format(constants.dateFormat.dateTime),
      endDate: dateRange?.endDate.format(constants.dateFormat.dateTime),
    });
  return (
    <Box className="flex fdc ai-c jc-c fullW g15">
      <Box className="flex fdr ai-c jc-sb fullW  mt5">
        <Box className="flex fdr jc-c ai-c g10">
          <IconCard
            backgroundColor={constants.colors.saleBgColor}
            image={AppImages.SaleIcon}
            size={20}
            className="p5 br5"
          />
          <Typography variant="h6" className="fw500">
            Sales
          </Typography>
        </Box>
        <CustomDateRange dateRange={dateRange} setDateRange={setDateRange} />
        <Button
          onClick={() => navigate(constants.routeNames.addNewSale)}
          variant="outlined"
          className="captilaize"
          color="primary"
          sx={{ textTransform: "capitalize" }}
        >
          Add Sale
        </Button>
      </Box>
      <Paper sx={{ height: 400, width: "100%" }}>
        <SalesTable
          data={
            allSalesByShopId && allSalesByShopId?.length > 0
              ? allSalesByShopId
              : []
          }
          loading={allSalesByShopIdLoading}
        />
      </Paper>
    </Box>
  );
};

export default Sales;
