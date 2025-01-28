import toast from "react-hot-toast";
import { fetchFromStorage } from "../storage";
import { constants } from "../constants/constants";
import { handleLogout } from "../redux";

export type HTTP_METHOD = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const API_URL = process.env.REACT_APP_API_URL;

export enum HttpStatus {
  OK = 200,
  Created = 201,
  NoContent = 204,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
}
interface IProps {
  endpoint: string;
  method: HTTP_METHOD;
  body?: any;
  isFormData?: boolean;
  isErrorShow?: boolean;
  params?: Record<string, string | number | null>;
}

type catchErrorType = { details: "" };

export const fetchAPI = async ({
  endpoint,
  method,
  body,
  isFormData = false,
  isErrorShow = true,
  params,
}: IProps): Promise<{ status: number; data: any }> => {
  try {
    const token = await fetchFromStorage(constants.localStorageItems.token);
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    };

    const options: RequestInit = {
      method,
      headers,
      body: JSON.stringify(body),
    };

    const queryString = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        queryString.append(key, value ? value.toString() : "");
      });
    }

    let fullUrl = queryString.toString()
      ? `${API_URL}${endpoint}?${queryString}`
      : `${API_URL}${endpoint}`;

    // console.log("endpoint===>", fullUrl);
    // console.log("Request Params ===>", options);

    const response = await fetch(fullUrl, options);

    const status = response.status;

    let data;
    if (status !== HttpStatus.NoContent) {
      data = await response.json();
    }

    if (status === HttpStatus.Unauthorized) {
      handleLogout();
    }

    if (!response.ok) {
      let errorMessage = "An error occurred while processing your request.";

      if (typeof data === "object" && data?.error?.message) {
        errorMessage = data.error.message as string;
      }
      throw new Error(errorMessage);
    }

    // console.log("Response ===>", data);
    return { status, data };
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(endpoint + " API error ==>", err.message);
      if (isErrorShow) {
        toast.error(err.message);
      }
    }
    throw err;
  }
};
