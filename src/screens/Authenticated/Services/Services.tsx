import { Box, Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { constants } from "../../../utils/constants/constants";
import { useGetAllServices } from "../../../utils/hooks/useGetAllServices";
import ServicesTable from "../../../components/ServiceTable/ServiceTable";
import { IconCard } from "../../../components";
import { AppImages } from "../../../assets/assets";
import { useSelector } from "react-redux";
import { User } from "../../../utils/redux/reducer/user-slice";
import Checkbox from "@mui/material/Checkbox";
import { useEffect, useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ServiceInfoType } from "../../../utils/types/types";
import { HttpStatus } from "../../../utils/fetch/fetchAPI";
import {
  GetAllServices,
  GetAllServicesByShopId,
} from "../../../services/services";
import { SelectedShopId } from "../../../utils/redux/reducer/appState-slice";
import { useQuery } from "@tanstack/react-query";

const Services = () => {
  const navigate = useNavigate();
  const { role } = useSelector(User);
  const [servicesData, setServicesData] = useState<ServiceInfoType[]>([]);
  const [servicesDataLoading, setServicesDataLoading] =
    useState<boolean>(false);
  const [showAllServices, setShowAllServices] = useState<boolean>(false);
  const shopId = useSelector(SelectedShopId);

  const fetchAllServicesData = async () => {
    setServicesDataLoading(true);
    try {
      const { data, status } = await GetAllServices();
      if (status === HttpStatus.OK) {
        setServicesData(data ? data : ([] as ServiceInfoType[]));
      }
    } catch (error: any) {
      setServicesData([]);
    } finally {
      setServicesDataLoading(false);
    }
  };

  const fetchServicesByShopIdData = async () => {
    setServicesDataLoading(true);
    try {
      const { data, status } = await GetAllServicesByShopId({
        shopId: shopId,
      });
      if (status === HttpStatus.OK) {
        setServicesData(data ? data : ([] as ServiceInfoType[]));
      }
    } catch (error: any) {
      setServicesData([]);
    } finally {
      setServicesDataLoading(false);
    }
  };

  useEffect(() => {
    if (showAllServices && role === constants.roles.super_admin) {
      fetchAllServicesData();
    } else if (!showAllServices && shopId) {
      fetchServicesByShopIdData();
    }
  }, [showAllServices, shopId, role]);

  return (
    <Box className="flex fdc ai-c jc-c fullW g15">
      <Box className="flex fdr ai-c jc-sb fullW mt5">
        <Box className="flex fdr jc-c ai-c g10">
          <IconCard
            backgroundColor={constants.colors.serviceBgColor}
            image={AppImages.OrderIcon}
            size={20}
            className="p5 br5"
          />
          <Typography variant="h6" className="fw500">
            Services
          </Typography>
        </Box>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          {role === constants.roles.super_admin && (
            <>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showAllServices}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setShowAllServices(event?.target?.checked)
                    }
                  />
                }
                label="Show All Shop Services"
              />
              <Button
                onClick={() => navigate(constants.routeNames.addNewService)}
                variant="outlined"
                className="captilaize"
                color="primary"
                sx={{ textTransform: "capitalize" }}
              >
                Add Service
              </Button>
            </>
          )}
        </div>
      </Box>
      <Paper sx={{ height: 400, width: "100%" }}>
        <ServicesTable
          data={servicesData && servicesData?.length > 0 ? servicesData : []}
          loading={servicesDataLoading}
        />
      </Paper>
    </Box>
  );
};

export default Services;
