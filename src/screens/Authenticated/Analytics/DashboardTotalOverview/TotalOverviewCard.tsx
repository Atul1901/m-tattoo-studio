import { Box, Typography } from "@mui/material";
import { useThemeColors } from "../../../../utils/hooks/useThemeColors";
import { IconCard } from "../../../../components";
import SkeletonLoader from "../../../../components/SkeletonLoader/SkeletonLoader";

type PropsType = {
  title: string;
  image: string;
  backgroundColor: string;
  percentage: string;
  type: "increase" | "decrease";
  value: number;
  unit: string;
  comparedTo: string;
  loading?: boolean;
};

const TotalOverviewCard = ({
  backgroundColor,
  image,
  title,
  comparedTo,
  percentage,
  type,
  unit,
  value,
  loading,
}: PropsType) => {
  const { themePrimaryColor } = useThemeColors();
  return (
    <Box
      className="flex fdc jc-c ai-c fullW br10 p15 g25"
      sx={{
        boxShadow: "5px 5px 10px #eaeaea , -5px -5px 10px #ffffff",
        backgroundColor: themePrimaryColor,
        maxWidth: 200,
      }}
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
          size={22}
        />
      </Box>
    </Box>
  );
};

export default TotalOverviewCard;
