import axios, { AxiosError, AxiosResponse } from "axios";
import { store } from "../store/store";

const sleep = () => new Promise(resolve => setTimeout(resolve, 0));

axios.defaults.baseURL = "http://localhost:5163/api";
axios.defaults.withCredentials = true;

const responseBody = (response: any) => response.data;

axios.interceptors.request.use(config => {
  const token = store.getState().admin.token;
  if (token) config.headers.Authorization = 'Bearer ' + token;
  return config;
});

axios.interceptors.response.use(async response => {
  // I set a timeout here to simulate a delay in the server response
  // to manage the loading indicator
  await sleep();
  return response;
}, (error: AxiosError) => {
  const { data, status } = error.response as AxiosResponse;
  switch (status) {
      case 400: // Usally with modelState with errors array
          break;
      case 401: // Unauthorized
          break;
      case 500: // Server error
          break;
      default: // Other errors
          break;
  }
  return Promise.reject(error.response);
});

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url:string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url:string ) => axios.delete(url).then(responseBody),
  };
  
const Auth = {
    login: (username: string, password: string) => requests.post('Auth/login', {username, password}),
};

const Clients = {
  create: (rut:string, name:string, lastname:string, email:string, points:number) => requests.post('User/create', {rut, name, lastname, email, points}),
  list: () =>  requests.get('User/read'),
  delete : (id: number) => requests.delete(`User/delete/${id}`),
  update: (rut:string, name:string, lastname:string, email:string, points:number) => requests.put(`User/update/${rut}`, {name, lastname, email, points}),
};

const agent = {Auth, Clients}

export default agent;