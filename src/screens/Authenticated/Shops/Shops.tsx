import { Box, Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ShopsTable from "../../../components/ShopsTable/ShopsTable";
import { constants } from "../../../utils/constants/constants";
import { useGetAllShops } from "../../../utils/hooks/useGetAllShops";
import { AppImages } from "../../../assets/assets";
import { IconCard } from "../../../components";

const Shops = () => {
  const navigate = useNavigate();
  const { allShops, allShopsLoading } = useGetAllShops();

  return (
    <Box className="flex fdc ai-c jc-c fullW g15">
      <Box className="flex fdr ai-c jc-sb fullW mt5">
        <Box className="flex fdr jc-c ai-c g10">
          <IconCard
            backgroundColor={constants.colors.shopBgColor}
            image={AppImages.ShopIcon}
            size={20}
            className="p5 br5"
          />
          <Typography variant="h6" className="fw500">
            Shops
          </Typography>
        </Box>
        <Button
          onClick={() =>
            navigate(constants.routeNames.addNewShop, {
              state: { isEdit: false },
            })
          }
          variant="outlined"
          className="captilaize"
          color="primary"
          sx={{ textTransform: "capitalize" }}
        >
          Add Shop
        </Button>
      </Box>
      <Paper sx={{ height: 400, width: "100%" }}>
        <ShopsTable
          data={allShops && allShops?.length > 0 ? allShops : []}
          loading={allShopsLoading}
        />
      </Paper>
    </Box>
  );
};

export default Shops;
