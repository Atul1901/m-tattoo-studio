import { UserInfoType } from "../../utils/types/types";

interface UserResponse {
  status: number;
  data: {
    _id: string;
    username: string;
    role: string;
    shopIds: [string];
  };
}

interface GetAllUsersResponse {
  status: number;
  data: UserInfoType[];
}

export type { UserResponse, GetAllUsersResponse };
