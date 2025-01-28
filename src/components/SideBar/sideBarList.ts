import HomeIcon from "@mui/icons-material/Home";
import ViewListIcon from "@mui/icons-material/ViewList";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import EmojiFoodBeverageOutlinedIcon from "@mui/icons-material/EmojiFoodBeverageOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import {
  DesignServicesOutlined,
  PersonOutlineOutlined,
  ShopOutlined,
  StackedLineChartOutlined,
  StoreMallDirectoryOutlined,
} from "@mui/icons-material";
import { constants } from "../../utils/constants/constants";

export const sideBarList = [
  {
    icon: HomeIcon,
    title: "Dashboard",
    route: constants.routeNames.dashboard,
    role: [constants.roles.admin, constants.roles.super_admin],
  },
  // {
  //   icon: ViewListIcon,
  //   title: "Order List",
  //   route: "",
  // },
  {
    icon: PeopleAltIcon,
    title: "Customers",
    route: constants.routeNames.customers,
    role: [constants.roles.admin, constants.roles.super_admin],
  },
  {
    icon: StackedLineChartOutlined,
    title: "Sales",
    route: constants.routeNames.sales,
    role: [constants.roles.admin, constants.roles.super_admin],
  },
  // {
  //   icon: RateReviewOutlinedIcon,
  //   title: "Reviews",
  //   route: "",
  // },
  // {
  //   icon: FastfoodOutlinedIcon,
  //   title: "Foods",
  //   route: "",
  // },
  // {
  //   icon: EmojiFoodBeverageOutlinedIcon,
  //   title: "Food Detail",
  //   route: "",
  // },
  {
    icon: CalendarTodayIcon,
    title: "Appointments",
    route: constants.routeNames.appointments,
    role: [constants.roles.admin, constants.roles.super_admin],
  },
  {
    icon: AssessmentOutlinedIcon,
    title: "Analytics",
    route: constants.routeNames.analytics,
    role: [constants.roles.admin, constants.roles.super_admin],
  },
  {
    icon: DesignServicesOutlined,
    title: "Services",
    route: constants.routeNames.services,
    role: [constants.roles.admin, constants.roles.super_admin],
  },
  {
    icon: StoreMallDirectoryOutlined,
    title: "Shops",
    route: constants.routeNames.shops,
    role: [constants.roles.super_admin],
  },
  {
    icon: PersonOutlineOutlined,
    title: "Users",
    route: constants.routeNames.users,
    role: [constants.roles.super_admin],
  },

  // {
  //   icon: ChatBubbleIcon,
  //   title: "Chat",
  //   route: "",
  // },
  // {
  //   icon: AccountBalanceWalletIcon,
  //   title: "Wallet",
  //   route: "",
  // },
];
