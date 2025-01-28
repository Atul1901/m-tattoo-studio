type Constants = {
  localStorageItems: {
    token: string;
    userId: string;
    role: string;
    username: string;
  };
  routeNames: {
    root: string;
    dashboard: string;
    login: string;
    signup: string;
    forgotPassword: string;
    addNewCustomer: string;
    addNewAppointment: string;
    addNewSale: string;
    addNewShop: string;
    addNewUser: string;
    addNewService: string;
    customers: string;
    sales: string;
    appointments: string;
    analytics: string;
    shops: string;
    users: string;
    services: string;
  };
  queryKeys: {
    getAllCustomersByShopId: string;
    getAllServicesByShopId: string;
    getAllSalesByShopId: string;
    getAllAppointmentsByShopId: string;
    getAllShops: string;
    getAllUsers: string;
    getAllServices: string;
  };
  genderSelectionOptions: {
    label: string;
    value: string;
  }[];
  dateFormat: {
    dateTime: string;
  };
  roleOptions: {
    label: string;
    value: string;
  }[];
  colors: {
    customerBgColor: string;
    saleBgColor: string;
    appointmentBgColor: string;
    shopBgColor: string;
    userBgColor: string;
    serviceBgColor: string;
  };
  roles: {
    admin: string;
    super_admin: string;
  };
  currency: string;
};

export const constants: Constants = {
  localStorageItems: {
    // admin_token: "admin_token",
    token: "token",
    userId: "userId",
    role: "role",
    username: "username",
  },
  routeNames: {
    root: "/",
    dashboard: "/dashboard",
    login: "/login",
    signup: "/signup",
    forgotPassword: "/forgot-password",
    addNewCustomer: "/customers/customer",
    addNewAppointment: "/appointments/appointment",
    addNewSale: "/sales/sale",
    customers: "/customers",
    sales: "/sales",
    appointments: "/appointments",
    analytics: "/analytics",
    shops: "/shops",
    users: "/users",
    services: "/services",
    addNewShop: "/shops/shop",
    addNewUser: "/users/user",
    addNewService: "/services/service",
  },
  queryKeys: {
    getAllCustomersByShopId: "getAllCustomersByShopId",
    getAllServicesByShopId: "getAllServicesByShopId",
    getAllSalesByShopId: "getAllSalesByShopId",
    getAllAppointmentsByShopId: "getAllAppointmentsByShopId",
    getAllShops: "getAllShops",
    getAllUsers: "getAllUsers",
    getAllServices: "getAllServices",
  },
  genderSelectionOptions: [
    {
      label: "Male",
      value: "Male",
    },
    {
      label: "Female",
      value: "Female",
    },
    {
      label: "Other",
      value: "Other",
    },
  ],
  dateFormat: {
    dateTime: "YYYY-MM-DDTHH:mm:ss.SSSZ",
  },
  roleOptions: [
    {
      label: "Admin",
      value: "admin",
    },
    // For future scope
    // {
    //   label: "User",
    //   value: "user",
    // },
    // {
    //   label: "Super Admin",
    //   value: "super-admin",
    // },
  ],
  colors: {
    customerBgColor: "rgba(130,128,255, 20%)",
    saleBgColor: "rgba(74, 217, 45, 20%)",
    appointmentBgColor: "rgba(254,197,61, 20%)",
    shopBgColor: "rgba(45,156,219,15%)",
    userBgColor: "rgba(130,128,255, 20%)",
    serviceBgColor: "rgba(254,197,61, 20%)",
  },
  roles: {
    admin: "admin",
    super_admin: "super-admin",
  },
  currency: "₹",
};
