import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppImages } from "../../../assets/assets";
import { PostAddNewService } from "../../../services/services";
import { constants } from "../../../utils/constants/constants";
import { HttpStatus } from "../../../utils/fetch/fetchAPI";
import { SelectedShopId } from "../../../utils/redux/reducer/appState-slice";
import {
  ErrorType,
  Field,
  QuickAddActionFormValuesType,
} from "../../../utils/types/types";
import QuickAddActionFormLayout from "../Dashboard/QuickAddActionFormLayout";
import { validateAddServiceForm } from "../../../utils/validation/validation";

const AddNewService = () => {
  const navigate = useNavigate();
  const shopId = useSelector(SelectedShopId);
  const [errors, setErrors] = useState<ErrorType>({});
  const [loading, setLoading] = useState<boolean>(false);
  const fields: Field[] = useMemo(() => {
    return [
      {
        name: "service_name",
        label: "Service Name",
        placeholder: "Enter your Service name",
        value: "",
        inputFieldBgColor: "#fff",
        inputFieldPlaceholderColor: "#aaa",
        inputFieldStyles: {},
      },
      {
        name: "description",
        label: "Description",
        placeholder: "Enter your Description",
        value: "",
        inputFieldBgColor: "#fff",
        inputFieldPlaceholderColor: "#aaa",
        inputFieldStyles: {},
      },
      {
        name: "price",
        label: "Price",
        placeholder: "Enter your Price",
        value: "",
        inputFieldBgColor: "#fff",
        inputFieldPlaceholderColor: "#aaa",
        inputFieldStyles: {},
      },
    ];
  }, []);

  const [formValues, setFormValues] =
    React.useState<QuickAddActionFormValuesType>({
      service_name: "",
      description: "",
      price: "",
    });

  const handleFormSubmit = async () => {
    setLoading(true);
    const formErrors = validateAddServiceForm(formValues);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setLoading(false);
      return;
    }
    try {
      let { status } = await PostAddNewService({
        body: {
          serviceName: formValues?.service_name ? formValues?.service_name : "",
          description: formValues?.description ? formValues?.description : "",
          price: formValues?.price ? formValues?.price : "",
        },
      });
      if (status === HttpStatus.OK) {
        toast.success("Service added successfully");
        navigate(constants.routeNames.services);
      }
    } catch (error) {
      console.log("error > ", error);
    } finally {
      setFormValues({
        service_name: "",
        description: "",
        price: "",
      });
      setLoading(false);
    }
  };

  const setFormValuesKey = (key: string, value: string | string[]) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));
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
      title="Add New Service"
      buttonTitle="Add New Service"
      onPrimaryButtonClick={handleFormSubmit}
      fields={fields}
      formValues={formValues}
      setFormValues={setFormValues}
      image={AppImages.OrderIcon}
      backgroundColor={constants.colors.serviceBgColor}
      handleInputChange={handleInputChange}
      errors={errors}
      loading={loading}
    />
  );
};

export default AddNewService;
