import { appConfig } from "../config/app";
import axios from "axios";

const service = axios.create({
    baseURL: appConfig.BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
    },
});

export default service;
