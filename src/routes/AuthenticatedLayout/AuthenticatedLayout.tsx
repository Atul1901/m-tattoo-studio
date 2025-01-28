/*
  This component can be used to define the authenticated layout of the user.
  // Scope for improvement : In jwt sign in save the privilages for the user, those privilages 
  will be saved in redux after login and will be passed to the side bar, side bar will render those options only.
*/
import * as React from "react";
import { useEffect } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { CSSObject, styled, Theme, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import { useThemeColors } from "../../utils/hooks/useThemeColors";
import { AppImages } from "../../assets/assets";
import { Navbar, SideBar } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { UserApi, ShopsDetailsApi } from "../../services";
import { HttpStatus } from "../../utils/fetch/fetchAPI";
import { UserId } from "../../utils/redux/reducer/authentication-slice";
import { setUser, setShopsDetails } from "../../utils/redux/reducer/user-slice";
import { updateSelectedShopId } from "../../utils/redux/reducer/appState-slice";
import { constants } from "../../utils/constants/constants";
import { GetAllShops } from "../../services/shops";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

const AuthenticatedLayout: React.FC<{ Component: React.FC }> = ({
  Component,
}) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const { themePrimaryColor, themeSecondaryColor } = useThemeColors();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  //////////---  api call for user which will be used all over the app ---//////////
  const dispatch = useDispatch();
  const userId = useSelector(UserId);
  const getUser = async () => {
    try {
      let { data, status } = await UserApi(userId);
      if (status === HttpStatus.OK) {
        dispatch(setUser(data));
        if (data.role !== constants.roles.super_admin) {
          dispatch(updateSelectedShopId({ shopId: data.shopIds[0] })); // this will have no effect for Super admin as we are not assigning any shop ids to super admin
        }
        getShops(data.shopIds, data.role);
      }
    } catch (error) {
      console.log("error in get users > ", error);
    }
  };

  // need to optimize
  const getShops = async (ShopIds: [string], role: string) => {
    try {
      let res;
      if (role === constants.roles.super_admin) {
        res = await GetAllShops();
      } else {
        res = await ShopsDetailsApi(ShopIds);
      }
      const data = res.data;
      const status = res.status;
      if (status === HttpStatus.OK) {
        // console.log("shop arr ", data);
        dispatch(updateSelectedShopId({ shopId: data[0]?._id }));
        dispatch(setShopsDetails(data));
      }
    } catch (error) {
      console.log("error in get shops > ", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: themePrimaryColor,
          boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
          borderBottomWidth: `1px`,
          borderBottomStyle: `solid`,
          borderBottomColor: `rgba(0,0,0,0.1)`,
          borderLeftWidth: `1px`,
          borderLeftStyle: `solid`,
          borderLeftColor: `rgba(0,0,0,0.1)`,
        }}
        open={open}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Navbar />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          backgroundColor: themePrimaryColor,
          boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <DrawerHeader>
          <img src={AppImages.logo} className="nav-logo" alt="" />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <SideBar />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, backgroundColor: "#F5F6FA" }}>
        <DrawerHeader />
        <Box className="flex fdc ai-fs jc-fs g25 py15 px20 h-auto">
          <Component />
        </Box>
      </Box>
    </Box>
  );
};

export default AuthenticatedLayout;
