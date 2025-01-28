import {
  Box,
  Grid2,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import GuestSidePanel from "../../../components/GuestSidePanel/GuestSidePanel";
import { LoginApi } from "../../../services";
import { images } from "../../../utils/constants/images";
import { routes } from "../../../utils/constants/routes";
import { HttpStatus } from "../../../utils/fetch/fetchAPI";
import { setAuthentication } from "../../../utils/redux";
import { lightTheme } from "../../../utils/styles/theme";
import { ErrorType, LoginFormDataType } from "../../../utils/types/types";
import { validateSignIn } from "../../../utils/validation/validation";
import "./login.css";

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
  marginTop: "10px",
}));

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<ErrorType>({});
  const [formData, setFormData] = useState<LoginFormDataType>({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const setFormDataKey = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };
  const handleCredentialChange = (key: string, value: string) => {
    if (value.length === 0) {
      setErrors({ ...errors, [key]: { message: `${key} is required` } });
    }
    if (errors[key]) {
      setErrors({ ...errors, [key]: null });
    }
    setFormDataKey(key, value);
  };

  const handleLogin = async () => {
    console.log("formData", formData);
    setLoading(true);
    const formErrors = validateSignIn(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setLoading(false);
      return;
    }
    try {
      let { data, status } = await LoginApi({
        username: formData?.username,
        password: formData?.password,
      });
      if (status === HttpStatus.OK) {
        dispatch(setAuthentication(data));
        navigate(routes.dashboard);
      }
    } catch (error) {
      console.log("error > ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Grid2 height={"100vh"} container>
        <GuestSidePanel />
        <Grid2 size={{ xs: 12, sm: 12, md: 5 }}>
          <Box className="auth-container">
            <Box className="auth-child-container">
              <img
                className="authentication-logo"
                alt="logo"
                src={images.logo}
              />
              <Typography
                fontWeight={"600"}
                fontSize={24}
                color="rgb(32, 27, 27)"
              >
                Sign In
              </Typography>
              <form onSubmit={handleLogin}>
                <TextField
                  error={errors?.username?.message ? true : false}
                  fullWidth
                  size="small"
                  className="login-input"
                  onChange={(e) => {
                    handleCredentialChange("username", e.target.value);
                  }}
                  id="outlined-basic"
                  label="Username"
                  variant="outlined"
                  slotProps={{ ...commonSlotProps }}
                  helperText={errors?.username?.message}
                />
                <TextField
                  error={errors?.password?.message ? true : false}
                  helperText={errors?.password?.message}
                  fullWidth
                  size="small"
                  className="login-input"
                  onChange={(e) => {
                    handleCredentialChange("password", e.target.value);
                  }}
                  slotProps={{ ...commonSlotProps }}
                  id="outlined-basic2"
                  label="Password"
                  variant="outlined"
                  type="password"
                />
              </form>
              {/* <Box className="remember-me-box">
                <Checkbox
                  sx={{
                    "&.Mui-checked": {
                      color: "rgb(19, 18, 18)",
                    },
                  }}
                  defaultChecked
                />
                <Typography>Remember me?</Typography>
              </Box> */}
              <ColorButton
                onClick={handleLogin}
                variant="contained"
                sx={{ background: lightTheme.colors.primary }}
              >
                Sign In
              </ColorButton>
              {loading && (
                <LinearProgress
                  style={{ width: 120, color: "orange", marginTop: 15 }}
                  color="primary"
                />
              )}
              {/* <Typography
                onClick={() => {
                  navigate(routes.forgotPassword);
                }}
                mt={2}
                sx={{ cursor: "pointer" }}
                fontWeight={500}
              >
                Forgot your password?
              </Typography> */}
            </Box>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Login;
