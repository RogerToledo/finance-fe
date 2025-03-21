import instance from "./config";

export const createPaymentType = async (name: string) => {
    await instance.post('/paymentType', {
        name: name,
    }).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error);
    });
}

export const updatePaymentType = async (id: string, name: string) => {
    await instance.put(`/paymentType`, {
        id: id,
        name: name,
    }).then((response) => {
        if (response.status === 200 || response.status === 204) {
            console.log("PaymentType updated successfully");
            getPaymentTypes();
        }
    }).catch((error) => {
        console.log(error);
    });
}

export const deletePaymentType = async (id: string) => {
    await instance.delete(`/paymentType/${id}`).then((response) => {
        if (response.status === 200 || response.status === 204) {
            console.log("PaymentType deleted successfully");
            getPaymentTypes();
        }
        console.log(response);
    }).catch((error) => {
        console.log(error);
    });
}

export const getPaymentType = async (id: string) => {
    const response = await instance.get<{
        id: string,
        name: string,
    }>(`/paymentType/${id}`).catch((error) => {
        console.error("Failed to fetch paymentType:", error.message);
        if (error.config) {
            console.error("Request was made to:", error.config.baseURL + error.config.url);
        }
        return {} as any;
    });

    return response.data;
}

export const getPaymentTypes = async () => {
    const response = await instance.get<[{
        id: string,
        name: string,
    }]>('/paymentTypes').catch((error) => {
        console.error("Failed to fetch paymentTypes:", error.message);
        if (error.config) {
            console.error("Request was made to:", error.config.baseURL + error.config.url);
        }
        return [] as any;
    });
    return response.data;
}
