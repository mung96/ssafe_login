import { useState } from "react";
import { AxiosError } from "axios";
import { LoginErrorMsg } from "../components/loginform/LoginErrorMsg";

export const useErrorMsg = () => {
  const [errorMsg, setErrorMsg] = useState<string>("");

  const decideErrorMsg = (error: AxiosError) => {
    const status = error.response?.status;
    switch (status) {
      case 400:
        setErrorMsg(LoginErrorMsg[400]);
        break;
      case 406:
        setErrorMsg(LoginErrorMsg[406]);
        break;
      case 500:
        setErrorMsg(LoginErrorMsg[500]);
        break;
      default:
        setErrorMsg("알 수 없는 오류가 발생했습니다.");
        break;
    }
  };

  return { errorMsg, decideErrorMsg };
};
