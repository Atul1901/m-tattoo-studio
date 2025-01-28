import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import {
  AppointmentEditNavigationStateType,
  AppointmentInfoType,
  SaleInfoType,
  ServiceInfoType,
} from "../../utils/types/types";
import EditDeleteCard from "../EditDeleteCard/EditDeleteCard";
import { constants } from "../../utils/constants/constants";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { DeleteAppointment } from "../../services/appointments";

type PropsType = {
  data: AppointmentInfoType[];
  loading: boolean;
  hideCheckbox?: boolean;
  hideActionsColumn?: boolean;
};

const AppointmentTable = ({
  data,
  loading,
  hideCheckbox,
  hideActionsColumn = false,
}: PropsType) => {
  const navigate = useNavigate();
  const [appointmentData, setAppointmentData] =
    useState<AppointmentInfoType[]>(data);

  useEffect(() => {
    setAppointmentData(data);
  }, [data]);

  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Date",
      width: 200,
      valueGetter: (value: string, row: AppointmentInfoType) =>
        row?.date
          ? moment(row.date)
              ?.subtract(5, "hours")
              ?.subtract(30, "minutes")
              ?.format("DD MMM YYYY h:mm A")
          : "-",
    },
    {
      field: "customerName",
      headerName: "Customer",
      minWidth: 150,
      maxWidth: 200,
      valueGetter: (value: string, row: AppointmentInfoType) =>
        `${row?.firstName || ""} ${row?.lastName || ""}`,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      field: "serviceIds",
      headerName: "Services",
      minWidth: 200,
      maxWidth: 250,
      valueGetter: (value: string, row: AppointmentInfoType) =>
        row?.serviceIds?.map((service) => service.serviceName)?.join(", ") ||
        "",
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "createdBy",
      headerName: "Added By",
      width: 120,
      valueGetter: (value: string, row: SaleInfoType) =>
        `${row.createdBy?.username || ""}`,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 90,
      renderCell: (params) => (
        <EditDeleteCard
          onClickEdit={() =>
            navigate(constants.routeNames.addNewAppointment, {
              state: {
                appointmentInfo: {
                  first_name: params?.row?.firstName,
                  last_name: params?.row?.lastName,
                  phone_number: params?.row?.phoneNumber,
                  date: moment(params?.row?.date)
                    ?.subtract(5, "hours")
                    ?.subtract(30, "minutes")
                    ?.format("YYYY-MM-DDTHH:mm"),
                  services: params?.row?.serviceIds?.map(
                    (service: ServiceInfoType) => service?._id
                  ),
                  status: params?.row?.status,
                },
                isEdit: true,
                appointmentId: params?.row?._id,
              } as AppointmentEditNavigationStateType,
            })
          }
          onClickDelete={() => handleDeleteAppointment(params?.row?._id)}
        />
      ),
    },
  ];

  const handleDeleteAppointment = async (id: string) => {
    try {
      const { status } = await DeleteAppointment({ appointmentId: id });
      if (status === 200) {
        toast.success("Appointment deleted successfully");
        setAppointmentData((prevData) =>
          prevData.filter((appointment) => appointment._id !== id)
        );
      }
    } catch (error) {
      console.log("Error in deleting appointment", error);
    }
  };

  return (
    <DataGrid
      rows={appointmentData}
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
        noRowsLabel: "No Appointments Found",
      }}
    />
  );
};

export default AppointmentTable;
