import { AxiosError } from "axios";
import { deleteCookie } from "cookies-next";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { axiosInstance } from "@/axios";
import { setCookie } from "cookies-next";

export function handleSessionError(
  error: AxiosError | any,
  router: AppRouterInstance
): void {
  if (error?.response?.status === 401) {
    console.error(error.response?.data?.detail || "Something went wrong");
    deleteCookie("auth");
    router.push("/login");
  } else {
    console.error(error?.response?.data?.detail || "Something went wrong");
  }
}

export function handleSuccess(description: string): void {}

export const saveBearer = (bearer: string, name: string) => {
  setCookie("auth", bearer);
  setCookie("name", name);
  axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + bearer;
};

export const parseJwt = (token: string) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

export const parseJwtServer = (token: string) => {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
};
