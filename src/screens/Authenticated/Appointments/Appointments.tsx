import { Box, Button, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppointmentTable from "../../../components/AppointmentTable/AppointmentTable";
import CustomDateRange from "../../../components/CustomDateRange/CustomDateRange";
import { GetAllAppointmentsByShopId } from "../../../services/appointments";
import { constants } from "../../../utils/constants/constants";
import { useGetDataByShopId } from "../../../utils/hooks/useGetDataByShopId";
import { DateRangeStateType } from "../../../utils/types/types";
import { AppImages } from "../../../assets/assets";
import { IconCard } from "../../../components";

const Appointments = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState<DateRangeStateType>({
    startDate: dayjs().startOf("day"),
    endDate: dayjs().endOf("day"),
  });
  const {
    data: allAppointmentsByShopId,
    isLoading: allAppointmentsByShopIdLoading,
  } = useGetDataByShopId({
    queryFn: GetAllAppointmentsByShopId,
    queryKey: constants.queryKeys.getAllAppointmentsByShopId,
    startDate: dateRange?.startDate.format(constants.dateFormat.dateTime),
    endDate: dateRange?.endDate.format(constants.dateFormat.dateTime),
  });
  return (
    <Box className="flex fdc ai-c jc-c fullW g15">
      <Box className="flex fdr ai-c jc-sb fullW  mt5">
        <Box className="flex fdr jc-c ai-c g10">
          <IconCard
            backgroundColor={constants.colors.appointmentBgColor}
            image={AppImages.OrderIcon}
            size={20}
            className="p5 br5"
          />
          <Typography variant="h6" className="fw500">
            Appointments{" "}
          </Typography>
        </Box>
        <CustomDateRange dateRange={dateRange} setDateRange={setDateRange} />
        <Button
          onClick={() =>
            navigate(constants.routeNames.addNewAppointment, {
              state: {
                isEdit: false,
              },
            })
          }
          variant="outlined"
          className="captilaize"
          color="primary"
          sx={{ textTransform: "capitalize" }}
        >
          Add Appointment
        </Button>
      </Box>
      <Paper sx={{ height: 400, width: "100%" }}>
        <AppointmentTable
          data={
            allAppointmentsByShopId && allAppointmentsByShopId?.length > 0
              ? allAppointmentsByShopId
              : []
          }
          loading={allAppointmentsByShopIdLoading}
        />
      </Paper>
    </Box>
  );
};

export default Appointments;
