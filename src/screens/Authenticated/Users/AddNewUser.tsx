import React, { useMemo, useState } from "react";
import { AppImages } from "../../../assets/assets";
import { GetAllServicesByShopId } from "../../../services/services";
import { constants } from "../../../utils/constants/constants";
import { useGetDataByShopId } from "../../../utils/hooks/useGetDataByShopId";
import {
  ErrorType,
  Field,
  QuickAddActionFormValuesType,
  UserEditNavigationStateType,
} from "../../../utils/types/types";
import { validateAddUserForm } from "../../../utils/validation/validation";
import { HttpStatus } from "../../../utils/fetch/fetchAPI";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { SelectedShopId } from "../../../utils/redux/reducer/appState-slice";
import { useLocation, useNavigate } from "react-router-dom";
import QuickAddActionFormLayout from "../Dashboard/QuickAddActionFormLayout";
import { useGetAllShops } from "../../../utils/hooks/useGetAllShops";
import { PostAddNewUser, PutEditUser } from "../../../services/user";

const AddNewUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state }: { state: UserEditNavigationStateType } = location;
  const shopId = useSelector(SelectedShopId);
  const { allShops, allShopsLoading } = useGetAllShops();
  const [errors, setErrors] = useState<ErrorType>({});
  const [loading, setLoading] = useState<boolean>(false);
  const fields: Field[] = [
    {
      name: "username",
      label: "Username",
      placeholder: "Enter Username",
      value: "",
      inputFieldBgColor: "#fff",
      inputFieldPlaceholderColor: "#aaa",
      inputFieldStyles: {},
      isDisabled: state?.isEdit ? true : false,
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter Password",
      value: "",
      inputFieldBgColor: "#fff",
      inputFieldPlaceholderColor: "#aaa",
      inputFieldStyles: {},
    },
    {
      name: "role",
      label: "Role",
      placeholder: "Select Role",
      value: "",
      inputFieldBgColor: "#fff",
      inputFieldPlaceholderColor: "#aaa",
      inputFieldStyles: {},
      options: constants.roleOptions,
      isSelectable: true,
      isDisabled: state?.isEdit ? true : false,
    },
    {
      name: "shopIds",
      label: "Shops",
      placeholder: "Select Shops",
      value: "",
      inputFieldBgColor: "#fff",
      inputFieldPlaceholderColor: "#aaa",
      inputFieldStyles: {},
      isMultiSelectable: true,
      options: allShops?.map((shop) => ({
        label: shop?.shopName,
        value: shop?._id,
      })),
    },
  ];

  const [formValues, setFormValues] =
    React.useState<QuickAddActionFormValuesType>(
      state.isEdit
        ? state?.userInfo
        : {
            username: "",
            password: "",
            role: "",
            shopIds: [],
          }
    );

  const handleFormSubmit = async () => {
    setLoading(true);
    const formErrors = validateAddUserForm(formValues);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setLoading(false);
      return;
    }
    try {
      const userInfo = {
        username: formValues?.username ? formValues?.username : "",
        password: formValues?.password ? formValues?.password : "",
        role: formValues?.role ? formValues?.role : "",
        shopIds: formValues?.shopIds ? formValues?.shopIds : [],
      };
      if (state?.isEdit) {
        let { status } = await PutEditUser({
          body: userInfo,
          userId: state.userId,
        });
        if (status === HttpStatus.OK) {
          toast.success("User Edited successfully");
          navigate(constants.routeNames.users);
        }
      } else {
        let { status } = await PostAddNewUser({
          body: userInfo,
        });
        if (status === HttpStatus.OK) {
          toast.success("User added successfully");
          navigate(constants.routeNames.users);
        }
      }
    } catch (error) {
      console.log("error > ", error);
    } finally {
      setFormValues({
        username: "",
        password: "",
        role: "",
        shopIds: [],
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
      setErrors({
        ...errors,
        [key]: {
          message:
            key === "shopIds"
              ? "At least one shop is Required"
              : `${field} is required`,
        },
      });
    }
    if (errors[key]) {
      setErrors({ ...errors, [key]: null });
    }
    setFormValuesKey(key, value);
  };

  return (
    <QuickAddActionFormLayout
      title={state?.isEdit ? "Edit User" : "Add New User"}
      buttonTitle={state?.isEdit ? "Edit User" : "Add New User"}
      onPrimaryButtonClick={handleFormSubmit}
      fields={fields}
      formValues={formValues}
      setFormValues={setFormValues}
      image={AppImages.PersonIcon}
      backgroundColor={constants.colors.customerBgColor}
      handleInputChange={handleInputChange}
      errors={errors}
      loading={loading}
    />
  );
};

export default AddNewUser;
