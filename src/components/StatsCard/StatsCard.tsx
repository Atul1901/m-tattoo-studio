import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { lightTheme } from "../../utils/styles/theme";
import themeStyles from "../../utils/styles/styles";
import { useThemeColors } from "../../utils/hooks/useThemeColors";
import { AppImages } from "../../assets/assets";
import IconCard from "../IconCard/IconCard";
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader";
import { useSelector } from "react-redux";
import { SelectedShopId } from "../../utils/redux/reducer/appState-slice";
interface StatsCardProps {}

type PropsType = {
  title: string;
  image: string;
  backgroundColor: string;
  percentage: string;
  type: "increase" | "decrease";
  value: number;
  unit: string;
  comparedTo: string;
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  cardKey: string;
  loading?: boolean;
};

const StatsCard = ({
  backgroundColor,
  image,
  title,
  comparedTo,
  percentage,
  type,
  unit,
  value,
  active,
  setActive,
  cardKey,
  loading,
}: PropsType) => {
  const { themePrimaryColor } = useThemeColors();
  const shopId = useSelector(SelectedShopId);
  return (
    <Box
      className="flex fdc jc-c ai-c fullW br10 p15 g25 cursor-pointer"
      sx={{
        boxShadow:
          cardKey === active
            ? "3px 3px 6px lightblue , -5px -5px 10px #eaeaea"
            : "5px 5px 10px #eaeaea , -5px -5px 10px #ffffff",
        backgroundColor: themePrimaryColor,
        // border: cardKey === active ? "2px solid lightblue" : "",
        maxWidth: 200,
        cursor: "pointer",
      }}
      onClick={() => setActive(cardKey)}
    >
      <Box className="flex fullW fdr jc-sb ai-c g10">
        <Box className="flex fdc jc-fs ai-fs g20">
          <Typography className="fw500 fs14 opa7">{title}</Typography>
          {!loading ? (
            <Typography className="fw500" sx={{ fontSize: 26 }}>{`${
              unit ? unit : ""
            } ${value ? value : 0}`}</Typography>
          ) : (
            <SkeletonLoader
              viewStyle={{ width: 100, height: 40, borderRadius: 6 }}
            />
          )}
        </Box>
        <IconCard
          image={image}
          backgroundColor={backgroundColor}
          className="p10 br15"
          size={20}
        />
      </Box>
      {/* <Box className="flex fdr jc-fs ai-c fullW g5">
        <Typography
          className="fs14 fw500"
          sx={{ color: type === "increase" ? "#00B69B" : "#F93C65" }}
        >
          {percentage}
          {}
        </Typography>
        <Typography className="fs12">{comparedTo}</Typography>
        <Typography className="fs12">{}</Typography>
      </Box> */}
    </Box>
  );
};

export default StatsCard;
