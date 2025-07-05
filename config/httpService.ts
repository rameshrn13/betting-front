import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

const { SERVICE_BASE_URL } = process.env;

// Set the base URL for all requests

export const BaseUrl = SERVICE_BASE_URL || "http://localhost:53321/";

axios.defaults.baseURL = BaseUrl; //  url

// Request Interceptor
axios.interceptors.request.use(
  async (
    request: AxiosRequestConfig<any>
  ): Promise<InternalAxiosRequestConfig<any>> => {
    console.log({ request });

    // Add custom header
    request.headers = {
      ...request.headers,
      Credentials: true,
    };

    return request as InternalAxiosRequestConfig<any>;
  }
);

// Helper function to handle GET requests with query params
const getWithParams = async (url: string, params = {}) => {
  try {
    // Convert params object to query string using URLSearchParams
    const queryParams = new URLSearchParams(params).toString();

    // If there are query params, append them to the URL
    const finalUrl = queryParams ? `${url}?${queryParams}` : url;

    // Make the GET request with the constructed URL
    return await axios.get(finalUrl);
  } catch (ex) {
    console.log({ ex });
  }
};

// Response Interceptor
axios.interceptors.response.use(null, (err) => {
  const expectedError =
    err.response && err.response.status >= 400 && err.response.status < 500;

  if (!expectedError) {
    // Handle unexpected errors
    console.log("Unexpected error occurred ", err);
  }

  return Promise.reject(err);
});

// Custom axios service that distinguishes between GET and POST requests
const httpService = {
  // Regular GET method
  get: async (url: string, params?: object) => {
    // If `params` are passed, we will use `getWithParams` for GET requests
    if (params && Object.keys(params).length > 0) {
      return getWithParams(url, params);
    }
    return axios.get(url);
  },

  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
  getWithParams,
};

export default httpService;
