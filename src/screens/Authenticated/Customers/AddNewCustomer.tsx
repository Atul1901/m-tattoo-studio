import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AppImages } from "../../../assets/assets";
import {
  PostAddNewCustomer,
  PutEditCustomer,
} from "../../../services/customers";
import { constants } from "../../../utils/constants/constants";
import { HttpStatus } from "../../../utils/fetch/fetchAPI";
import { SelectedShopId } from "../../../utils/redux/reducer/appState-slice";
import {
  CustomerEditNavigationStateType,
  ErrorType,
  Field,
  QuickAddActionFormValuesType,
} from "../../../utils/types/types";
import { validateAddCustomerForm } from "../../../utils/validation/validation";
import QuickAddActionFormLayout from "../Dashboard/QuickAddActionFormLayout";

const AddNewCustomer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state }: { state: CustomerEditNavigationStateType } = location;
  const [loading, setLoading] = useState<boolean>(false);
  const fields: Field[] = [
    {
      name: "first_name",
      label: "First Name",
      placeholder: "Enter your first name",
      value: "", // set value initially as empty or from state
      inputFieldBgColor: "#fff",
      inputFieldPlaceholderColor: "#aaa",
      inputFieldStyles: {},
    },
    {
      name: "last_name",
      label: "Last Name",
      placeholder: "Enter your last name",
      value: "",
      inputFieldBgColor: "#fff",
      inputFieldPlaceholderColor: "#aaa",
      inputFieldStyles: {},
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      value: "",
      inputFieldBgColor: "#fff",
      inputFieldPlaceholderColor: "#aaa",
      inputFieldStyles: {},
    },
    {
      name: "phone_number",
      label: "Phone Number",
      placeholder: "Enter your phone number",
      value: "",
      inputFieldBgColor: "#fff",
      inputFieldPlaceholderColor: "#aaa",
      inputFieldStyles: {},
    },
    {
      name: "date_of_birth",
      label: "Date of Birth",
      placeholder: "DD/MM/YYYY",
      value: "",
      inputFieldBgColor: "#fff",
      inputFieldPlaceholderColor: "#aaa",
      inputFieldStyles: {},
      type: "date",
    },
    {
      name: "gender",
      label: "Gender",
      placeholder: "Enter your gender",
      value: "",
      inputFieldBgColor: "#fff",
      inputFieldPlaceholderColor: "#aaa",
      inputFieldStyles: {},
      isSelectable: true,
      options: constants.genderSelectionOptions,
    },
  ];
  const shopId = useSelector(SelectedShopId);
  const [errors, setErrors] = useState<ErrorType>({});
  const [formValues, setFormValues] =
    React.useState<QuickAddActionFormValuesType>(
      state?.isEdit
        ? state?.customerInfo
        : {
            first_name: "",
            last_name: "",
            email: "",
            phone_number: "",
            date_of_birth: "",
            gender: "",
          }
    );

  const handleFormSubmit = async () => {
    setLoading(true);
    const formErrors = validateAddCustomerForm(formValues);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setLoading(false);
      return;
    }
    try {
      const customerInfo = {
        firstName: formValues?.first_name || "",
        lastName: formValues?.last_name || "",
        email: formValues?.email || "",
        phoneNumber: formValues?.phone_number || "",
        dateOfBirth: formValues?.date_of_birth || "",
        gender: formValues?.gender || "",
      };
      if (state?.isEdit) {
        let { status } = await PutEditCustomer({
          body: customerInfo,
          shopId: shopId,
          customerId: state.customerId,
        });
        if (status === HttpStatus.OK) {
          toast.success("Customer Edited successfully");
          navigate(constants.routeNames.customers);
        }
      } else {
        let { status } = await PostAddNewCustomer({
          body: customerInfo,
          shopId: shopId,
        });
        if (status === HttpStatus.OK) {
          toast.success("Customer added successfully");
          navigate(constants.routeNames.customers);
        }
      }
    } catch (error) {
      console.log("error > ", error);
    } finally {
      setFormValues({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        date_of_birth: "",
        gender: "",
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
      title={state?.isEdit ? "Edit Customer" : "Add New Customer"}
      buttonTitle={state?.isEdit ? "Edit Customer" : "Add New Customer"}
      onPrimaryButtonClick={handleFormSubmit}
      fields={fields}
      formValues={formValues}
      setFormValues={setFormValues}
      image={AppImages.PersonGroupIcon}
      backgroundColor={constants.colors.customerBgColor}
      handleInputChange={handleInputChange}
      errors={errors}
      loading={loading}
    />
  );
};

export default AddNewCustomer;
