import React, { useMemo, useState } from "react";
import { AppImages } from "../../../assets/assets";
import { GetAllServicesByShopId } from "../../../services/services";
import { constants } from "../../../utils/constants/constants";
import { useGetDataByShopId } from "../../../utils/hooks/useGetDataByShopId";
import {
  ErrorType,
  Field,
  QuickAddActionFormValuesType,
  ShopEditNavigationStateType,
} from "../../../utils/types/types";
import { validateAddShopForm } from "../../../utils/validation/validation";
import { HttpStatus } from "../../../utils/fetch/fetchAPI";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { SelectedShopId } from "../../../utils/redux/reducer/appState-slice";
import { useLocation, useNavigate } from "react-router-dom";
import { PostAddNewShop, PutEditShop } from "../../../services/shops";
import QuickAddActionFormLayout from "../Dashboard/QuickAddActionFormLayout";
import { useGetAllServices } from "../../../utils/hooks/useGetAllServices";

const AddNewShop = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state }: { state: ShopEditNavigationStateType } = location;
  const { allServices, allServicesLoading } = useGetAllServices();
  const [errors, setErrors] = useState<ErrorType>({});
  const [loading, setLoading] = useState<boolean>(false);
  const fields: Field[] = [
    {
      name: "shop_name",
      label: "Shop Name",
      placeholder: "Enter your shop name",
      value: "",
      inputFieldBgColor: "#fff",
      inputFieldPlaceholderColor: "#aaa",
      inputFieldStyles: {},
    },

    {
      name: "serviceIds",
      label: "Services",
      placeholder: "Select services",
      value: "",
      inputFieldBgColor: "#fff",
      inputFieldPlaceholderColor: "#aaa",
      inputFieldStyles: {},
      isMultiSelectable: true,
      options: allServices?.map((service) => ({
        label: service?.serviceName,
        value: service?._id,
      })),
    },
    {
      name: "location",
      label: "Location",
      placeholder: "Enter your location",
      value: "",
      inputFieldBgColor: "#fff",
      inputFieldPlaceholderColor: "#aaa",
      inputFieldStyles: {},
    },
    {
      name: "city",
      label: "City",
      placeholder: "Enter city",
      value: "",
      inputFieldBgColor: "#fff",
      inputFieldPlaceholderColor: "#aaa",
      inputFieldStyles: {},
    },
    {
      name: "state",
      label: "State",
      placeholder: "Enter state",
      value: "",
      inputFieldBgColor: "#fff",
      inputFieldPlaceholderColor: "#aaa",
      inputFieldStyles: {},
    },
    {
      name: "country",
      label: "Country",
      placeholder: "Enter country",
      value: "",
      inputFieldBgColor: "#fff",
      inputFieldPlaceholderColor: "#aaa",
    },
  ];

  const [formValues, setFormValues] =
    React.useState<QuickAddActionFormValuesType>(
      state.isEdit
        ? state?.shopInfo
        : {
            shop_name: "",
            location: "",
            serviceIds: [],
            city: "",
            state: "",
            country: "",
          }
    );

  const handleFormSubmit = async () => {
    setLoading(true);
    const formErrors = validateAddShopForm(formValues);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setLoading(false);
      return;
    }
    try {
      const shopInfo = {
        shopName: formValues?.shop_name ? formValues?.shop_name : "",
        location: formValues?.location ? formValues?.location : "",
        serviceIds: formValues?.serviceIds ? formValues?.serviceIds : [],
        city: formValues?.city ? formValues?.city : "",
        state: formValues?.state ? formValues?.state : "",
        country: formValues?.country ? formValues?.country : "",
      };
      if (state?.isEdit) {
        let { status } = await PutEditShop({
          body: shopInfo,
          shopId: state?.shopId,
        });
        if (status === HttpStatus.OK) {
          toast.success("Shop Edited successfully");
          navigate(constants.routeNames.shops);
        }
      } else {
        let { status } = await PostAddNewShop({
          body: shopInfo,
        });
        if (status === HttpStatus.Created) {
          toast.success("Shop added successfully");
          navigate(constants.routeNames.shops);
        }
      }
    } catch (error) {
      console.log("error > ", error);
    } finally {
      setFormValues({
        shop_name: "",
        location: "",
        serviceIds: [],
        city: "",
        state: "",
        country: "",
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

  const handleInputChange = (key: string, value: string | string[]) => {
    if (value.length === 0) {
      setErrors({ ...errors, [key]: { message: `${key} is required` } });
    }
    if (errors[key]) {
      setErrors({ ...errors, [key]: null });
    }
    setFormValuesKey(key, value);
  };

  return (
    <QuickAddActionFormLayout
      title={state?.isEdit ? "Edit Shop" : "Add New Shop"}
      buttonTitle={state?.isEdit ? "Edit Shop" : "Add New Shop"}
      onPrimaryButtonClick={handleFormSubmit}
      fields={fields}
      formValues={formValues}
      setFormValues={setFormValues}
      image={AppImages.ShopIcon}
      backgroundColor={constants.colors.shopBgColor}
      handleInputChange={handleInputChange}
      errors={errors}
      loading={loading}
    />
  );
};

export default AddNewShop;
