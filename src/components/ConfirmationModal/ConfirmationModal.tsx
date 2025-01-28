import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";
import { useThemeColors } from "../../utils/hooks/useThemeColors";

type PropsType = {
  openConfirmModal: boolean;
  setOpenConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
  onYes: () => void;
  title: string;
};

const ConfirmationModal = ({
  onYes,
  openConfirmModal,
  setOpenConfirmModal,
  title,
}: PropsType) => {
  const { themePrimaryColor, themeSecondaryColor, primary } = useThemeColors();
  return (
    <Dialog open={openConfirmModal} onClose={() => setOpenConfirmModal(false)}>
      <DialogTitle>
        <Typography className="fw500 fs18" style={{ textAlign: "center" }}>
          {title}
        </Typography>
      </DialogTitle>
      <DialogActions
        style={{
          display: "flex",
          gap: 10,
          justifyContent: "space-between",
          marginBottom: 5,
          marginRight: 10,
          marginLeft: 10,
        }}
      >
        <Button
          variant="contained"
          onClick={() => setOpenConfirmModal(false)}
          style={{
            backgroundColor: themePrimaryColor,
            textTransform: "capitalize",
            color: themeSecondaryColor,
          }}
        >
          No
        </Button>
        <Button
          variant="contained"
          style={{
            backgroundColor: primary,
            textTransform: "capitalize",
          }}
          onClick={() => {
            setOpenConfirmModal(false);
            onYes();
          }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
