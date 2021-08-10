import axios from 'axios'

let headers;
//const baseURL = 'http://104.248.39.252:5000/sufle/v1';
const baseURL = 'http://localhost:5000/sufle/v1';


try {
   headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'token': localStorage.token ? JSON.parse(localStorage.token) : ''
   };
} catch (e) {
   console.log(e);
}

const instance = axios.create({
   baseURL,
   timeout: 0,
   headers
});

instance.interceptors.response.use(
   function (response) {
      return response;
   },
   function (error) {
      return error;
   }
);

export default instance;
