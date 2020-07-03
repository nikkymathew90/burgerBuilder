import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-burger-2d47e.firebaseio.com/"
});

export default instance;
