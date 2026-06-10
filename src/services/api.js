// services/api.js
import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8005"
});

export default API;