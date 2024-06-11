import { COOKIE } from "@/constants/common";
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  HttpStatusCode
} from "axios";
import Cookies from "js-cookie";

export enum HttpMethod {
  Get = "get",
  Post = "post",
  Put = "put",
  Delete = "delete"
}

export function httpRequest(
  config: AxiosRequestConfig,
  options?: { suppressErrorToasts: boolean }
) {
  const timezoneOffset = -new Date().getTimezoneOffset();
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
      "x-timezone": timezoneOffset
    }
  });

  if (!options?.suppressErrorToasts) {
    const setAuthorizationHeader = (
      request: AxiosRequestConfig | any,
      token: string
    ) => {
      request.headers.Authorization = `Bearer ${token}`;
    };

    const onRequest = (config: AxiosRequestConfig | any) => {
      const token = Cookies.get(COOKIE.TOKEN);
      token && setAuthorizationHeader(config, token);
      return config;
    };

    const onRequestError = (error: AxiosError) => {
      return Promise.reject(error);
    };

    const onResponse = (response: AxiosResponse) => {
      return response;
    };

    const onResponseError = (error: AxiosError | any) => {
      if (error.isAxiosError) {
        if (error.code === HttpStatusCode.InternalServerError) {
          // showToast(error.message, 'error');
        }

        switch (error.response?.status) {
          case HttpStatusCode.BadRequest:
            // showToast(error?.message, 'error');
            break;

          case HttpStatusCode.Unauthorized:
            // window.location.href = ROUTES_PATH.LOGOUT;
            break;

          case HttpStatusCode.UnprocessableEntity:
            // window.location.href = ROUTES_PATH.FORBIDDEN;
            break;

          case HttpStatusCode.InternalServerError:
            // showToast(error?.message, 'error');
            break;

          default:
            return Promise.reject(error.response);
        }
      }

      return Promise.reject(error.response);
    };

    instance.interceptors.request.use(onRequest, onRequestError);
    instance.interceptors.response.use(onResponse, onResponseError);
  }

  return instance(config);
}
