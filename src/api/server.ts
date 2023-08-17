import axios from "axios";

const defaultOptions = {
    baseURL: 'http://192.168.1.4:8080/api/',
    headers: {
      'Content-Type': 'application/json',
    },
  };


let creditcardinstance = axios.create(defaultOptions);

export default creditcardinstance;