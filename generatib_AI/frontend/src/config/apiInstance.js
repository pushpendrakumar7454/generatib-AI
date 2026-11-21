import axios from "axios";
import { store } from "../app/store";
import { setAccessToken } from "../features/auth/state/authSlice";

const apiInstance = axios.create({
  baseURL: "http://localhost:5173/api",
  withCredentials: true,
});

apiInstance.interceptors.request.use((config) => {
  const accessToken = store.getState().auth.accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});


apiInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            const res = await axios.post(
                "http://localhost:5173/api/auth/refresh",
                {},
                {
                    withCredentials: true,
                }
            );
            store.dispatch(
                setAccessToken(res.data.accessToken)
            );
            error.config.headers.Authorization = `Bearer ${res.data.accessToken}`;
            return apiInstance(error.config);
        }

        return Promise.reject(error);
    }
);

export default apiInstance