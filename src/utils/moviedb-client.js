import { appConfig } from "../config/app";
import axios from "axios";

export default axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Authorization: "Bearer " + appConfig.MOVIEDB_KEY,
        "Content-Type": "application/json;charset=utf-8",
    },
});
