import instance from "./config";

type UUID = string;

export const createPurchase = async (
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
    const response = await instance.post('/v1/purchase', {
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
    });

    return response.data;
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
    const response = await instance.put(`/v1/purchase`, {
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
    });

    return response.data;
}

export const deletePurchase = async (id: UUID) => {
    const response = await instance.delete(`/v1/purchase/${id}`);

    return response.data;
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
    }>(`/v1/purchase/${id}`);

    return response.data;
}

export const getPurchases = async () => {
    const response = await instance.get<[]>('/v1/purchases')
    
    return {
        message: response.data,
        statusCode: response.status,
    }    
}
