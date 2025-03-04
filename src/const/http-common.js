import axios from "axios";
import { API_URI } from "./const";

export default axios.create({
  baseURL: API_URI,
});