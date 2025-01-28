import React, { FC, SyntheticEvent } from "react";
import { Box, Snackbar, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import {
  hideNotification,
  IsNotificationOpen,
  NotificationMessage,
  Severity,
} from "../../utils/redux";

interface NotificationProps {}

const Notification: FC<NotificationProps> = () => {
  const isOpen = useSelector(IsNotificationOpen);
  const severity = useSelector(Severity);
  const message = useSelector(NotificationMessage);
  const dispatch = useDispatch();
  let color = "#5AB9F9";
  if (severity === "warning") {
    color = "#F4D556";
  } else if (severity === "error") {
    color = "#EB0000";
  }
  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(hideNotification());
  };
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      open={isOpen}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Stack
        direction={"column"}
        minHeight={"100px"}
        minWidth={"200px"}
        sx={{
          flexDirection: "column",
          borderRadius: "15px",
          border: `1px solid ${color}`,
          background: "white",
        }}
      >
        <Box
          sx={{
            background: `${color}`,
            borderRadius: `15px 15px 0px 0px`,
            padding: "3% 5%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: "14px",
              color: "white",
              textTransform: "uppercase",
            }}
          >
            {severity}
          </Typography>
          <CloseIcon
            onClick={handleClose}
            sx={{ color: "white", cursor: "pointer" }}
          />
        </Box>
        <Box padding={"5%"}>
          <Typography variant="h6" sx={{ fontSize: "12px" }}>
            {message}
          </Typography>
        </Box>
      </Stack>
    </Snackbar>
  );
};

export default Notification;
