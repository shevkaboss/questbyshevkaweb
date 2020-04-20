import axios from "axios";

export default axios.create({
  baseURL: "https://lashiciquest.herokuapp.com/api/quest",
  timeout: 180000
});