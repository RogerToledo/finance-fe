import { UUID } from "crypto";
import instance from "./config";

export const createPurchase = async (
    id: UUID,
    description: string,
    amount: number,
    date: string,
    installment_number: number,
    place: string,
    paid: boolean,
    id_payment_type: string,
    id_credit_card: string,
    id_purchase_type: string,
    id_person: string
) => {
    await instance.post('/purchase', {
        id: id,
        description: description,
        amount: amount,
        date: date,
        installment_number: installment_number,
        place: place,
        paid: paid,
        id_payment_type: id_payment_type,
        id_credit_card: id_credit_card,
        id_purchase_type: id_purchase_type,
        id_person: id_person
    }).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error);
    });
}

export const updatePurchase = async (
    id: UUID,
    description: string,
    amount: number,
    date: string,
    installment_number: number,
    place: string,
    paid: boolean,
    id_payment_type: string,
    id_credit_card: string,
    id_purchase_type: string,
    id_person: string
) => {
    await instance.put(`/purchase`, {
        id: id,
        description: description,
        amount: amount,
        date: date,
        installment_number: installment_number,
        place: place,
        paid: paid,
        id_payment_type: id_payment_type,
        credit_card: id_credit_card,
        id_credit_card: id_purchase_type,
        id_person: id_person
    }).then((response) => {
        if (response.status === 200 || response.status === 204) {
            console.log("Purchase updated successfully");
            getPurchases();
        }
    }).catch((error) => {
        console.log(error);
    });
}

export const deletePurchase = async (id: UUID) => {
    await instance.delete(`/purchase/${id}`).then((response) => {
        if (response.status === 200 || response.status === 204) {
            console.log("Purchase deleted successfully");
            getPurchases();
        }
        console.log(response);
    }).catch((error) => {
        console.log(error);
    });
}

export const getPurchase = async (id: UUID) => {
    const response = await instance.get<{
        id: UUID,
        description: string,
        amount: string,
        date: string,
        installment_number: number,
        installment: number,
        place: string,
        paid: boolean,
        payment_type: string,
        credit_card: string,
        purchase_type: string,
        person: string
    }>(`/purchase/${id}`).catch((error) => {
        console.error("Failed to fetch purchase:", error.message);
        if (error.config) {
            console.error("Request was made to:", error.config.baseURL + error.config.url);
        }
        return {} as any;
    });

    return response.data;
}

export const getPurchases = async () => {
    const response = await instance.get<[{
        id: UUID,
        description: string,
        amount: number,
        date: string,
        installment_number: number,
        installment: number,
        place: string,
        paid: boolean,
        payment_type: string,
        credit_card: string,
        purchase_type: string,
        person: string
    }]>('/purchases').catch((error) => {
        console.error("Failed to fetch purchase:", error.message);
        if (error.config) {
            console.error("Request was made to:", error.config.baseURL + error.config.url);
        }
        return [] as any;
    });
    console.log("response", response.data);
    return response.data;
}
