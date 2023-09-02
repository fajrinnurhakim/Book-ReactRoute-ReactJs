import instance from "../modules/axios.js";

export const login = async (params) => {
    try {
        const { email, password } = params;
        const response = await instance({
            method: "POST",
            url: "/login",
            data: {
                email,
                password,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        const { token } = response.data;
        localStorage.setItem("token", token);

        return response.data;
    } catch (err) {
        throw new Error(err);
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await instance.post("/register", userData);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};
