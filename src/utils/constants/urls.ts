export const URLS = {
  login: "auth/login",
  user: (id: string) => `api/users/${id}`,
  shopsDetails: "api/shops/details",
  getAllCustomersByShopId: `api/customers`,
  getAllServicesByShopId: (shopId: string) => `api/services/shop/${shopId}`,
  getAllSalesByShopId: `api/sales`,
  getAllAppointmentsByShopId: `api/appointments`,
  postAddCustomer: "api/customers/add",
  postAddSale: "api/sales/add",
  postAddAppointment: "api/appointments/add",
  getAllShops: "api/shops",
  getAllUsers: "api/users",
  getAllServices: "api/services",
  postAddUser: "api/users",
  postAddShop: "api/shops",
  postAddService: "api/services/add",
  //Edit APIs
  putEditCustomer: (id: string) => `api/customers/${id}`,
  putEditSale: (id: string) => `api/sales/${id}`, // Not allowed because of tempering with sales data
  putEditAppointment: (id: string) => `api/appointments/${id}`,
  putEditUser: (id: string) => `api/users/${id}`,
  putEditShop: (id: string) => `api/shops/${id}`,
  // Delete APIs
  deleteCustomer: (id: string) => `api/customers/${id}`,
  deleteSale: (id: string) => `api/sales/${id}`,
  deleteAppointment: (id: string) => `api/appointments/${id}`,
  deleteUser: (id: string) => `api/users/${id}`,
  deleteShop: (id: string) => `api/shops/${id}`,
  deleteService: (id: string) => `api/services/${id}`,
};
