import { Box, Grid2, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { images } from "../../../utils/constants/images";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../utils/constants/routes";
import {
  Authenticated,
  setAuthentication,
  showNotification,
} from "../../../utils/redux";
import { useDispatch, useSelector } from "react-redux";
import GuestSidePanel from "../../../components/GuestSidePanel/GuestSidePanel";

const commonSlotProps = {
  input: {
    style: { fontSize: 14 },
  },
  inputLabel: {
    style: { fontSize: 14 },
  },
};

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  width: "100%",
  color: "white",
  backgroundColor: "rgb(32, 27, 27) ",
  "&:hover": {
    backgroundColor: "rgb(19, 18, 18)",
  },
  marginTop: "20px",
}));

const ForgotPassword = () => {
  const isAuthenticated = useSelector(Authenticated);
  const dispatch = useDispatch();
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [email, setEmail] = useState({ value: "", error: false });
  const [verficationData, setVerficationData] = useState({
    password: "",
    confirm_password: "",
    otp: "",
    passwordError: false,
    confirmPasswordError: false,
    otpError: false,
  });

  const navigate = useNavigate();

  const handleEmailInput = (value: string) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    setEmail({
      value,
      error: !!(!emailPattern.test(value) || value.length === 0),
    });
  };

  const handleInputChange = (
    field: string,
    value: string,
    errorField: string
  ) => {
    setVerficationData({
      ...verficationData,
      [field]: value,
      [errorField]: value.length === 0,
    });
  };

  const handleForgotPassword = () => {
    try {
      if (verficationData.otp.length === 0) {
        setVerficationData({ ...verficationData, otpError: true });
        return;
      }
      if (verficationData.password.length === 0) {
        setVerficationData({ ...verficationData, passwordError: true });
        return;
      }

      if (verficationData.confirm_password.length === 0) {
        setVerficationData({ ...verficationData, confirmPasswordError: true });
        return;
      }

      if (verficationData.password !== verficationData.confirm_password) {
        dispatch(
          showNotification({
            severity: "error",
            message: "Password do not match!",
          })
        );
        return;
      }
      // add api call here to set new password
      // dispatch(setAuthentication("pass_token_here"));
      navigate(routes.dashboard);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.dashboard);
    }
  }, []);

  return (
    <Box>
      <Grid2 height={"100vh"} container>
        <GuestSidePanel />
        <Grid2 size={{ xs: 12, sm: 12, md: 5 }}>
          <Box className="auth-container">
            <Box className="auth-child-container">
              <img
                alt="logo"
                src={images.logo}
                className="authentication-logo"
              />
              <Typography
                fontWeight={"600"}
                fontSize={24}
                color="rgb(32, 27, 27)"
              >
                Forgot Password
              </Typography>

              {showOtpInput ? (
                <Box>
                  <TextField
                    value={verficationData.otp}
                    fullWidth
                    size="small"
                    className="login-input"
                    onChange={(e) => {
                      handleInputChange("otp", e.target.value, "otpError");
                    }}
                    id="outlined-basic"
                    label="OTP"
                    variant="outlined"
                    slotProps={{ ...commonSlotProps }}
                    error={verficationData.otpError}
                    helperText={
                      verficationData.otpError ? "Please enter otp" : ""
                    }
                  />
                  <TextField
                    value={verficationData.password}
                    fullWidth
                    size="small"
                    className="login-input"
                    onChange={(e) => {
                      handleInputChange(
                        "password",
                        e.target.value,
                        "passwordError"
                      );
                    }}
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    slotProps={{ ...commonSlotProps }}
                    error={verficationData.passwordError}
                    helperText={
                      verficationData.otpError ? "Please enter password" : ""
                    }
                  />
                  <TextField
                    value={verficationData.confirm_password}
                    fullWidth
                    size="small"
                    className="login-input"
                    onChange={(e) => {
                      handleInputChange(
                        "confirm_password",
                        e.target.value,
                        "confirmPasswordError"
                      );
                    }}
                    slotProps={{ ...commonSlotProps }}
                    id="outlined-basic"
                    label="Confirm Password"
                    variant="outlined"
                    type="password"
                    error={verficationData.passwordError}
                    helperText={
                      verficationData.otpError ? "Please enter password" : ""
                    }
                  />
                </Box>
              ) : (
                <TextField
                  value={email.value}
                  fullWidth
                  size="small"
                  className="login-input"
                  onChange={(e) => {
                    handleEmailInput(e.target.value);
                  }}
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  slotProps={{ ...commonSlotProps }}
                  error={email.error}
                  helperText={email.error ? "Please enter valid email" : ""}
                />
              )}
              <ColorButton
                variant="contained"
                onClick={() => {
                  if (showOtpInput) {
                    handleForgotPassword();
                  } else if (email.value.length === 0 || email.error) {
                    setEmail({ ...email, error: true });
                  } else {
                    setShowOtpInput(true);
                  }
                }}
              >
                {showOtpInput ? "Change Password" : "Get Verfication Code"}
              </ColorButton>
              <Typography
                onClick={() => {
                  navigate(routes.login);
                }}
                mt={2}
                sx={{ cursor: "pointer" }}
                fontWeight={500}
              >
                Do you wanna sign in?
              </Typography>
            </Box>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default ForgotPassword;
