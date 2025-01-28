import { Box, Typography } from "@mui/material";
import { useThemeColors } from "../../utils/hooks/useThemeColors";
import IconCard from "../IconCard/IconCard";

type PropsType = {
  title: string;
  image: string;
  backgroundColor: string;
};

const QuickAddActionCard = ({ backgroundColor, image, title }: PropsType) => {
  const { themePrimaryColor } = useThemeColors();
  return (
    <Box
      className="flex fdr jc-sb ai-c p15 "
      sx={[
        {
          boxShadow: "5px 5px 10px #eaeaea , -5px -5px 10px #ffffff",
          backgroundColor: themePrimaryColor,
          minWidth: 250,
          borderTopLeftRadius: 30,
          borderBottomRightRadius: 30,
        },
      ]}
    >
      <Typography className="fs14">{title}</Typography>
      <IconCard
        image={image}
        backgroundColor={backgroundColor}
        className="p10 br35"
        size={15}
      />
    </Box>
  );
};

export default QuickAddActionCard;
