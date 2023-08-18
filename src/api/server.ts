import axios from "axios";

const defaultOptions = {
    baseURL: 'http://172.31.30.170:8080/api/',
    headers: {
      'Content-Type': 'application/json',
    },
  };


let creditcardinstance = axios.create(defaultOptions);

export default creditcardinstance;