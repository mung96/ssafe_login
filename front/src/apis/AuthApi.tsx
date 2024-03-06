import axios from "axios";

const AuthApi = axios.create({
  baseURL: "http://localhost:8000/auth",
});

export const signup = (
  email: string,
  password: string,
  passwordConfirm: string
) => {
  const response = AuthApi.post("/signup", {
    email: email,
    pw: password,
    comparePw: passwordConfirm,
  });
  return response;
};

export const test = () => {
  const response = AuthApi.get("/test", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "refresh-token": localStorage.getItem("refresh_token"),
    },
  });
  return response;
};
