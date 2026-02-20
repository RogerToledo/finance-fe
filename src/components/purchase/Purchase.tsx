import { useEffect, useState } from "react";
import { getPurchases, deletePurchase } from "@/services/purchase";
import ModalPurchase from "./ModalPurchase";

type UUID = string;

interface Purchase {
    id: UUID;
    description: string;
    amount: number;
    date: string;
	installment_number: number;
    installment: number;
    place: string;
    paid: boolean;
    payment_type: string;
    credit_card: string;
    purchase_type: string;
    person: string;
}

interface PurchaseResponse {
    message: Purchase[];
    statusCode: number;
}

function Purchase() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [purchases, setPurchases] = useState<PurchaseResponse>({
        message: [],
        statusCode: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [purchaseId, setPurchaseId] = useState<UUID | null>(null);

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
            if (data) {
                setPurchases(data);
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handlePurchase = () => {
        fetchData();
        closeModal();
    }

    const handleDelete = async (id: UUID) => {
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
                                <th scope="col" className="px-6 py-3">
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
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
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
                                        {message.date}
                                    </td>
                                    <td className="px-6 py-4">
                                        {message.installment_number}
                                    </td>
                                    <td className="px-6 py-2 text-right">
                                        <button 
                                            type="button"
                                            onClick={ () => {
                                                setPurchaseId(message.id);
                                                setIsUpdate(true);
                                                openModal();
                                            }}
                                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Editar
                                        </button>
                                        <button 
                                            type="button" 
                                            onClick={ async () => { 
                                                try {
                                                    handleDelete(message.id);
                                                } catch (error) {
                                                    console.error(error);
                                                }
                                            }}
                                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2 me-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Deletar
                                        </button>
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
        </div>
    )
}

export default Purchase;