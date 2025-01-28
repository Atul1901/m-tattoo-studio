import { Box } from "@mui/material";
import React from "react";

type PropsType = {
  image: string;
  backgroundColor: string;
  className?: string;
  size?: number;
};

const IconCard = ({ backgroundColor, image, className, size }: PropsType) => {
  return (
    <Box
      className={`flex fdr jc-c ai-c ${className}`}
      sx={{ backgroundColor: backgroundColor }}
    >
      <img
        src={image}
        alt=""
        width={size ? size : 25}
        height={size ? size : 25}
      />
    </Box>
  );
};

export default IconCard;
