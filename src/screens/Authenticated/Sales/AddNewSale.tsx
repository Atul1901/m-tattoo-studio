import React, { useMemo, useState } from "react";
import { AppImages } from "../../../assets/assets";
import { GetAllServicesByShopId } from "../../../services/services";
import { constants } from "../../../utils/constants/constants";
import { useGetDataByShopId } from "../../../utils/hooks/useGetDataByShopId";
import {
  ErrorType,
  Field,
  QuickAddActionFormValuesType,
} from "../../../utils/types/types";
import { validateAddSaleForm } from "../../../utils/validation/validation";
import { PostAddNewSale } from "../../../services/sales";
import { HttpStatus } from "../../../utils/fetch/fetchAPI";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { SelectedShopId } from "../../../utils/redux/reducer/appState-slice";
import { useNavigate } from "react-router-dom";
import QuickAddActionFormLayout from "../Dashboard/QuickAddActionFormLayout";

const AddNewSale = () => {
  const navigate = useNavigate();
  const shopId = useSelector(SelectedShopId);
  const { data: allServicesByShopId } = useGetDataByShopId({
    queryFn: GetAllServicesByShopId,
    queryKey: constants.queryKeys.getAllServicesByShopId,
  });
  const [errors, setErrors] = useState<ErrorType>({});
  const [loading, setLoading] = useState<boolean>(false);
  const fields: Field[] = useMemo(() => {
    return [
      {
        name: "customer_number",
        label: "Custome Phone Number",
        placeholder: "Enter your customer phone number",
        value: "",
        inputFieldBgColor: "#fff",
        inputFieldPlaceholderColor: "#aaa",
        inputFieldStyles: {},
      },
      {
        name: "services",
        label: "Services",
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
        name: "amount",
        label: "Amount",
        placeholder: "Enter the amount",
        value: "",
        inputFieldBgColor: "#fff",
        inputFieldPlaceholderColor: "#aaa",
        inputFieldStyles: {},
      },
    ];
  }, [allServicesByShopId]);

  const [formValues, setFormValues] =
    React.useState<QuickAddActionFormValuesType>({
      customer_number: "",
      services: [],
      amount: "",
    });

  const handleFormSubmit = async () => {
    setLoading(true);
    const formErrors = validateAddSaleForm(formValues);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setLoading(false);
      return;
    }
    try {
      let { status } = await PostAddNewSale({
        body: {
          amount: formValues.amount || "",
          phoneNumber: formValues.customer_number || "",
          serviceIds: formValues.services || [],
          shopId: shopId,
        },
      });
      if (status === HttpStatus.OK) {
        toast.success("Sale added successfully");
        navigate(constants.routeNames.sales);
      }
    } catch (error) {
      console.log("error > ", error);
    } finally {
      setFormValues({
        customer_number: "",
        services: [],
        amount: "",
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
      title="Add New Sale"
      buttonTitle="Add New Sale"
      onPrimaryButtonClick={handleFormSubmit}
      fields={fields}
      formValues={formValues}
      setFormValues={setFormValues}
      image={AppImages.SaleIcon}
      backgroundColor={constants.colors.saleBgColor}
      handleInputChange={handleInputChange}
      errors={errors}
      loading={loading}
    />
  );
};

export default AddNewSale;
