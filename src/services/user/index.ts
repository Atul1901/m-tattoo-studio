import { URLS } from "../../utils/constants/urls";
import { fetchAPI } from "../../utils/fetch/fetchAPI";
import {
  AddNewCustomerFormType,
  AddNewUserFormType,
} from "../../utils/types/types";
import { GetAllUsersResponse, UserResponse } from "./interface";

const UserApi = async (id: string): Promise<UserResponse> => {
  try {
    const { data, status } = await fetchAPI({
      endpoint: URLS.user(id),
      method: "GET",
      // isErrorShow: false,
    });
    return { data, status };
  } catch (error: any) {
    throw error;
  }
};

const GetAllUsers = async (): Promise<GetAllUsersResponse> => {
  try {
    const { data, status } = await fetchAPI({
      endpoint: URLS.getAllUsers,
      method: "GET",
    });
    return { data, status };
  } catch (error: any) {
    throw error;
  }
};

const PostAddNewUser = async ({ body }: { body: AddNewUserFormType }) => {
  try {
    const { data, status } = await fetchAPI({
      endpoint: URLS.postAddUser,
      method: "POST",
      body: body,
    });
    return { data, status };
  } catch (error: any) {
    throw error;
  }
};

const PutEditUser = async ({
  body,
  userId,
}: {
  body: AddNewUserFormType;
  userId: string;
}) => {
  try {
    const { data, status } = await fetchAPI({
      endpoint: URLS.putEditUser(userId),
      method: "PUT",
      body: body,
    });
    return { data, status };
  } catch (error: any) {
    throw error;
  }
};

const DeleteUser = async ({ userId }: { userId: string }) => {
  try {
    const { data, status } = await fetchAPI({
      endpoint: URLS.deleteUser(userId),
      method: "DELETE",
    });
    return { data, status };
  } catch (error: any) {
    throw error;
  }
};

export { GetAllUsers, PostAddNewUser, UserApi, DeleteUser, PutEditUser };
