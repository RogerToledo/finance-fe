import instance from "./config";

export interface PaymentType {
    id: string;
    name: string;
    spot_installment: number;
}

export interface PaymentTypeResponse {
    message: PaymentType[];
    statusCode: number;
}

export const createPaymentType = async (name: string, spotInstallment: number) => {
    const response = await instance.post('/v1/paymentType', {
        name: name,
        spot_installment: spotInstallment,
    });

    return response.data;
}

export const updatePaymentType = async (id: string, name: string, spotInstallment: number) => {
    const response = await instance.put(`/v1/paymentType`, {
        id: id,
        name: name,
        spot_installment: spotInstallment
    });

    return response.data;
}

export const deletePaymentType = async (id: string) => {
    const response = await instance.delete(`/v1/paymentType/${id}`);

    return response.data;
}

export const getPaymentType = async (id: string) => {
    const response = await instance.get<PaymentType>(`/v1/paymentType/${id}`);

    return response.data;
}

export const getPaymentTypes = async () => {
    const response = await instance.get<PaymentTypeResponse>('/v1/paymentTypes');
    
    return response.data;
}
