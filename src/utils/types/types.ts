import { Dayjs } from "dayjs";

export type ThemeType = {
  colors: {
    primary: string;
    backgroundColor: string;
    white: string;
    searchBarBgColor: string;
    themePrimaryColor: string;
    themeSecondaryColor: string;
    shopIconBgColor: string;
    redColor: string;
  };
  icons: {
    ShopIcon: string;
    EyeIcon: string;
    EyeSlashIcon: string;
    ErrorIcon: string;
  };
  images: {};
};

export type LoginFormDataType = {
  username: string;
  password: string;
};

export type ErrorType = {
  [key: string]: {
    message: string;
  } | null;
};

export type UserInfoType = {
  _id?: string;
  username?: string;
  password?: string;
  role?: string;
  shopIds?: ShopInfoType[];
  _v?: number;
};

export type RoleInfoType = {
  [key: string]: {
    application_code?: string;
    module_code?: string;
    all?: boolean;
    add?: boolean;
    edit?: boolean;
    delete?: boolean;
    view?: boolean;
    export?: boolean;
  };
};

export type authTokenDecodedDataType = {
  userId: string;
  role: string;
  iat: number;
  exp: number;
};

export type Field = {
  name: string;
  type?: "text" | "password" | "email" | "number" | "date" | "datetime-local";
  label: string;
  placeholder: string;
  value: string;
  isPasswordField?: boolean;
  inputFieldBgColor?: string;
  inputFieldPlaceholderColor?: string;
  inputFieldStyles?: React.CSSProperties;
  options?: {
    label: string;
    value: string;
  }[];
  isSelectable?: boolean;
  isMultiSelectable?: boolean;
  isDisabled?: boolean;
};

export type StatsCardInfoType = {
  title: string;
  image: string;
  backgroundColor: string;
  percentage: string;
  type: "increase" | "decrease";
  value: number;
  unit: string;
  comparedTo: string;
  key: string;
  getComponent: ({
    data,
    loading,
  }: {
    data: any[];
    loading: boolean;
  }) => JSX.Element;
};

export type AddNewCustomerFormType = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
};

export type AddNewAppointmentFormType = {
  firstName: string;
  lastName: string;
  date: string;
  shopId: string;
  status: string;
  serviceIds: string[];
  phoneNumber: string;
};

export type AddNewSaleFormType = {
  phoneNumber: string;
  serviceIds: string[];
  amount: string;
  shopId: string;
};

export type AddNewShopFormType = {
  shopName: string;
  location: string;
  serviceIds: string[];
  city: string;
  state: string;
  country: string;
};

export type AddNewUserFormType = {
  username: string;
  password: string;
  role: string;
  shopIds: string[];
};

export type AddNewServiceFormType = {
  serviceName: string;
  description: string;
  price: string;
};

export type QuickAddActionFormValuesType = {
  // Add New Customer
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  date_of_birth?: string;
  gender?: string;
  // Add New Appointment
  customer_number?: string;
  customer_name?: string;
  date?: string;
  services?: string[];
  status?: string;
  // Add New Sale
  amount?: string;
  // Add New Shop
  shop_name?: string;
  location?: string;
  city?: string;
  state?: string;
  country?: string;
  serviceIds?: string[];
  // Add New User
  username?: string;
  password?: string;
  role?: string;
  shopIds?: string[];
  // Add New Service
  service_name?: string;
  description?: string;
  price?: string;
  shopId?: string;
};

export interface ServiceInfoType {
  _id: string;
  serviceName: string;
  description: string;
  price: number;
  createdBy: string;
  shopId: string;
  __v: number;
}
export interface CustomerInfoType {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: string;
  age?: string;
  createdAt?: string;
  updatedAt?: string;
  __v: 0;
}

export interface SaleInfoType {
  _id?: string;
  customerId?: CustomerInfoType;
  serviceIds?: ServiceInfoType[];
  date?: string;
  amount?: number;
  shopId?: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: UserInfoType;
  __v: number;
}

export interface ShopInfoType {
  _id: string;
  shopName: string;
  location: string;
  serviceIds: ServiceInfoType[];
}
export interface AppointmentInfoType {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  serviceIds: ServiceInfoType[];
  date: string;
  status: string;
  shopId: string;
  createdBy: UserInfoType;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type ColumnInfoType = {
  label: string;
  key: string;
  dataIndex: string;
  align: "right" | "left" | "center";
};

export type DateRangeStateType = {
  startDate: Dayjs;
  endDate: Dayjs;
};

export type CustomerEditNavigationStateType = {
  customerId: string;
  customerInfo: QuickAddActionFormValuesType;
  isEdit: boolean;
};

export type SaleEditNavigationStateType = {
  saleId: string;
  saleInfo: QuickAddActionFormValuesType;
  isEdit: boolean;
};

export type AppointmentEditNavigationStateType = {
  appointmentId: string;
  appointmentInfo: QuickAddActionFormValuesType;
  isEdit: boolean;
};

export type ShopEditNavigationStateType = {
  shopId: string;
  shopInfo: QuickAddActionFormValuesType;
  isEdit: boolean;
};

export type ServiceEditNavigationStateType = {
  serviceId: string;
  serviceInfo: QuickAddActionFormValuesType;
  isEdit: boolean;
};

export type UserEditNavigationStateType = {
  userId: string;
  userInfo: QuickAddActionFormValuesType;
  isEdit: boolean;
};
