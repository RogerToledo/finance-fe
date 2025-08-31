import instance from "./config";

export const createCreditCard = async (
    owner: string, 
    final_card_num: string, 
    type: string, 
    invoice_closing_day: number
) => {
    await instance.post('/creditCard', {
        owner: owner,
        final_card_num: final_card_num,
        type: type,
        invoice_closing_day: invoice_closing_day
    }).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error);
    });
}

export const updateCreditCard = async (
    id: string,
    owner: string, 
    final_card_num: string, 
    type: string, 
    invoice_closing_day: number
) => {
    await instance.put(`/creditCard`, {
        id: id,
        owner: owner,
        final_card_num: final_card_num,
        type: type,
        invoice_closing_day: invoice_closing_day
    }).then((response) => {
        if (response.status === 200 || response.status === 204) {
            console.log("Credit card updated successfully");
            getCreditCards();
        }
    }).catch((error) => {
        console.log(error);
    });
}

export const deleteCreditCard = async (id: string) => {
    await instance.delete(`/creditCard/${id}`).then((response) => {
        if (response.status === 200 || response.status === 204) {
            console.log("Credit card deleted successfully");
            getCreditCards();
        }
        console.log(response);
    }).catch((error) => {
        console.log(error);
    });
}

export const getCreditCard = async (id: string) => {
    const response = await instance.get<{
        Owner: string,
        FinalCardNum: string,
        Type: string,
        InvoiceClosingDay: number
    }>(`/creditCard/${id}`).catch((err) => {
        console.error("Failed to fetch credit card:", err.message);
        if (err.config) {
            console.error("Request was made to:", err.config.baseURL + err.config.url);
        }
        return {} as any;
    });

    return response.data;
}

export const getCreditCards = async () => {
    const response = await instance.get<[{
        ID: string,
        Owner: string,
        FinalCardNum: string,
        Type: string,
        InvoiceClosingDay: number
    }]>('/creditCards').catch((err) => {
        console.error("Failed to fetch credit cards:", err.message);
        if (err.config) {
            console.error("Request was made to:", err.config.baseURL + err.config.url);
        }
        return [] as any;
    });

    return response.data;
}