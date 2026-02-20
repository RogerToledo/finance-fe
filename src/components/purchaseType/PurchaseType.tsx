import { useEffect, useState, useCallback } from "react";
import ModalPurchaseType from "./ModalPurchaseType";
import { deletePurchaseType, getPurchaseTypes, type PurchaseTypeResponse } from "@/services/purchaseType";

function PurchaseType() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [purchaseTypes, setPurchaseTypes] = useState<PurchaseTypeResponse>({
        message: [],
        statusCode: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [purchaseTypeId, setPurchaseTypeId] = useState<string>("");
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getPurchaseTypes();
            setPurchaseTypes(data);
        } catch (err: unknown) {
            const error = err as Error;
            setError(error.message || "Erro ao carregar dados");
        } finally {
            setLoading(false);
        }
    }, []); 

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handlePurchaseType = async () => {
        await fetchData();
        closeModal();
    }

    const handleDelete = async (id: string) => {
        if (!window.confirm('Tem certeza que deseja deletar este tipo de compra?')) {
            return;
        }
    
        setIsDeleting(id);
        try {
            await deletePurchaseType(id);
            setPurchaseTypes(prev => ({
                ...prev,
                Message: prev.message.filter(item => item.id !== id)
            }));
        } catch (err) {
            console.error('Erro ao deletar:', err);
            alert('Erro ao deletar o tipo de compra');
        } finally {
            setIsDeleting(null);
        }
    } 

    const handleOpenNew = () => {
        setIsUpdate(false);
        setPurchaseTypeId("");
        openModal();
    }

    const isEmpty = !loading && !error && (!purchaseTypes?.message || purchaseTypes?.message?.length === 0);

    return (
        <div>
            <div className="flex items-center justify-between mt-5 mx-10">
                <button 
                    type="button" 
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={handleOpenNew}
                >
                    Novo
                </button>
                <h1 className="text-2xl mt-5 font-semibold text-gray-900 dark:text-white text-center flex-1 pr-20">
                    Tipo de Compra
                </h1>
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
                        Nenhum tipo de compra cadastrado.
                    </div>
                )}
                {!loading && !error && !isEmpty && (
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="w-1/3 px-6 py-3">
                                    Id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Nome
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Ação
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {purchaseTypes?.message.map((message) => (
                                <tr key={message.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {message.id}
                                    </th>
                                    <td className="px-6 py-4">
                                        {message.name}
                                    </td>
                                    <td className="px-6 py-2 text-right">
                                        <button 
                                            type="button"
                                            onClick={ () => {
                                                setPurchaseTypeId(message.id);
                                                setIsUpdate(true);
                                                openModal();
                                            }}
                                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Editar
                                        </button>
                                        <button 
                                            type="button" 
                                            onClick={() => handleDelete(message.id)}
                                            disabled={isDeleting === message.id}
                                            className={`focus:outline-none text-white font-medium rounded-lg text-sm px-2 py-2 me-1 ${
                                                isDeleting === message.id 
                                                    ? 'bg-gray-500 cursor-not-allowed' 
                                                    : 'bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                                            }`}
                                        >
                                            {isDeleting === message.id ? 'Deletando...' : 'Deletar'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <ModalPurchaseType 
                isOpen={isModalOpen} 
                onClose={closeModal}
                onPurchaseTypeAction={handlePurchaseType}
                isUpdate={isUpdate}
                purchaseTypeId={isUpdate ? purchaseTypeId : ""}
            />
        </div>
    )
}

export default PurchaseType;