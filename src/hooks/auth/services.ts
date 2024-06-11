import { ISignInPayload } from "./types";
import Cookies from "js-cookie";
import { COOKIE } from "@/constants/common";
import { AUTH_API } from "@/constants/api-endpoints";
import { HttpMethod, httpRequest } from "@/utils/axios";

export const signIn = async (data: ISignInPayload) => {
  const result = await httpRequest({
    method: HttpMethod.Post,
    url: AUTH_API.signIn.api,
    data
  });

  Cookies.set(COOKIE.TOKEN, result.data.accessToken);

  return result.data;
};
