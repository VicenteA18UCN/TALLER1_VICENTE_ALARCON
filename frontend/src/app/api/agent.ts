import axios from "axios";


axios.defaults.baseURL = "http://localhost:5163/api";

const responseBody = (response: any) => response.data;

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
  list: () =>  requests.get('User/read'),
  delete : (id: number) => requests.delete(`User/delete/${id}`),
  update: (rut:string, name:string, lastname:string, email:string, points:number) => requests.put(`User/update/${rut}`, {name, lastname, email, points}),
};

const agent = {Auth, Clients}

export default agent;