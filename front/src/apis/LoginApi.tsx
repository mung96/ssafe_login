import axios from "axios";

const LoginApi = axios.create({
  baseURL: "http://localhost:8000/auth",
});

export const test = () => {
  const response = LoginApi.get("/test", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "refresh-token": localStorage.getItem("refresh_token"),
    },
  });
  return response;
};
