import { useState, useEffect, useCallback } from 'react';
import { getPurchase, createPurchase, updatePurchase } from '@/services/purchase';
import { getCreditCards } from '@/services/creditCard';
import { getPersons } from '@/services/person';
import { getPaymentTypes } from '@/services/paymentType';
import { getPurchaseTypes } from '@/services/purchaseType';

type UUID = string;

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPurchaseAction: () => void;
    isUpdate: boolean;
    purchaseId: UUID | null;
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
    final_card_num: string;
}

interface PurchaseType {
    id: string;
    name: string;
}

const initialFormState = {
    description: '',
    amount: '',
    date: '',
    installment_number: 0,
    place: '',
    paid: false,
    payment_type: '',
    credit_card: '',
    purchase_type: '',
    person: '',
}

const ModalPurchaseType: React.FC<ModalProps> = ({ isOpen, onClose, onPurchaseAction, isUpdate, purchaseId }) => {
    const [formData, setFormData] = useState(initialFormState);
    const [persons, setPersons] = useState<Person[]>([]);
    const [paymentTypes, setPaymentType] = useState<PaymentType[]>([]);
    const [types, setTypes] = useState<PurchaseType[]>([]);
    const [cards, setCards] = useState<Card[]>([]);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (!isOpen) return;

        if (isUpdate && purchaseId) {
            const fetchPurchaseType = async () => {
                try {
                    const response = await getPurchase(purchaseId);
                    const data = response;
                    setFormData({
                        description: data.description || '',
                        amount: data.amount.toString(),
                        date: data.date || '',
                        installment_number: data.installment_number || 0,
                        place: data.place || '',
                        paid: data.paid || false,
                        payment_type: data.payment_type || '',
                        credit_card: data.credit_card || '',
                        purchase_type: data.purchase_type || '',
                        person: data.person || ''
                    });

                } catch (error) {
                    console.error("Error fetching purchase", error);
                }
            };
            fetchPurchaseType();
        } else {
           setFormData(initialFormState);
        }
    }, [isOpen, isUpdate, purchaseId]);

    const fetchMetadata = useCallback(async () => {
        try {
            const [personsData, paymentTypesData, cardsData, purchaseTypesData] = await Promise.all([
                getPersons(),
                getPaymentTypes(),
                getCreditCards(),
                getPurchaseTypes()
            ]);
            setPersons(personsData.message || []);
            setPaymentType(paymentTypesData.message || []);
            setCards(cardsData.message || []);
            setTypes(purchaseTypesData.message || []);
        } catch (error) {
            console.error("Error fetching metadata", error);
        }
    }, []);

    useEffect(() => {
        if (isOpen) { fetchMetadata(); }
    }, [isOpen, fetchMetadata]);    

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'installment_number' ? Number(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const amountFloat = typeof formData.amount === 'string' ? parseFloat(formData.amount.replace(',', '.')) : formData.amount;
            if (isUpdate && purchaseId) {
                await updatePurchase(
                    purchaseId,
                    formData.description,
                    amountFloat,
                    formData.date,
                    formData.installment_number,
                    formData.place,
                    formData.paid,
                    formData.payment_type,
                    formData.credit_card,
                    formData.purchase_type,
                    formData.person
                );
            } else {
                const paidCorrected = formData.credit_card !== "";
                
                await createPurchase(
                    formData.description,
                    amountFloat,
                    formData.date,
                    formData.installment_number,
                    formData.place,
                    paidCorrected,
                    formData.payment_type,
                    formData.credit_card,
                    formData.purchase_type,
                    formData.person
                );
            }
            onPurchaseAction();
        } catch (error) {
            console.error("Error saving purchase", error);
        } finally {
            setIsSaving(false);
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="relative p-4 w-full max-h-full">
                <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 border-b dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {isUpdate ? "Atualização de Compra" : "Cadastro de Compra"}
                        </h3>
                        <button type="button" onClick={onClose} className="text-gray-400 hover:bg-gray-200 rounded-lg p-2">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 14 14"><path stroke="currentColor" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/></svg>
                        </button>
                    </div>

                    <div className="p-4 md:p-5">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Linha 1: Local e Descrição */}
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Local</label>
                                    <input type="text" name="place" value={formData.place} onChange={handleChange} className="w-full p-2.5 bg-gray-50 border rounded-lg dark:bg-gray-600 dark:text-white" placeholder="Local da compra"/>
                                </div>
                                <div className="flex-1">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrição</label>
                                    <input type="text" name="description" value={formData.description} onChange={handleChange} className="w-full p-2.5 bg-gray-50 border rounded-lg dark:bg-gray-600 dark:text-white" placeholder="Descrição"/>
                                </div>
                            </div>

                            {/* Linha 2: Data, Valor e Parcelas */}
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Data</label>
                                    <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full p-2.5 bg-gray-50 border rounded-lg dark:bg-gray-600 dark:text-white"/>
                                </div>
                                <div className="flex-1">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Valor (R$)</label>
                                    <input type="text" name="amount" value={formData.amount} onChange={handleChange} required className="w-full p-2.5 bg-gray-50 border rounded-lg dark:bg-gray-600 dark:text-white" placeholder="0,00"/>
                                </div>
                                <div className="flex-1">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Parcelas</label>
                                    <input type="number" name="installment_number" value={formData.installment_number} onChange={handleChange} required className="w-full p-2.5 bg-gray-50 border rounded-lg dark:bg-gray-600 dark:text-white"/>
                                </div>
                            </div>

                            {/* Linha 3: Selects */}
                            <div className="flex gap-4 flex-wrap md:flex-nowrap">
                                <div className="flex-1 min-w-[150px]">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Pessoa</label>
                                    <select name="person" value={formData.person} onChange={handleChange} required className="w-full p-2.5 bg-gray-50 border rounded-lg dark:bg-gray-700 dark:text-white">
                                        <option value="">Escolha a Pessoa</option>
                                        {persons.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                    </select>
                                </div>
                                <div className="flex-1 min-w-[150px]">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Pagamento</label>
                                    <select name="payment_type" value={formData.payment_type} onChange={handleChange} required className="w-full p-2.5 bg-gray-50 border rounded-lg dark:bg-gray-700 dark:text-white">
                                        <option value="">Tipo</option>
                                        {paymentTypes.map(pt => <option key={pt.id} value={pt.id}>{pt.name}</option>)}
                                    </select>
                                </div>
                                <div className="flex-1 min-w-[150px]">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cartão</label>
                                    <select name="credit_card" value={formData.credit_card} onChange={handleChange} className="w-full p-2.5 bg-gray-50 border rounded-lg dark:bg-gray-700 dark:text-white">
                                        <option value="">Nenhum</option>
                                        {cards.map(c => <option key={c.id} value={c.id}>{c.owner} - {c.final_card_num}</option>)}
                                    </select>
                                </div>
                                <div className="flex-1 min-w-[150px]">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Tipo Compra</label>
                                    <select name="purchase_type" value={formData.purchase_type} onChange={handleChange} required className="w-full p-2.5 bg-gray-50 border rounded-lg dark:bg-gray-700 dark:text-white">
                                        <option value="">Tipo Compra</option>
                                        {types.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-center pt-4">
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-20 py-2.5 dark:bg-blue-600 disabled:opacity-50"
                                >
                                    {isSaving ? "Salvando..." : (isUpdate ? "Atualizar Compra" : "Adicionar nova compra")}
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
