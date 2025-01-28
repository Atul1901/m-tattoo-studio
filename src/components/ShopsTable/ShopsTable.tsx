import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import {
  SaleInfoType,
  ServiceInfoType,
  ShopEditNavigationStateType,
  ShopInfoType,
} from "../../utils/types/types";
import EditDeleteCard from "../EditDeleteCard/EditDeleteCard";
import { constants } from "../../utils/constants/constants";
import { useNavigate } from "react-router-dom";
import { DeleteShop } from "../../services/shops";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

type PropsType = {
  data: ShopInfoType[];
  loading: boolean;
  hideCheckbox?: boolean;
};

const ShopsTable = ({ data, loading, hideCheckbox }: PropsType) => {
  const navigate = useNavigate();
  const [shopsData, setShopsData] = useState<ShopInfoType[]>(data);

  useEffect(() => {
    setShopsData(data);
  }, [data]);

  const columns: GridColDef[] = [
    {
      field: "shopName",
      headerName: "Name",
      minWidth: 200,
      maxWidth: 250,
    },
    {
      field: "location",
      headerName: "Location",
      minWidth: 200,
      maxWidth: 250,
    },
    {
      field: "serviceIds",
      headerName: "Services",
      minWidth: 200,
      maxWidth: 250,
      valueGetter: (value: string, row: ShopInfoType) =>
        row?.serviceIds?.map((service) => service.serviceName)?.join(", ") ||
        "",
    },
    {
      field: "createdAt",
      headerName: "Added On",
      minWidth: 200,
      maxWidth: 250,
      valueGetter: (value: string, row: SaleInfoType) =>
        row?.createdAt
          ? moment(row.createdAt).format("DD MMM YYYY h:mm A")
          : "-",
    },
    {
      field: "createdBy",
      headerName: "Added By",
      minWidth: 150,
      maxWidth: 200,
      valueGetter: (value: string, row: SaleInfoType) =>
        `${row.createdBy?.username || ""}`,
    },
    {
      field: "Actions",
      headerName: "Actions",
      width: 90,
      renderCell: (params) => (
        <EditDeleteCard
          showEdit={false}
          onClickDelete={() => handleDeleteShop(params?.row?._id)}
        />
      ),
    },
  ];

  const handleDeleteShop = async (id: string) => {
    try {
      const { status } = await DeleteShop({ shopId: id });
      if (status === 200) {
        toast.success("Shop deleted successfully");
        setShopsData((prevData) => prevData.filter((shop) => shop._id !== id));
      }
    } catch (error) {
      console.log("Error in deleting shop", error);
    }
  };

  return (
    <DataGrid
      rows={shopsData}
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
        noRowsLabel: "No Shops Found",
      }}
    />
  );
};

export default ShopsTable;
