import axios from "axios";
import { getCookie } from "cookies-next";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

const auth = getCookie("auth");
if (auth) {
  axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + auth;
}
