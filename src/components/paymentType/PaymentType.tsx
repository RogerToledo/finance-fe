import { useState, useEffect } from "react";
import ModalPaymentType from "./ModalPaymentType";
import { 
    deletePaymentType, 
    getPaymentTypes,
    type PaymentTypeResponse
} from "@/services/paymentType";

function PaymentType() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [paymentTypes, setPaymentTypes] = useState<PaymentTypeResponse>({
        message: [],
        statusCode: 0,
    });
    const [error, setError] = useState<string | null>(null);
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [paymentTypeId, setPaymentTypeId] = useState<string>("");

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const fetchData = async () => {
        setError(null);

        try {
            const data = await getPaymentTypes();
            if (data) {
                setPaymentTypes(data);
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred");
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handlePaymentType = () => {
        fetchData();
        closeModal();
    }

    const handleDelete = async (id: string) => {
        setError(null);
        if (!window.confirm("Tem certeza que deseja deletar este tipo de pagamento?")) return;
        
        try {
            console.log("Deleting paymentType", id);
            await deletePaymentType(id);
            await fetchData();
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Ocorreu um erro desconhecido");
            }
        }
    }

    const handleOpenNew = () => {
        setPaymentTypeId("");
        setIsUpdate(false);
        openModal();
    }

    const isEmpty = !error && (!paymentTypes?.message || paymentTypes.message.length === 0);

    return (
        <div>
            <div className="flex items-center mt-5">
                <button 
                    type="button" 
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 ml-10 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={handleOpenNew}
                >Novo</button> 
                <h1 className="text-2xl ml-10 mt-5 mr-10 font-semibold text-gray-900 dark:text-white text-center flex-1 pr-20">Tipo de Pagamento</h1> 
            </div>
            <div className="relative overflow-x-auto mt-10 ml-10 mr-10 shadow-md sm:rounded-lg">
            {error && (
                    <div className="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                        </svg>
                        <span className="sr-only">Erro</span>
                        <div className="ms-3 text-sm font-medium">
                            {error}
                        </div>
                        <button 
                            onClick={() => setError(null)}
                            type="button" 
                            className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" 
                            aria-label="Close"
                        >
                            <span className="sr-only">Fechar</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                        </button>
                    </div>
                )}
                {isEmpty && (
                    <div className="p-5 text-center text-gray-500 bg-white dark:bg-gray-800">
                        Não existe tipos de pagamento cadastrados
                    </div>
                )}                
                {!isEmpty && (  
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-30 py-3">
                                    Nome
                                </th>
                                <th scope="col" className="px-30 py-3">
                                    À vista | parcelado
                                </th>
                                <th scope="col" className="px-0 py-3">
                                    
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {paymentTypes?.message.map((message) => (
                                <tr key={message.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                    <td className="px-30 py-4">
                                        {message.name}
                                    </td>
                                    <td className="px-40 py-4">
                                        {message.spot_installment === 0 ? "À vista" : message.spot_installment === 1 ? "Parcelado" : "Ambos"}
                                    </td>
                                    <td className="px-6 py-2 text-right">
                                        <button 
                                            type="button"
                                            onClick={ () => {
                                                setPaymentTypeId(message.id);
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
            <ModalPaymentType 
                isOpen={isModalOpen} 
                onClose={closeModal}
                onPaymentTypeAction={handlePaymentType}
                isUpdate={isUpdate}
                paymentTypeId={isUpdate ? paymentTypeId : ""}
            />
        </div>
    )
}

export default PaymentType;