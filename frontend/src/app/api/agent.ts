import axios from "axios";

axios.defaults.baseURL = "http://localhost:5163/api";

const responseBody = (response: any) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url:string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url:string ) => axios.delete(url).then(responseBody),
  };
  
const Login = {
    login: (email: string, password: string) => requests.post('Auth/login', {email, password}),
}

const agent = {Login}

export default agent;