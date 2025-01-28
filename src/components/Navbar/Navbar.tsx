import { Avatar, Box, Button, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFormatedCurrentDate } from "../../utils/helpers";
import { useThemeColors } from "../../utils/hooks/useThemeColors";
import { useThemeIcons } from "../../utils/hooks/useThemeIcons";
import { logOut } from "../../utils/redux";
import { updateSelectedShopId } from "../../utils/redux/reducer/appState-slice";
import { ShopsDetails, User } from "../../utils/redux/reducer/user-slice";
import "./navbar.css";
import { useLocation } from "react-router-dom";

interface NavbarProps {
  toggleDrawer?: boolean;
  setToggleDrawer?: (value: boolean) => void;
}

const Navbar: FC<NavbarProps> = ({ setToggleDrawer, toggleDrawer }) => {
  const [currentTime, setCurrentTime] = useState(getFormatedCurrentDate());
  const dispatch = useDispatch();
  const user = useSelector(User);
  const { ShopIcon } = useThemeIcons();
  const shopsDetails = useSelector(ShopsDetails);
  const [selectedShop, setSelectedShop] = useState(shopsDetails[0]);
  const location = useLocation();

  const handleChange = (event: any) => {
    const selectedId = event.target.value;
    dispatch(updateSelectedShopId({ shopId: selectedId }));

    const selectedShop =
      shopsDetails.find((shop) => shop._id === selectedId) || null;
    if (selectedShop) {
      setSelectedShop(selectedShop); // Update the state with the selected shop object
    }
  };

  useEffect(() => {
    if (shopsDetails && shopsDetails?.length > 0) {
      setSelectedShop(shopsDetails[0]); // Set default to the first shop
    }
  }, [shopsDetails]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getFormatedCurrentDate());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const {
    searchBarBgColor,
    themePrimaryColor,
    themeSecondaryColor,
    shopIconBgColor,
  } = useThemeColors();
  return (
    <Box
      className="p10 flex jc-sb ai-c py5 fullW"
      sx={{ backgroundColor: themePrimaryColor }}
    >
      <Box className="flex jc-fs ai-c g10">
        <Typography fontSize={14} color={"#646464"}>
          {currentTime}
        </Typography>
        {/* <Paper
          elevation={0}
          component="form"
          className="flex jc-c ai-c br10 px15"
          sx={{ backgroundColor: searchBarBgColor }}
        >
          <InputBase
            sx={{ ml: 0.4, fontSize: 14, width: 350 }}
            placeholder="Search here..."
          />
          <IconButton type="button" sx={{ ml: 0.6 }} aria-label="search">
            <SearchIcon
              sx={{ color: lightTheme.colors.primary, borderRadius: 10 }}
            />
          </IconButton>
        </Paper> */}
      </Box>

      <Box display={"flex"} alignItems={"center"} gap={"20px"}>
        {/* <FormControl size="small">
          <Select
            value={"EN"}
            onChange={() => {}}
            sx={{
              color: "#646464",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          >
            <MenuItem value={"EN"}>
              <Typography fontSize={14}>EN</Typography>
            </MenuItem>
            <MenuItem value={"HI"}>
              <Typography fontSize={14}>HI</Typography>
            </MenuItem>
          </Select>
        </FormControl> */}
        {location?.pathname?.split("/")[1] !== "shops" &&
          location?.pathname?.split("/")[1] !== "users" && (
            <Box
              className="flex fdr jc-c ai-c g20 br10 px15 py10"
              // sx={{ boxShadow: "2px 2px 5px #eaeaea" }}
            >
              <Box
                className="flex fdrr jc-c ai-c p5 br10"
                sx={{ backgroundColor: shopIconBgColor }}
              >
                <img src={ShopIcon} width={25} height={25} alt="" />
              </Box>
              <Select
                // labelId="demo-simple-select-helper-label"
                // id="demo-simple-select-helper"
                // label="Select Shop"
                className="fs14"
                autoWidth
                sx={{ width: 150, height: 40 }}
                value={selectedShop?._id || ""}
                onChange={handleChange}
                placeholder="Select Shop"
                // variant="filled"
              >
                {shopsDetails?.map((item, index) => {
                  return (
                    <MenuItem
                      key={index}
                      value={item?._id}
                      sx={{ width: 150, fontSize: 14 }}
                    >
                      {item?.shopName}
                    </MenuItem>
                  );
                })}
              </Select>
            </Box>
          )}

        {/* <IconButton
          type="button"
          sx={{
            height: 35,
            width: 35,
            background: "rgba(45, 156, 219, 0.25)",
            borderRadius: "15px",
            "&:hover": {
              backgroundColor: "#2D9CDB95",
            },
          }}
        >
          <Badge badgeContent={4} color="primary">
            <NotificationsNoneIcon sx={{ color: "#2D9CDB" }} />
          </Badge>
        </IconButton> */}

        <IconButton>
          <Avatar
            alt="profile-icon"
            src="https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?q=80&w=1930&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </IconButton>
        <Box>
          <Typography
            fontWeight={600}
            fontSize={14}
            color={themeSecondaryColor}
          >
            {user.username}
          </Typography>
          <Typography
            fontWeight={500}
            fontSize={13}
            color={themeSecondaryColor}
          >
            {user.role}
          </Typography>
        </Box>

        <Button
          onClick={() => dispatch(logOut())}
          variant="outlined"
          className="captilaize"
          color="error"
          sx={{ textTransform: "capitalize" }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Navbar;
