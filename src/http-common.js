import axios from "axios";

export default axios.create({
  baseURL: "http://10.15.250.6:8093/api",
  headers: {
    "Content-type": "application/json"
  }
});