interface LoginParams {
  username: string;
  password: string;
}

interface LoginResponseType {
  status: number;
  data: {
    token: string;
    user: {
      userId: string;
      role: string;
      username: string; // need to check later as currently taking from ui side
    };
  };
}

export type { LoginParams, LoginResponseType };
