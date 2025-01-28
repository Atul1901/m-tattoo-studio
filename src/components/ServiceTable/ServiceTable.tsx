import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { SaleInfoType, ServiceInfoType } from "../../utils/types/types";
import EditDeleteCard from "../EditDeleteCard/EditDeleteCard";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { DeleteCustomer } from "../../services/customers";
import { DeleteService } from "../../services/services";
import { useSelector } from "react-redux";
import { User } from "../../utils/redux/reducer/user-slice";
import { constants } from "../../utils/constants/constants";

type PropsType = {
  data: ServiceInfoType[];
  loading: boolean;
  hideCheckbox?: boolean;
};

const ServicesTable = ({ data, loading, hideCheckbox }: PropsType) => {
  const [servicesData, setServicesData] = useState<ServiceInfoType[]>(data);
  const { role } = useSelector(User);

  useEffect(() => {
    setServicesData(data);
  }, [data]);

  let columns: GridColDef[] = [
    {
      field: "serviceName",
      headerName: "Service",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 1,
    },
  ];

  const getSuperAdminColumns = () => [
    {
      field: "createdAt",
      headerName: "Added On",
      minWidth: 150,
      flex: 1,
      valueGetter: (value: string, row: SaleInfoType) =>
        row?.createdAt
          ? moment(row.createdAt).format("DD MMM YYYY h:mm A")
          : "-",
    },
    {
      field: "createdBy",
      headerName: "Added By",
      minWidth: 150,
      flex: 1,
      valueGetter: (value: string, row: SaleInfoType) =>
        `${row.createdBy?.username || ""}`,
    },
    {
      field: "Actions",
      headerName: "Actions",
      width: 90,
      renderCell: (params: any) => (
        <EditDeleteCard
          showEdit={false}
          onClickDelete={() => handleDeleteService(params?.row?._id)}
        />
      ),
    },
  ];

  if (role === constants.roles.super_admin) {
    columns = [...columns, ...getSuperAdminColumns()];
  }

  const handleDeleteService = async (id: string) => {
    try {
      const { status } = await DeleteService({ serviceId: id });
      if (status === 200) {
        toast.success("Service deleted successfully");
        setServicesData((prevData) =>
          prevData.filter((service) => service._id !== id)
        );
      }
    } catch (error) {
      console.log("Error in deleting service", error);
    }
  };

  return (
    <DataGrid
      rows={servicesData}
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
        noRowsLabel: "No Services Found",
      }}
    />
  );
};

export default ServicesTable;
