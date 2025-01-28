import { Box, MenuItem, Select, Typography } from "@mui/material";
import StatsCard from "../../../components/StatsCard/StatsCard";
import { useThemeColors } from "../../../utils/hooks/useThemeColors";
import { useThemeIcons } from "../../../utils/hooks/useThemeIcons";
import { AppImages } from "../../../assets/assets";
import { ShopsDetails } from "../../../utils/redux/reducer/user-slice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { StatsCardInfoType } from "../../../utils/types/types";

type PropsType = {
  dashboardTodaysOverviewData: {
    [key: string]: number;
  };
  statCardsArray: StatsCardInfoType[];
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  loading?: boolean;
};

const DashboardTodaysOverview = ({
  dashboardTodaysOverviewData,
  statCardsArray,
  active,
  setActive,
  loading,
}: PropsType) => {
  const { themePrimaryColor } = useThemeColors();
  return (
    <Box
      className="flex fdr fwr jc-c ai-c fullW br10 g10"
      sx={{
        backgroundColor: themePrimaryColor,
        boxShadow: "2px 2px 5px #eaeaea",
      }}
    >
      <Box className="flex fdr jc-sb ai-c g10 fullW p15">
        <Box className="flex fdc ai-fs jc-fs g5">
          <Typography className="fw600 fs16">{"Today's Overview"}</Typography>
        </Box>
      </Box>
      <Box className="flex fdr jc-fs ai-c g30 fwr fullW px15 pb15">
        {statCardsArray?.map((item, index) => (
          <StatsCard
            key={index}
            title={item.title}
            image={item.image}
            backgroundColor={item.backgroundColor}
            percentage={item.percentage}
            type={item.type}
            value={dashboardTodaysOverviewData?.[item?.key]}
            unit={item.unit}
            comparedTo={item.comparedTo}
            active={active}
            setActive={setActive}
            cardKey={item.key}
            loading={loading}
          />
        ))}
      </Box>
    </Box>
  );
};

export default DashboardTodaysOverview;
