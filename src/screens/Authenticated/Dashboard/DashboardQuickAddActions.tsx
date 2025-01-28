import { Box, Typography } from "@mui/material";
import { AppImages } from "../../../assets/assets";
import QuickAddActionCard from "../../../components/QuickAddActionCard/QuickAddActionCard";
import { useThemeColors } from "../../../utils/hooks/useThemeColors";
import { constants } from "../../../utils/constants/constants";
import { Link } from "react-router-dom";

type QuickAddActionInfoType = {
  title: string;
  image: string;
  backgroundColor: string;
  route?: string;
};

const DashboardQuickAddActions = () => {
  const { themePrimaryColor, themeSecondaryColor } = useThemeColors();
  return (
    <Box
      className="flex fdr fwr jc-c ai-c fullW br10 "
      sx={{
        backgroundColor: themePrimaryColor,
        boxShadow: "2px 2px 5px #eaeaea",
      }}
    >
      <Box className="flex fdr jc-sb ai-c g10 fullW p15">
        <Box className="flex fdc ai-fs jc-fs g5">
          <Typography className="fw600 fs16">{"Quick Add Actions"}</Typography>
        </Box>
      </Box>
      <Box className="flex fdr jc-sb ai-c g30 fwr fullW px15 pb15">
        {QuickActionCardsDataArray?.map(
          ({ title, backgroundColor, image, route }, index) => (
            <Link
              key={index}
              to={route || ""}
              style={{ textDecoration: "none", color: themeSecondaryColor }}
            >
              <QuickAddActionCard
                key={index}
                title={title}
                backgroundColor={backgroundColor}
                image={image}
              />
            </Link>
          )
        )}
      </Box>
    </Box>
  );
};

const QuickActionCardsDataArray: QuickAddActionInfoType[] = [
  {
    title: "New Customer",
    image: AppImages.PersonIcon,
    backgroundColor: constants.colors.customerBgColor,
    route: constants.routeNames.addNewCustomer,
  },
  {
    title: "New Appointment",
    image: AppImages.ClockIcon,
    backgroundColor: "rgba(255, 128, 128, 20%)",
    route: constants.routeNames.addNewAppointment,
  },
  {
    title: "New Sale",
    image: AppImages.SaleIcon,
    backgroundColor: constants.colors.saleBgColor,
    route: constants.routeNames.addNewSale,
  },
];

export default DashboardQuickAddActions;
