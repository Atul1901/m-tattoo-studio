import { Box, Button, Paper, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import UsersTable from "../../../components/UsersTable/UsersTable";
import { constants } from "../../../utils/constants/constants";
import { HttpStatus } from "../../../utils/fetch/fetchAPI";
import { ShopInfoType, UserInfoType } from "../../../utils/types/types";
import { GetAllUsers } from "../../../services/user";
import { AppImages } from "../../../assets/assets";
import { IconCard } from "../../../components";

const Users = () => {
  const navigate = useNavigate();

  const fetchAllUsers = async () => {
    try {
      const { data, status } = await GetAllUsers();
      if (status === HttpStatus.OK) {
        return data ? data : ([] as UserInfoType[]);
      }
    } catch (error: any) {
      return [];
    }
  };

  const { data: allUsers, isLoading: allUsersLoading } = useQuery({
    queryFn: fetchAllUsers,
    queryKey: [constants.queryKeys.getAllUsers],
  });
  return (
    <Box className="flex fdc ai-c jc-c fullW g15">
      <Box className="flex fdr ai-c jc-sb fullW mt5">
        <Box className="flex fdr jc-c ai-c g10">
          <IconCard
            backgroundColor={constants.colors.userBgColor}
            image={AppImages.PersonIcon}
            size={20}
            className="p5 br5"
          />
          <Typography variant="h6" className="fw500">
            Users
          </Typography>
        </Box>
        <Button
          onClick={() =>
            navigate(constants.routeNames.addNewUser, {
              state: { isEdit: false },
            })
          }
          variant="outlined"
          className="captilaize"
          color="primary"
          sx={{ textTransform: "capitalize" }}
        >
          Add User
        </Button>
      </Box>
      <Paper sx={{ height: 400, width: "100%" }}>
        <UsersTable
          data={allUsers && allUsers?.length > 0 ? allUsers : []}
          loading={allUsersLoading}
        />
      </Paper>
    </Box>
  );
};

export default Users;
