import instance from "../modules/axios";

export const listBooks = async () => {
    try {
        const response = await instance({
            method: "GET",
            url: "/books",
        });

        return response.data;
    } catch (err) {
        throw new Error(err);
    }
};

export const createBook = async (params) => {
    try {
        const response = await instance.request({
            method: "POST",
            url: "/books",
            data: params,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (err) {
        throw new Error(err);
    }
};

export const deleteBook = async (id) => {
    try {
        const response = await instance({
            method: "DELETE",
            url: `/books/${id}`,
        });

        return response.data;
    } catch (err) {
        throw new Error(err);
    }
};

export const updateBook = async (id, bookData) => {
    try {
        const response = await instance({
            method: "PUT",
            url: `/books/${id}`,
            data: bookData,
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};
