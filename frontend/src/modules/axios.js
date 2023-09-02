import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8000",
});

instance.interceptors.request.use(
    function (config) {
        console.log(localStorage.getItem("token"));
        if (localStorage.getItem("token")) {
            const token = localStorage.getItem("token");
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default instance;