import { AxiosError } from "axios";
import { deleteCookie } from "cookies-next";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { axiosInstance } from "@/axios";
import { setCookie } from "cookies-next";

export function handleSessionError(
  error: AxiosError | any,
  router: AppRouterInstance,
  toast: any
): void {
  if (error?.response?.status === 401) {
    toast({
      title: "Session Expired",
      description: "Please login again",
      duration: 2000,
    });
    deleteCookie("auth");
    router.push("/login");
  } else {
    toast({
      title: "Error",
      description: error?.response?.data?.message || "Something went wrong",
      duration: 2000,
    });
  }
}

export const saveBearer = (bearer: string, name: string, image: string) => {
  setCookie("auth", bearer);
  setCookie("name", name);
  setCookie("image", image);
  axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + bearer;
};
