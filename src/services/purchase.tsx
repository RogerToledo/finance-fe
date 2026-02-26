import instance from "./config";

export interface Purchase {
    id: string,
    description: string,
    amount: number,
    date: string,
    installment_number: number,
    place: string,
    paid: boolean,
    id_payment_type: string,
    id_credit_card: string,
    id_purchase_type: string,
    id_person: string,
    payment_type: string,
    credit_card: string,
    purchase_type: string,
    person: string
}

export interface PurchaseResponse {
    message: Purchase;
    statusCode: number;
}

export interface PurchasesResponse {
    message: Purchase[];
    statusCode: number;
}

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
    const response = await instance.post('/v1/purchases', {
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
    id: string,
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
    const response = await instance.put(`/v1/purchases`, {
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
    });

    return response.data;
}

export const deletePurchase = async (id: string) => {
    const response = await instance.delete(`/v1/purchases/${id}`);

    return response.data;
}

export const getPurchase = async (id: string) => {
    const response = await instance.get<PurchaseResponse>(`/v1/purchases/${id}`);

    return response.data;
}

export const getPurchases = async () => {
    const response = await instance.get<PurchasesResponse>('/v1/purchases')
    
    return response.data;
}
