import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import {
  SaleInfoType,
  ShopInfoType,
  UserEditNavigationStateType,
  UserInfoType,
} from "../../utils/types/types";
import { constants } from "../../utils/constants/constants";
import { useEffect, useState } from "react";
import EditDeleteCard from "../EditDeleteCard/EditDeleteCard";
import { useNavigate } from "react-router-dom";
import { DeleteUser } from "../../services/user";
import toast from "react-hot-toast";

type PropsType = {
  data: UserInfoType[];
  loading: boolean;
  hideCheckbox?: boolean;
};

const UsersTable = ({ data, loading, hideCheckbox }: PropsType) => {
  const [usersData, setUsersData] = useState<UserInfoType[]>(data);
  const navigate = useNavigate();
  useEffect(() => {
    setUsersData(data);
  }, [data]);

  const columns: GridColDef[] = [
    {
      field: "username",
      headerName: "Username",
      minWidth: 200,
      maxWidth: 250,
    },

    {
      field: "shopIds",
      headerName: "Shops",
      minWidth: 300,
      maxWidth: 350,
      valueGetter: (value: string, row: UserInfoType) => {
        if (row?.role === constants.roles.super_admin) {
          return "All Shops";
        } else {
          return row?.shopIds?.map((shop) => shop.shopName)?.join(", ") || "";
        }
      },
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      field: "createdAt",
      headerName: "Added On",
      minWidth: 150,
      maxWidth: 200,
      valueGetter: (value: string, row: SaleInfoType) =>
        row?.createdAt ? moment(row.createdAt).format("DD MMM YYYY") : "-",
    },
    {
      field: "createdBy",
      headerName: "Added By",
      minWidth: 150,
      maxWidth: 200,
      valueGetter: (value: string, row: SaleInfoType) =>
        `${row.createdBy?.username || "Developer"}`,
    },
    {
      field: "Actions",
      headerName: "Actions",
      width: 90,
      renderCell: (params) => (
        <EditDeleteCard
          onClickEdit={() =>
            navigate(constants.routeNames.addNewUser, {
              state: {
                userInfo: {
                  username: params?.row?.username,
                  password: params?.row?.password,
                  role: params?.row?.role,
                  shopIds: params?.row?.shopIds?.map(
                    (shop: ShopInfoType) => shop._id
                  ),
                },
                isEdit: true,
                userId: params?.row?._id,
              } as UserEditNavigationStateType,
            })
          }
          onClickDelete={() => handleDeleteUser(params?.row?._id)}
        />
      ),
    },
  ];

  const handleDeleteUser = async (id: string) => {
    try {
      const { status } = await DeleteUser({ userId: id });
      if (status === 200) {
        toast.success("User deleted successfully");
        setUsersData((prevData) => prevData.filter((user) => user._id !== id));
      }
    } catch (error) {
      console.log("Error in deleting user", error);
    }
  };

  return (
    <DataGrid
      rows={usersData}
      columns={columns}
      initialState={{
        pagination: { paginationModel: { page: 0, pageSize: 5 } },
      }}
      pageSizeOptions={[5, 10]}
      // checkboxSelection={hideCheckbox ? false : true}
      sx={{ border: 0 }}
      getRowId={(row) => row._id!}
      loading={loading}
      localeText={{
        noRowsLabel: "No Users Found",
      }}
    />
  );
};

export default UsersTable;
