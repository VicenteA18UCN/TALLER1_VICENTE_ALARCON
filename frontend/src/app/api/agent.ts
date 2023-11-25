import axios, { AxiosError, AxiosResponse } from "axios";
import { store } from "../store/store";

/**
 * Función que devuelve una promesa que se resuelve después de un tiempo de espera.
 * @function
 * @returns {Promise<void>} - Una promesa que se resuelve después de un tiempo de espera.
 */
const sleep = () => new Promise(resolve => setTimeout(resolve, 0));

axios.defaults.baseURL = "http://localhost:5163/api";
axios.defaults.withCredentials = true;
/**
 * Función auxiliar que extrae la propiedad `data` de la respuesta de una petición.
 * @function
 * @param {any} response - Respuesta de la petición.
 * @returns {any} - La propiedad `data` de la respuesta.
 */
const responseBody = (response: any) => response.data;

/**
 * Interceptor de solicitud para adjuntar el token de autenticación a las solicitudes salientes.
 * @function
 * @param {object} config - Configuración de la solicitud.
 * @returns {object} - Configuración de la solicitud con el token de autenticación adjunto.
 */
axios.interceptors.request.use(config => {
  const token = store.getState().admin.token;
  if (token) config.headers.Authorization = 'Bearer ' + token;
  return config;
});

/**
 * Interceptor de respuesta para manejar respuestas y errores comunes.
 * @function
 * @param {object} response - Respuesta de la petición.
 * @returns {Promise<object>} - Promesa que resuelve con la respuesta original después de una espera simulada.
 * @param {AxiosError} error - Error de la petición.
 * @returns {Promise<Error>} - Promesa que rechaza con el error original.
 */
axios.interceptors.response.use(async response => {
  await sleep();
  return response;
}, (error: AxiosError) => {
  const { data, status } = error.response as AxiosResponse;
  switch (status) {
      case 400: 
          break;
      case 401: 
          break;
      case 500: 
          break;
      default: 
          break;
  }
  return Promise.reject(error.response);
});

/**
 * Objeto que contiene funciones para realizar solicitudes HTTP comunes.
 * @namespace
 * @property {function} get - Función para realizar solicitudes GET.
 * @property {function} post - Función para realizar solicitudes POST.
 * @property {function} put - Función para realizar solicitudes PUT.
 * @property {function} delete - Función para realizar solicitudes DELETE.
 */
const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url:string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url:string ) => axios.delete(url).then(responseBody),
  };
  
  /**
 * Objeto que contiene funciones relacionadas con la autenticación.
 * @namespace
 * @property {function} login - Función para realizar la autenticación de un usuario.
 */
const Auth = {
    login: (username: string, password: string) => requests.post('Auth/login', {username, password}),
};

/**
 * Objeto que contiene funciones para realizar operaciones relacionadas con clientes.
 * @namespace
 * @property {function} create - Función para crear un nuevo cliente.
 * @property {function} list - Función para obtener la lista de clientes.
 * @property {function} delete - Función para eliminar un cliente.
 * @property {function} update - Función para actualizar la información de un cliente.
 */
const Clients = {
  create: (rut:string, name:string, lastname:string, email:string, points:number) => requests.post('User/create', {rut, name, lastname, email, points}),
  list: () =>  requests.get('User/read'),
  delete : (id: number) => requests.delete(`User/delete/${id}`),
  update: (rut:string, name:string, lastname:string, email:string, points:number) => requests.put(`User/update/${rut}`, {name, lastname, email, points}),
};

/**
 * Objeto que agrupa funciones relacionadas con la autenticación y operaciones con clientes.
 * @type {object}
 * @property {object} Auth - Funciones relacionadas con la autenticación.
 * @property {object} Clients - Funciones relacionadas con operaciones de clientes.
 */
const agent = {Auth, Clients}

export default agent;