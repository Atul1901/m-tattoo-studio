import { Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import {
  SaleEditNavigationStateType,
  SaleInfoType,
} from "../../utils/types/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditDeleteCard from "../EditDeleteCard/EditDeleteCard";
import { constants } from "../../utils/constants/constants";
import { DeleteSale } from "../../services/sales";
import toast from "react-hot-toast";

type PropsType = {
  data: SaleInfoType[];
  loading: boolean;
  hideCheckbox?: boolean;
  hideActionsColumn?: boolean;
};

const SalesTable = ({
  data,
  loading,
  hideCheckbox,
  hideActionsColumn,
}: PropsType) => {
  const navigate = useNavigate();
  const [saleData, setSaleData] = useState<SaleInfoType[]>(data);

  useEffect(() => {
    setSaleData(data);
  }, [data]);

  const columns: GridColDef[] = [
    {
      field: "customerId",
      headerName: "Customer",
      minWidth: 250,
      valueGetter: (value: string, row: SaleInfoType) =>
        `${row.customerId?.firstName || ""} ${row.customerId?.lastName || ""}`,
    },

    {
      field: "amount",
      headerName: "Amount",
      width: 150,
    },
    {
      field: "serviceIds",
      headerName: "Services",
      minWidth: 250,
      maxWidth: 300,
      valueGetter: (value: string, row: SaleInfoType) =>
        row?.serviceIds?.map((service) => service.serviceName)?.join(", ") ||
        "",
    },
    {
      field: "createdAt",
      headerName: "Added On",
      width: 200,
      valueGetter: (value: string, row: SaleInfoType) =>
        row?.createdAt
          ? moment(row?.createdAt).format("DD MMM YYYY h:mm A")
          : "-",
    },
    {
      field: "createdBy",
      headerName: "Added By",
      width: 150,
      valueGetter: (value: string, row: SaleInfoType) =>
        `${row.createdBy?.username || ""}`,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 90,
      renderCell: (params) => (
        <EditDeleteCard
          onClickDelete={() => handleDeleteSale(params?.row?._id)}
          showEdit={false}
        />
      ),
    },
  ];

  const handleDeleteSale = async (id: string) => {
    try {
      const { status } = await DeleteSale({ saleId: id });
      if (status === 200) {
        toast.success("Sale deleted successfully");
        setSaleData((prevData) => prevData.filter((sale) => sale._id !== id));
      }
    } catch (error) {
      console.log("Error in deleting sale", error);
    }
  };

  return (
    <DataGrid
      rows={saleData}
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
        noRowsLabel: "No Sales Found",
      }}
    />
  );
};

export default SalesTable;
