import { useState, useEffect, useCallback } from 'react';
import { getPurchase, createPurchase, updatePurchase } from '@/services/purchase';
import { getCreditCards } from '@/services/creditCard';
import { getPersons } from '@/services/person';
import { getPaymentTypes } from '@/services/paymentType';
import { getPurchaseTypes } from '@/services/purchaseType';
import { UUID } from 'crypto';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPurchaseAction: () => void;
    isUpdate: boolean;
    purchaseId: UUID;
}

interface Person {
    id: string;
    name: string;
}

interface PaymentType {
    id: string;
    name: string;
}

interface Card {
    id: string;
    owner: string;
    finalCardNumber: string;
}

interface PurchaseType {
    id: string;
    name: string;
}

const ModalPurchaseType: React.FC<ModalProps> = ({ isOpen, onClose, onPurchaseAction, isUpdate, purchaseId }) => {
    const [purchaseDescription, setPurchaseDescription] = useState('');
    const [purchaseAmount, setPurchaseAmount] = useState('');
    const [purchaseDate, setPurchaseDate] = useState('');
    const [purchaseInstallmentNumber, setPurchaseInstallmentNumber] = useState(0);
    const [purchasePlace, setPurchasePlace] = useState('');
    const [purchasePaid, setPurchasePaid] = useState(false);
    const [purchasePaymentType, setPurchasePaymentType] = useState('');
    const [purchaseCreditCard, setPurchaseCreditCard] = useState('');
    const [purchaseType, setPurchaseType] = useState('');
    const [purchasePerson, setPurchasePerson] = useState('');
    const [persons, setPersons] = useState<Person[]>([]);
    const [paymentTypes, setPaymentType] = useState<PaymentType[]>([]);
    const [types, setTypes] = useState<PurchaseType[]>([]);
    const [cards, setCards] = useState<Card[]>([]);
    const [title, setTitle] = useState("Cadastro de Compra");
    const [buttonText, setButtonText] = useState("Adicionar nova compra");

    useEffect(() => {
        if (isUpdate && purchaseId) {
            setTitle("Atualização de Compra");
            setButtonText("Atualizar Compra");
            const fetchPurchaseType = async () => {
                try {
                    const response = await getPurchase(purchaseId);
                    setPurchaseDescription(response.Message.description);
                    setPurchaseAmount(response.Message.amount);
                    setPurchaseDate(response.Message.date);
                    setPurchaseInstallmentNumber(response.Message.installment_number);
                    setPurchasePlace(response.Message.place);
                    setPurchasePaid(response.Message.paid);
                    setPurchasePaymentType(response.Message.payment_type);
                    setPurchaseCreditCard(response.Message.credit_card);
                    setPurchaseType(response.Message.purchase_type);
                    setPurchasePerson(response.Message.person);
                } catch (error) {
                    console.error("Error fetching purchase", error);
                }
            };
            fetchPurchaseType();
        } else {
            setTitle("Cadastro de Compra");
            setButtonText("Adicionar nova compra");
            setPurchaseDescription("");
            setPurchaseAmount("");
            setPurchaseDate("");
            setPurchaseInstallmentNumber(0);
            setPurchasePlace("");
            setPurchasePaid(false);
            setPurchasePaymentType("");
            setPurchaseCreditCard("");
            setPurchaseType("");
            setPurchasePerson("");
        }
    }, [isUpdate, purchaseId]);

    const fetchPerson = useCallback(async () => {
        try {
            const response = await getPersons();
            if (response && Array.isArray(response.Message)) {
                const personData = response.Message.map((person: any) => ({
                    id: person.id,
                    name: person.name,
                }));
                setPersons(personData);
            }
        } catch (error) {
            console.error("Error fetching person", error);
        }
    }, []);

    const fetchPaymentType = useCallback(async () => {
        try {
            const response = await getPaymentTypes();
            if (response && Array.isArray(response.Message)) {
                const paymentTypeData = response.Message.map((paymentType: any) => ({
                    id: paymentType.id,
                    name: paymentType.name,
                }));
                setPaymentType(paymentTypeData);
            }
        } catch (error) {
            console.error("Error fetching payment type", error);
        }
    }, []);

    const fetchCreditCard = useCallback(async () => {
        try {
            const response = await getCreditCards();
            if (response && Array.isArray(response.Message)) {
                const cardsData = response.Message.map((card: any) => ({
                    id: card.id,
                    owner: card.owner,
                    finalCardNumber: card.final_card_num,
                }));
                setCards(cardsData);
            }
        } catch (error) {
            console.error("Error fetching credit card", error);
        }
    }, []);

    const fetchPurchaseType = useCallback(async () => {
        try {
            const response = await getPurchaseTypes();
            if (response && Array.isArray(response.Message)) {
                const purchaseTypeData = response.Message.map((purchaseType: any) => ({
                    id: purchaseType.id,
                    name: purchaseType.name,
                }));
                setTypes(purchaseTypeData);
            }
        } catch (error) {
            console.error("Error fetching purchase type", error);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchPerson();
                await fetchPaymentType();
                await fetchCreditCard();
                await fetchPurchaseType();
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        fetchData();
    }, [fetchCreditCard, fetchPaymentType, fetchPerson, fetchPurchaseType]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (isUpdate) {
                console.log("Updating purchase", purchaseId);
                await updatePurchase(
                    purchaseId,
                    purchaseDescription,
                    parseFloat(purchaseAmount.replace(",", ".")),
                    purchaseDate,
                    purchaseInstallmentNumber,
                    purchasePlace,
                    purchasePaid,
                    purchasePaymentType,
                    purchaseCreditCard,
                    purchaseType,
                    purchasePerson
                );
            } else {
                const paidCorrected = purchaseCreditCard === "" ? false : true;
                console.log("paymentType", purchasePaymentType)
                console.log("card", purchaseCreditCard)
                console.log("type", purchaseType)
                console.log("person", purchasePerson)
                console.log("purchaseId", purchaseId)
                await createPurchase(
                    purchaseId,
                    purchaseDescription,
                    parseFloat(purchaseAmount.replace(",", ".")),
                    purchaseDate,
                    purchaseInstallmentNumber,
                    purchasePlace,
                    paidCorrected,
                    purchasePaymentType,
                    purchaseCreditCard,
                    purchaseType,
                    purchasePerson
                );
            }

            onPurchaseAction();
        } catch (err) {
            console.error("Error creating purchase", err);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        switch (name) {
            case 'description':
                setPurchaseDescription(value);
                break;
            case 'amount':
                setPurchaseAmount(value);
                break;
            case 'date':
                setPurchaseDate(value);
                break;
            case 'installment_number':
                setPurchaseInstallmentNumber(Number(value));
                break;
            case 'place':
                setPurchasePlace(value);
                break;
            case 'payment_type':
                setPurchasePaymentType(value);
                break;
            case 'credit_card':
                setPurchaseCreditCard(value);
                break;
            case 'purchase_type':
                setPurchaseType(value);
                break;
            case 'person':
                setPurchasePerson(value);
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
            <div className="relative p-4 w-full max-h-full">
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
                    {/* Modal body */}
                    <div className="p-4 md:p-5">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex">
                                <div className="flex-1 mr-5">
                                    <label htmlFor="place" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Local</label>
                                    <input
                                        type="text"
                                        name="place"
                                        id="place"
                                        value={purchasePlace}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        placeholder="Digite o local da compra"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrição</label>
                                    <input
                                        type="text"
                                        name="description"
                                        id="description"
                                        value={purchaseDescription}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        placeholder="Digite uma descrição"
                                    />
                                </div>
                            </div>
                            <div className="flex">
                                <div className="flex-1 mr-5">
                                    <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Data</label>
                                    <input
                                        type="date"
                                        name="date"
                                        id="date"
                                        value={purchaseDate}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    />
                                </div>
                                <div className="flex-1 mr-5">
                                    <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Valor (R$)</label>
                                    <input
                                        type="text"
                                        name="amount"
                                        id="amount"
                                        value={purchaseAmount}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        placeholder="000,00"
                                        required
                                    />
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="installment_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Parcelas</label>
                                    <input
                                        type="number"
                                        name="installment_number"
                                        id="installment_number"
                                        value={purchaseInstallmentNumber}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        placeholder="0"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex">
                                <div className="flex-1 mr-5">
                                    <label htmlFor="person" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Pessoa</label>
                                    <select
                                        value={purchasePerson}
                                        onChange={handleChange} // Alteração aqui
                                        name="person"
                                        id="person"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                        <option value="" disabled>Escolha a Pessoa</option>
                                        {persons.length > 0 ? (
                                            persons.map((person) => (
                                                <option key={person.id} value={person.id}>
                                                    {person.name}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="" disabled>Nenhuma pessoa disponível</option>
                                        )}
                                    </select>
                                </div>
                                <div className="flex-1 mr-5">
                                    <label htmlFor="payment_type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Tipo de Pagamento</label>
                                    <select
                                        id="payment_type"
                                        name="payment_type"
                                        value={purchasePaymentType}
                                        onChange={handleChange} // Alteração aqui
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option disabled>Escolha o Tipo de Pagamento</option>
                                        {paymentTypes.length > 0 ? (
                                            paymentTypes.map((paymentType) => (
                                                <option key={paymentType.id} value={paymentType.id}>
                                                    {paymentType.name}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="" disabled>Nenhuma Tipo de Pagamento disponível</option>
                                        )}
                                    </select>
                                </div>
                                <div className="flex-1 mr-5">
                                    <label htmlFor="credit_card" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cartão de Credito</label>
                                    <select
                                        id="credit_card"
                                        name="credit_card"
                                        value={purchaseCreditCard}
                                        onChange={handleChange} // Alteração aqui
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                        <option value="" selected>Escolha o Cartão</option>
                                        {cards.length > 0 ? (
                                            cards.map((card) => (
                                                <option key={card.id} value={card.id}>
                                                    {card.owner} - {card.finalCardNumber}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="" disabled>Nenhum cartão disponível</option>
                                        )}
                                    </select>
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="purchase_type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Tipo de Compra</label>
                                    <select
                                        id="purchase_type"
                                        name="purchase_type"
                                        value={purchaseType}
                                        onChange={handleChange} // Alteração aqui
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                        <option disabled>Escolha o Tipo de Compra</option>
                                        {types.length > 0 ? (
                                            types.map((type) => (
                                                <option key={type.id} value={type.id}>
                                                    {type.name}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="" disabled>Nenhuma Tipo de Pagamento disponível</option>
                                        )}
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 sm:px-10 md:px-20 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-auto min-w-40"
                                >
                                    {buttonText}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalPurchaseType;