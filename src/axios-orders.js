import axios from "axios";
const instance = axios.create({
  baseURL: "https://react-burger-app-c4c8c.firebaseio.com/"
});

export default instance;
