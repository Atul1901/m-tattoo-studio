import { LoginParams, LoginResponseType } from "./interface";
import { fetchAPI } from "../../utils/fetch/fetchAPI";
import { URLS } from "../../utils/constants/urls";

const LoginApi = async (params: LoginParams): Promise<LoginResponseType> => {
  try {
    const { username, password } = params;
    const bodyRequest = {
      username,
      password,
    };

    const { data, status } = await fetchAPI({
      endpoint: URLS.login,
      method: "POST",
      body: bodyRequest,
      // isErrorShow: false,
    });
    return { data, status };
  } catch (error: any) {
    throw error;
  }
};

export { LoginApi };
