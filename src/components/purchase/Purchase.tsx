import { useEffect, useState } from "react";
import { getPurchases, deletePurchase, type PurchasesResponse } from "@/services/purchase";
import { getPurchasesInstallments, payInstallment, type Installment } from "@/services/installment";
import { Eye, Layers, Pencil, Trash2, X } from 'lucide-react';
import ModalPurchase from "./ModalPurchase";
import ModalInstallments from "../installment/ModalInstallment";

function Purchase() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [purchases, setPurchases] = useState<PurchasesResponse>({
        message: [],
        statusCode: 0,
    });
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [purchaseId, setPurchaseId] = useState<string | null>(null);
    const [isInstallmentModalOpen, setIsInstallmentModalOpen] = useState(false);
    const [selectedPurchaseInstallments, setSelectedPurchaseInstallments] = useState<Installment[]>([]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setPurchaseId(null);
    }    

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await getPurchases();
            console.log("Fetched purchases:", data);
            if (data && Array.isArray(data.message)) {
                setPurchases(data);
            } else {
                setPurchases({ message: [], statusCode: 200 });
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Erro desconhecido ao carregar compras");
            }
            
            setPurchases({ message: [], statusCode: 500 });

            } finally {
                setLoading(false);
            }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handlePurchase = () => {
        fetchData();
    }

    const handleInstallments = async (purchaseId: string) => {
        try {
            setPurchaseId(purchaseId);

            const response = await getPurchasesInstallments(purchaseId);

            setSelectedPurchaseInstallments(Array.isArray(response.message) ? response.message : [response.message]);
            setIsInstallmentModalOpen(true);
        } catch (err) {
            console.error(err);
            alert("Erro ao carregar parcelas.");
        }
    }

    const handlePayInstallment = async (installmentId: string) => {
        setError(null);
        setSuccess(null);

        try {
            await payInstallment(installmentId); 

            setIsInstallmentModalOpen(false);

            setPurchaseId(null);
            setSelectedPurchaseInstallments([]);
            
            setSuccess("Parcela paga com sucesso!");

            setTimeout(() => {
                setSuccess(null);
            }, 3000);
            
            await fetchData(); 
            
        } catch (err) {
            alert(`Erro ao processar pagamento: ${err instanceof Error ? err.message : "Erro desconhecido"}`);
            throw err;
        }
    };

    const handleView = (id: string) => {
        setPurchaseId(id);
        setIsUpdate(false);
        openModal();
    }

    const handleDelete = async (id: string) => {
        if (!window.confirm("Tem certeza que deseja deletar esta compra?")) return;

        try{
            console.log("Deleting purchase", id);
            await deletePurchase(id)
            await fetchData();
        } catch (err) {
            console.error(err);
            alert("Erro ao deletar a compra.");
        }
    } 

    const handleOpenNew = () => {
        setPurchaseId(null);
        setIsUpdate(false);
        openModal();
    }

    const isEmpty = !loading && !error && (!purchases?.message || purchases.message.length === 0);

    return (
        <div>
            <div className="flex items-center mt-5">
                <button 
                    type="button" 
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 ml-10 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={handleOpenNew}
                >
                    Novo
                </button> 
                <h1 className="text-2xl ml-11 mt-5 mr-10 font-semibold text-gray-900 dark:text-white">Compras</h1> 
            </div>
            <div className="relative overflow-x-auto mt-10 ml-10 mr-10 shadow-md sm:rounded-lg">
                {success && (
                    <div className="flex items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                        <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                        </svg>
                        <div className="ms-3 text-sm font-medium">
                            {success}
                        </div>
                        <button 
                            onClick={() => setSuccess(null)}
                            type="button" 
                            className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
                        >
                            <X size={14} />
                        </button>
                    </div>
                )}
                {loading && (
                    <div className="p-5 text-center text-gray-500 bg-white dark:bg-gray-800">
                        Carregando...
                    </div>
                )}
                {error && (
                    <div className="p-5 text-center text-gray-500 bg-white dark:bg-gray-800">
                        Error: {error}
                    </div>
                )}
                {isEmpty && (
                    <div className="p-5 text-center text-gray-500 bg-white dark:bg-gray-800">
                        Não existem compras cadastradas.
                    </div>
                )}  
                {!isEmpty && !loading && !error && (
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-10 py-3">
                                    Pessoa
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Descrição
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Local
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Valor
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Data
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Parcelas
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {purchases?.message.map((message) => (
                                <tr key={message.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                    <th scope="row" className="px-10 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {message.person}
                                    </th>
                                    <td className="px-6 py-4">
                                        {message.description}
                                    </td>
                                    <td className="px-6 py-4">
                                        {message.place}
                                    </td>
                                    <td className="px-6 py-4">
                                        R$ {message.amount}
                                    </td>
                                    <td className="px-6 py-4">
                                        {message.date ? new Date(message.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '-'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {message.installment_number}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button 
                                                onClick={() => handleView(message.id)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Visualizar detalhes"
                                            >
                                                <Eye size={18} />
                                            </button>
                                            <button 
                                                onClick={() => handleInstallments(message.id)}
                                                disabled={message.installment_number < 2}
                                                className={`p-2 rounded-lg transition-colors ${
                                                    message.installment_number < 2 
                                                        ? "text-gray-400 cursor-not-allowed opacity-50"
                                                        : "text-purple-600 hover:bg-purple-50"
                                                }`}
                                                title={message.installment_number < 2 ? "Compra à vista" : "Ver parcelas"}
                                            >
                                                <Layers size={18} />
                                            </button>
                                            <button 
                                                onClick={() => {
                                                    setPurchaseId(message.id);
                                                    setIsUpdate(true);
                                                    openModal();
                                                }}
                                                className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                                title="Editar compra"
                                            >
                                                <Pencil size={18} />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(message.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Excluir compra"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}    
                        </tbody>
                    </table>
                )}
            </div>
            <ModalPurchase 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                onPurchaseAction={handlePurchase}
                isUpdate={isUpdate}
                purchaseId={purchaseId}
            />
            <ModalInstallments
                isOpen={isInstallmentModalOpen}
                onClose={() => setIsInstallmentModalOpen(false)}
                installments={selectedPurchaseInstallments || []}
                onPay={handlePayInstallment}
            />
        </div>
    )
}

export default Purchase;