import React, { useEffect, useState } from "react";
import CustomTable from "../CustomTable/CustomTable";
import {
  ColumnInfoType,
  CustomerEditNavigationStateType,
  CustomerInfoType,
  QuickAddActionFormValuesType,
} from "../../utils/types/types";
import moment from "moment";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Paper } from "@mui/material";
import { Delete, Edit, EditAttributesOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { constants } from "../../utils/constants/constants";
import EditDeleteCard from "../EditDeleteCard/EditDeleteCard";
import { DeleteCustomer } from "../../services/customers";
import toast from "react-hot-toast";

type PropsType = {
  data: CustomerInfoType[];
  loading: boolean;
  hideCheckbox?: boolean;
  hideActionsColumn?: boolean;
};

const CustomerTable = ({
  data,
  loading,
  hideCheckbox,
  hideActionsColumn = false,
}: PropsType) => {
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState<CustomerInfoType[]>(data);

  useEffect(() => {
    setCustomerData(data);
  }, [data]);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      maxWidth: 200,
      valueGetter: (value: string, row: CustomerInfoType) =>
        `${row.firstName || ""} ${row.lastName || ""}`,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 250,
      maxWidth: 300,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 100,
    },
    {
      field: "age",
      headerName: "Age",
      width: 100,
      valueGetter: (value: string, row: CustomerInfoType) =>
        moment().diff(row.dateOfBirth, "years")?.toString(),
    },
    {
      field: "createdAt",
      headerName: "Registered On",
      width: 200,
      valueGetter: (value: string, row: CustomerInfoType) =>
        row.createdAt
          ? moment(row.createdAt).format("DD MMM YYYY h:mm a")
          : "-",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 90,
      renderCell: (params) => (
        <EditDeleteCard
          onClickEdit={() =>
            navigate(constants.routeNames.addNewCustomer, {
              state: {
                customerInfo: {
                  first_name: params?.row?.firstName,
                  last_name: params?.row?.lastName,
                  email: params?.row?.email,
                  phone_number: params?.row?.phoneNumber,
                  date_of_birth: moment(params?.row?.dateOfBirth)?.format(
                    "YYYY-MM-DD"
                  ),
                  gender: params?.row?.gender,
                },
                isEdit: true,
                customerId: params?.row?._id,
              } as CustomerEditNavigationStateType,
            })
          }
          onClickDelete={() => handleDeleteCustomer(params?.row?._id)}
        />
      ),
    },
  ];

  const handleDeleteCustomer = async (id: string) => {
    try {
      const { status } = await DeleteCustomer({ customerId: id });
      if (status === 200) {
        toast.success("Customer deleted successfully");
        setCustomerData((prevData) =>
          prevData.filter((customer) => customer._id !== id)
        );
      }
    } catch (error) {
      console.log("Error in deleting customer", error);
    }
  };

  return (
    <DataGrid
      rows={customerData}
      columns={
        hideActionsColumn
          ? columns?.filter((column) => column?.field !== "actions")
          : columns
      }
      initialState={{
        pagination: { paginationModel: { page: 0, pageSize: 5 } },
      }}
      pageSizeOptions={[5, 10]}
      // checkboxSelection={hideCheckbox ? false : true}
      sx={{ border: 0 }}
      getRowId={(row) => row._id!}
      loading={loading}
      localeText={{
        noRowsLabel: "No Customers Found",
      }}
    />
  );
};

export default CustomerTable;
