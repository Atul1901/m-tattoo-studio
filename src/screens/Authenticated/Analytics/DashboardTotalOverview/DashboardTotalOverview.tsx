import { Box, Typography } from "@mui/material";
import { AppImages } from "../../../../assets/assets";
import { useThemeColors } from "../../../../utils/hooks/useThemeColors";
import TotalOverviewCard from "./TotalOverviewCard";
import { constants } from "../../../../utils/constants/constants";

type StatsCardInfoType = {
  title: string;
  image: string;
  backgroundColor: string;
  percentage: string;
  type: "increase" | "decrease";
  value: number;
  unit: string;
  comparedTo: string;
  key: string;
};

type PropsType = {
  dashboardTotalOverviewData: {
    [key: string]: number;
  };
  loading?: boolean;
};

const DashboardTotalOverview = ({
  dashboardTotalOverviewData,
  loading,
}: PropsType) => {
  const { themePrimaryColor } = useThemeColors();
  return (
    <Box
      className="flex fdr fwr jc-c ai-c fullW br10 g5"
      sx={{
        backgroundColor: themePrimaryColor,
        boxShadow: "2px 2px 5px #eaeaea",
      }}
    >
      <Box className="flex fdr jc-sb ai-c g10 fullW p15">
        <Typography className="fw600 fs16">{"Total Overview"}</Typography>
      </Box>
      <Box className="flex fdr jc-fs ai-c g30 fwr fullW px15 pb25">
        {statCardsArray?.map((item, index) => (
          <TotalOverviewCard
            key={index}
            title={item.title}
            image={item.image}
            backgroundColor={item.backgroundColor}
            percentage={item.percentage}
            type={item.type}
            value={dashboardTotalOverviewData?.[item?.key]}
            unit={item.unit}
            comparedTo={item.comparedTo}
            loading={loading}
          />
        ))}
      </Box>
    </Box>
  );
};

const statCardsArray: StatsCardInfoType[] = [
  {
    title: "Total Customers",
    image: AppImages.PersonGroupIcon,
    backgroundColor: constants.colors.customerBgColor,
    percentage: "8.5%",
    type: "increase",
    value: 4,
    unit: "",
    key: "total_customers",
    comparedTo: "Up from last week",
  },
  {
    title: "Total Transactions",
    image: AppImages.OrderIcon,
    backgroundColor: constants.colors.appointmentBgColor,
    percentage: "1.3%",
    type: "increase",
    value: 5,
    unit: "",
    comparedTo: "Up from last week",
    key: "total_transactions",
  },
  {
    title: "Total Sales",
    image: AppImages.SaleIcon,
    backgroundColor: constants.colors.saleBgColor,
    percentage: "4.3%",
    type: "decrease",
    value: 89,
    unit: constants.currency,
    comparedTo: "Down from yesterday",
    key: "total_sales",
  },
  {
    title: "Total Appointments",
    image: AppImages.ClockIcon,
    backgroundColor: "rgba(255, 144, 102, 20%)",
    percentage: "1.8%",
    type: "increase",
    value: 2,
    unit: "",
    comparedTo: "Up from yesterday",
    key: "total_appointments",
  },
];

export default DashboardTotalOverview;
