import { Grid2 } from "@mui/material";
import React from "react";
import { images } from "../../utils/constants/images";

const GuestSidePanel = () => {
  return (
    <Grid2
      display={{
        xs: "none",
        sm: "none",
        md: "block",
      }}
      size={7}
      sx={{
        backgroundImage: `url(${images.loginBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
};

export default GuestSidePanel;
