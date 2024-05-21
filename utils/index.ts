import { AxiosError } from "axios";
import { deleteCookie } from "cookies-next";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

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
