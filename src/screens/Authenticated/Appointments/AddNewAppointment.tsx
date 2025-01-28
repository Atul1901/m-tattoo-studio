import React, { useState } from "react";
import { AppImages } from "../../../assets/assets";
import {
  AppointmentEditNavigationStateType,
  ErrorType,
  Field,
  QuickAddActionFormValuesType,
} from "../../../utils/types/types";
import { useSelector } from "react-redux";
import { SelectedShopId } from "../../../utils/redux/reducer/appState-slice";
import { validateAddAppointmentForm } from "../../../utils/validation/validation";
import toast from "react-hot-toast";
import { HttpStatus } from "../../../utils/fetch/fetchAPI";
import {
  PostAddNewAppointment,
  PutEditAppointment,
} from "../../../services/appointments";
import { useGetDataByShopId } from "../../../utils/hooks/useGetDataByShopId";
import { GetAllServicesByShopId } from "../../../services/services";
import { constants } from "../../../utils/constants/constants";
import { useLocation, useNavigate } from "react-router-dom";
import QuickAddActionFormLayout from "../Dashboard/QuickAddActionFormLayout";

const AddNewAppointment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state }: { state: AppointmentEditNavigationStateType } = location;
  const shopId = useSelector(SelectedShopId);
  const [errors, setErrors] = useState<ErrorType>({});
  const { data: allServicesByShopId } = useGetDataByShopId({
    queryFn: GetAllServicesByShopId,
    queryKey: constants.queryKeys.getAllServicesByShopId,
  });
  const fields: Field[] = [
    {
      name: "first_name",
      label: "First Name",
      placeholder: "Enter first name",
      value: "", // set value initially as empty or from state
      inputFieldBgColor: "#fff",
      inputFieldPlaceholderColor: "#aaa",
      inputFieldStyles: {},
    },
    {
      name: "last_name",
      label: "Last Name",
      placeholder: "Enter last name",
      value: "",
      inputFieldBgColor: "#fff",
      inputFieldPlaceholderColor: "#aaa",
      inputFieldStyles: {},
    },
    {
      name: "phone_number",
      label: "Phone Number",
      placeholder: "Enter phone number",
      value: "",
      inputFieldBgColor: "#fff",
      inputFieldPlaceholderColor: "#aaa",
      inputFieldStyles: {},
    },
    {
      name: "date",
      label: "Select Date & Time",
      placeholder: "Select a date and time",
      value: "",
      inputFieldBgColor: "#fff",
      inputFieldPlaceholderColor: "#aaa",
      inputFieldStyles: {},
      type: "datetime-local",
    },
    {
      name: "services",
      label: "Service",
      placeholder: "Enter service type",
      value: "",
      inputFieldBgColor: "#fff",
      inputFieldPlaceholderColor: "#aaa",
      inputFieldStyles: {},
      isMultiSelectable: true,
      options: allServicesByShopId?.map((service) => ({
        label: service?.serviceName,
        value: service?._id,
      })),
    },
    {
      name: "status",
      label: "Status",
      placeholder: "Select status",
      value: "",
      inputFieldBgColor: "#fff",
      inputFieldPlaceholderColor: "#aaa",
      inputFieldStyles: {},
      isSelectable: true,
      options: [
        { label: "Confirmed", value: "confirmed" },
        { label: "Pending", value: "pending" },
        { label: "Cancelled", value: "cancelled" },
        { label: "Completed", value: "completed" },
      ],
    },
  ];
  const [loading, setLoading] = useState<boolean>(false);

  console.log("state", state);

  const [formValues, setFormValues] =
    React.useState<QuickAddActionFormValuesType>(
      state?.isEdit
        ? state?.appointmentInfo
        : {
            first_name: "",
            last_name: "",
            date: "",
            services: [],
            phone_number: "",
            status: "",
          }
    );

  const handleFormSubmit = async () => {
    setLoading(true);
    const formErrors = validateAddAppointmentForm(formValues);
    console.log("formErrors", formErrors);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setLoading(false);
      return;
    }
    try {
      const appointmentInfo = {
        firstName: formValues.first_name || "",
        lastName: formValues.last_name || "",
        date: formValues.date || "",
        serviceIds: formValues.services || [],
        phoneNumber: formValues.phone_number || "",
        status: formValues.status || "",
      };
      if (state?.isEdit) {
        let { status } = await PutEditAppointment({
          body: {
            ...appointmentInfo,
            shopId: shopId,
          },
          appointmentId: state?.appointmentId,
        });
        if (status === HttpStatus.OK) {
          toast.success("Appointment Edited Successfully");
          navigate(constants.routeNames.appointments);
        }
      } else {
        let { status } = await PostAddNewAppointment({
          body: {
            ...appointmentInfo,
            shopId: shopId,
          },
        });
        if (status === HttpStatus.OK) {
          toast.success("Appointment Added Successfully");
          navigate(constants.routeNames.appointments);
        }
      }
    } catch (error) {
      console.log("error > ", error);
    } finally {
      setFormValues({
        first_name: "",
        last_name: "",
        date: "",
        services: [],
        phone_number: "",
      });
      setLoading(false);
    }
  };

  const setFormValuesKey = (key: string, value: string | string[]) => {
    setFormValues({ ...formValues, [key]: value });
  };

  const handleInputChange = (
    key: string,
    value: string | string[],
    field: string
  ) => {
    if (value.length === 0) {
      setErrors({ ...errors, [key]: { message: `${field} is required` } });
    }
    if (errors[key]) {
      setErrors({ ...errors, [key]: null });
    }
    setFormValuesKey(key, value);
  };

  return (
    <QuickAddActionFormLayout
      title={state?.isEdit ? "Edit Appointment" : "Add New Appointment"}
      buttonTitle={state?.isEdit ? "Edit Appointment" : "Add Appointment"}
      onPrimaryButtonClick={handleFormSubmit}
      fields={fields}
      formValues={formValues}
      setFormValues={setFormValues}
      image={AppImages.OrderIcon}
      backgroundColor={constants.colors.appointmentBgColor}
      handleInputChange={handleInputChange}
      loading={loading}
      errors={errors}
    />
  );
};

export default AddNewAppointment;
