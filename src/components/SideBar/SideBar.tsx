import { Box, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "../../utils/redux/reducer/user-slice";
import { lightTheme } from "../../utils/styles/theme";
import { sideBarList } from "./sideBarList";

interface SideBarProps {
  toggleDrawer?: boolean;
  setToggleDrawer?: (value: boolean) => void;
}

const SideBar: FC<SideBarProps> = ({ setToggleDrawer, toggleDrawer }) => {
  const { role } = useSelector(User);
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    `/${location.pathname.split("/")[1]}`
  );
  const navigate = useNavigate();
  return (
    <Box
      style={{
        width: 240,
        background: "white",
        padding: "10px 0px",
      }}
    >
      {sideBarList
        ?.filter((item) => item?.role?.includes(role))
        ?.map((item, index) => {
          return (
            <Box
              key={item.title}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "5px 20px",
                justifyContent: "flex-start",
              }}
            >
              {activeTab === item?.route && (
                <Box
                  sx={{
                    background: lightTheme.colors.primary,
                    width: "5px",
                    height: "32px",
                    borderRadius: "20px",
                    position: "absolute",
                    left: "7px",
                  }}
                />
              )}
              <Box
                onClick={() => {
                  setActiveTab(item?.route);
                  navigate(item?.route);
                }}
                sx={{
                  cursor: "pointer",
                  width: "160px",
                  background:
                    activeTab === item?.route
                      ? "rgba(236, 78, 31, 0.15)"
                      : "transparent",
                  borderRadius: "5px",
                  padding: "5px",
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  "&:hover": {
                    backgroundColor: "rgba(236, 78, 31, 0.25)",
                  },
                  "&:active": {
                    backgroundColor: "rgba(236, 78, 31, 0.40)",
                  },
                }}
              >
                <item.icon
                  sx={{
                    color:
                      activeTab === item?.route
                        ? lightTheme.colors.primary
                        : "#464255",
                  }}
                />
                <Typography
                  fontSize={14}
                  fontWeight={activeTab === item?.route ? 600 : 500}
                  sx={{
                    color:
                      activeTab === item?.route
                        ? lightTheme.colors.primary
                        : "#464255",
                  }}
                >
                  {item.title}
                </Typography>
              </Box>
            </Box>
          );
        })}
    </Box>
  );
};

export default SideBar;
