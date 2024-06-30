import { api, handleResponse, handleError } from "./apiServices";

export const loginApi = (data) =>
  api().post("/api/user/login", data).then(handleResponse).catch(handleError);

export const logoutApi = (token) =>
  api(token).get("/api/user/logout").then(handleResponse).catch(handleError);

export const register = (data) =>
  api()
    .post("/api/user/register", data)
    .then(handleResponse)
    .catch(handleError);

export const checkApi = (token) =>
  api(token).get("/api/user/check").then(handleResponse).catch(handleError);
