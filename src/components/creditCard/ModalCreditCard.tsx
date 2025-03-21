import { createCreditCard, getCreditCard, updateCreditCard } from '@/services/creditCard';
import { useState, useEffect } from 'react';
import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCardAction: () => void;
    isUpdate: boolean;
    creditCardId: string;
}

const ModalcreditCard: React.FC<ModalProps> = ({ isOpen, onClose, onCardAction, isUpdate, creditCardId }) => {
    const [title, setTitle] = useState("Cadastro de Cartão de Crédito");
    const [buttonText, setButtonText] = useState("Adicionar novo cartão de crédito"); 
    const [cardOwner, setCardOwner] = useState('');
    const [finalCardNum, setFinalCardNum] = useState('');
    const [type, setType] = useState('');
    const [invoiceCloseDay, setInvoiceCloseDay] = useState(0);
    
    useEffect(() => {
        if (isUpdate && creditCardId) {
            setTitle("Atualização do Cartão de Crédito");
            setButtonText("Atualizar Cartão de Crédito");
            const fetchCreditCard = async () => {
                try {
                    const response = await getCreditCard(creditCardId);
                    setCardOwner(response.Message.owner);
                    setFinalCardNum(response.Message.final_card_num);
                    setType(response.Message.type);
                    setInvoiceCloseDay(response.Message.invoice_closing_day);
                } catch (error) {
                    console.error("Error fetching credit card", error);
                }
            };
            fetchCreditCard();
        } else {
            setTitle("Cadastro de Cartão de Crédito");
            setButtonText("Adicionar novo cartão de crédito");
            setCardOwner("");
            setFinalCardNum("");
            setType("");
            setInvoiceCloseDay(0);
        }
    }, [isUpdate, creditCardId]);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (isUpdate) {
                console.log("Updating credit card", creditCardId);
                await updateCreditCard(creditCardId, cardOwner, finalCardNum, type, invoiceCloseDay);
            } else {
                console.log("Creating credit card", cardOwner, finalCardNum, type, invoiceCloseDay);
                await createCreditCard(cardOwner, finalCardNum, type, invoiceCloseDay);
            }

            onCardAction();
        } catch (err) {
            console.error("Error creating credit card", err);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        switch(name) {
            case 'Owner':
                setCardOwner(value);
                break;
            case 'FinalCardNum':
                setFinalCardNum(value);
                break;
            case 'Type':
                setType(value);
                break;
            case 'InvoiceClosingDay':
                setInvoiceCloseDay(Number(value));
                break;
            default:
                break;
        }
    };

    if (!isOpen) {
        return null;
    }    

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
            {/* Main modal */}
            
                <div className="relative p-4 w-full max-w-md max-h-full">
                    {/*Modal content */}
                    <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {title}
                            </h3>
                            <button type="button" onClick={onClose} className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/*  Modal body */}
                        <div className="p-4 md:p-5">
                            <form onSubmit={handleSubmit} className="space-y-4" action="#">
                                <div>
                                    <label htmlFor="Owner" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Proprietário</label>
                                    <input 
                                        type="text" 
                                        name="Owner" 
                                        id="Owner"
                                        value={cardOwner}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        placeholder="Digite um nome"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="FinalCardNum" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Final do Cartão</label>
                                    <input 
                                        type="text" 
                                        name="FinalCardNum"
                                        id="FinalCardNum" 
                                        value={finalCardNum}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                        placeholder="0000" 
                                        required 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="Type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo do Cartão</label>
                                    <select 
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                        name="Type"
                                        id="Type" 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                        <option value="">Escolha o tipo do cartão</option>
                                        <option value="F">Físico</option>
                                        <option value="V">Virtual</option>
                                        <option value="VT">Virtual Temporário</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="InvoiceClosingDay" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dia do Fechamento da Fatura</label>
                                    <input 
                                        type="text" 
                                        name="InvoiceClosingDay" 
                                        id="InvoiceClosingDay" 
                                        value={invoiceCloseDay}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                        placeholder="15" 
                                        required 
                                    />
                                </div>
                                <button 
                                    type="submit" 
                                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    {buttonText}
                                </button>
                            </form>
                        </div>
                    </div>
            </div> 
        </div>
    );
};

export default ModalcreditCard;