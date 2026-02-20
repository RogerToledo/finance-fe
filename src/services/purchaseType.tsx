import instance from "./config";

export interface PurchaseType {
    id: string;
    name: string;
}

export interface PurchaseTypeResponse {
    message: PurchaseType[];
    statusCode: number;
}

export const createPurchaseType = async (name: string) => {
    const response = await instance.post('/v1/purchaseType', { name });

    return response.data
}

export const updatePurchaseType = async (id: string, name: string) => {
    const response = await instance.put(`/v1/purchaseType`, { id, name });

    return response.data;
}

export const deletePurchaseType = async (id: string) => {
    const response = await instance.delete(`/v1/purchaseType/${id}`);

    return response.status;
}

export const getPurchaseType = async (id: string): Promise<PurchaseTypeResponse> => {
    const response = await instance.get<PurchaseTypeResponse>(`/v1/purchaseType/${id}`)
    return response.data;
}

export const getPurchaseTypes = async () => {
    const response = await instance.get<PurchaseTypeResponse>('/v1/purchaseTypes');

    return response.data;
}
