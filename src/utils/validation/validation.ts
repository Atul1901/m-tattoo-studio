import {
  LoginFormDataType,
  QuickAddActionFormValuesType,
} from "../types/types";
import { Validator } from "./validator";

export const validateSignIn = (formData: LoginFormDataType) => {
  const { username, password } = formData;
  const usernameV = new Validator({
    value: username,
    key: "username",
    field: "Username",
  })
    // .noSpecialCharacters()
    .required();
  const passwordV = new Validator({
    value: password,
    key: "password",
    field: "Password",
  }).required();
  return { ...usernameV.errors, ...passwordV.errors };
};

export const validateLength = (value: string, key: string, field: string) => {
  const lengthV = new Validator({
    value: value,
    key: key,
    field: field,
  }).required();
  return lengthV.errors;
};

export const validateAddCustomerForm = (
  formData: QuickAddActionFormValuesType
) => {
  const { first_name, last_name, email, phone_number, date_of_birth, gender } =
    formData;

  const first_nameV = new Validator({
    value: first_name,
    key: "first_name",
    field: "First Name",
  }).required();

  const last_nameV = new Validator({
    value: last_name,
    key: "last_name",
    field: "Last Name",
  }).required();

  const emailV = new Validator({
    value: email,
    key: "email",
    field: "Email",
  })
    .required()
    .email();

  const phone_numberV = new Validator({
    value: phone_number,
    key: "phone_number",
    field: "Phone Number",
  }).required();

  const date_of_birthV = new Validator({
    value: date_of_birth,
    key: "date_of_birth",
    field: "Date of birth",
  }).required();

  const genderV = new Validator({
    value: gender,
    key: "gender",
    field: "Gender",
  }).required();

  return {
    ...first_nameV.errors,
    ...last_nameV.errors,
    ...emailV.errors,
    ...phone_numberV.errors,
    ...date_of_birthV.errors,
    ...genderV.errors,
  };
};

export const validateAddSaleForm = (formData: QuickAddActionFormValuesType) => {
  const { customer_number, services, amount } = formData;

  const customer_numberV = new Validator({
    value: customer_number,
    key: "customer_number",
    field: "Customer Number",
  }).required();

  const serviceV = new Validator({
    value: services,
    key: "services",
    field: "Service",
  }).atLeastOne();

  const amountV = new Validator({
    value: amount,
    key: "amount",
    field: "Amount",
  }).required();

  return {
    ...customer_numberV.errors,
    ...serviceV.errors,
    ...amountV.errors,
  };
};

export const validateAddAppointmentForm = (
  formData: QuickAddActionFormValuesType
) => {
  const { date, services, phone_number, first_name, last_name } = formData;

  const first_nameV = new Validator({
    value: first_name,
    key: "first_name",
    field: "First Name",
  }).required();

  const last_nameV = new Validator({
    value: last_name,
    key: "last_name",
    field: "Last Name",
  }).required();

  const dateV = new Validator({
    value: date,
    key: "date",
    field: "Date & time",
  }).required();

  const servicesV = new Validator({
    value: services,
    key: "services",
    field: "Service",
  }).atLeastOne();

  const phone_numberV = new Validator({
    value: phone_number,
    key: "phone_number",
    field: "Phone Number",
  }).required();

  return {
    ...first_nameV.errors,
    ...last_nameV.errors,
    ...dateV.errors,
    ...servicesV.errors,
    ...phone_numberV.errors,
  };
};

export const validateAddShopForm = (formData: QuickAddActionFormValuesType) => {
  const { shop_name, location, serviceIds, city, state, country } = formData;
  const shop_nameV = new Validator({
    value: shop_name,
    key: "shop_name",
    field: "Shop Name",
  }).required();

  const locationV = new Validator({
    value: location,
    key: "location",
    field: "Location",
  }).required();

  const cityV = new Validator({
    value: city,
    key: "city",
    field: "City",
  }).required();

  const stateV = new Validator({
    value: state,
    key: "state",
    field: "State",
  }).required();

  const countryV = new Validator({
    value: country,
    key: "country",
    field: "Country",
  }).required();

  const serviceIdsV = new Validator({
    value: serviceIds,
    key: "serviceIds",
    field: "At least one service",
  }).atLeastOne();

  return {
    ...shop_nameV.errors,
    ...locationV.errors,
    ...cityV.errors,
    ...stateV.errors,
    ...countryV.errors,
    ...serviceIdsV.errors,
  };
};

export const validateAddUserForm = (formData: QuickAddActionFormValuesType) => {
  const { username, password, role, shopIds } = formData;

  const usernameV = new Validator({
    value: username,
    key: "username",
    field: "Username",
  }).required();

  const passwordV = new Validator({
    value: password,
    key: "password",
    field: "Password",
  }).required();

  const roleV = new Validator({
    value: role,
    key: "role",
    field: "Role",
  }).required();

  const shopIdsV = new Validator({
    value: shopIds,
    key: "shopIds",
    field: "At least one shop",
  }).atLeastOne();

  return {
    ...usernameV.errors,
    ...passwordV.errors,
    ...roleV.errors,
    ...shopIdsV.errors,
  };
};

export const validateAddServiceForm = (
  formData: QuickAddActionFormValuesType
) => {
  const { service_name, description, price } = formData;
  const service_nameV = new Validator({
    value: service_name,
    key: "service_name",
    field: "Service Name",
  }).required();

  const descriptionV = new Validator({
    value: description,
    key: "description",
    field: "Description",
  }).required();

  const priceV = new Validator({
    value: price,
    key: "price",
    field: "Price",
  }).required();

  return {
    ...service_nameV.errors,
    ...descriptionV.errors,
    ...priceV.errors,
  };
};
