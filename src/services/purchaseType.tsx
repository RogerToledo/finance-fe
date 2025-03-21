import instance from "./config";

export const createPurchaseType = async (name: string) => {
    await instance.post('/purchaseType', {
        name: name,
    }).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error);
    });
}

export const updatePurchaseType = async (id: string, name: string) => {
    await instance.put(`/purchaseType`, {
        id: id,
        name: name,
    }).then((response) => {
        if (response.status === 200 || response.status === 204) {
            console.log("PurchaseType updated successfully");
            getPurchaseTypes();
        }
    }).catch((error) => {
        console.log(error);
    });
}

export const deletePurchaseType = async (id: string) => {
    await instance.delete(`/purchaseType/${id}`).then((response) => {
        if (response.status === 200 || response.status === 204) {
            console.log("PurchaseType deleted successfully");
            getPurchaseTypes();
        }
        console.log(response);
    }).catch((error) => {
        console.log(error);
    });
}

export const getPurchaseType = async (id: string) => {
    const response = await instance.get<{
        id: string,
        name: string,
    }>(`/purchaseType/${id}`).catch((error) => {
        console.error("Failed to fetch purchaseType:", error.message);
        if (error.config) {
            console.error("Request was made to:", error.config.baseURL + error.config.url);
        }
        return {} as any;
    });

    return response.data;
}

export const getPurchaseTypes = async () => {
    const response = await instance.get<[{
        id: string,
        name: string,
    }]>('/purchaseTypes').catch((error) => {
        console.error("Failed to fetch purchaseType:", error.message);
        if (error.config) {
            console.error("Request was made to:", error.config.baseURL + error.config.url);
        }
        return [] as any;
    });
    return response.data;
}
