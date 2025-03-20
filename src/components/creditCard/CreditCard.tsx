import { useState } from "react";
import ModalCreditCard from "./ModalCreditCard";

function CreditCard() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    return (
        <div>
            <div className="flex items-center mt-5">
                <button 
                    type="button" 
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 ml-10 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={openModal}
                >Novo</button> 
                <h1 className="text-2xl ml-102 mt-5 mr-10 font-semibold text-gray-900 dark:text-white">Cartão de Crédito</h1> 
            </div>
            <div className="relative overflow-x-auto mt-10 ml-10 mr-10 shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Proprietário
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Cartão Final
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tido de Cartão
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Dia do Vencimento
                            </th>
                            <th scope="col" className="px-6 py-3">
                                
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                fbc1b59d-a32d-4bf4-bfd4-6ebb575852e8
                            </th>
                            <td className="px-6 py-4">
                                Teste 1
                            </td>
                            <td className="px-6 py-4">
                                0001
                            </td>
                            <td className="px-6 py-4">
                                Físico
                            </td>
                            <td className="px-6 py-4">
                                1
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button 
                                    type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Editar
                                </button>
                                <button 
                                    type="button" 
                                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2 me-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Deletar
                                </button>
                            </td>
                        </tr>
                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                fbc1b59d-a32d-4bf4-bfd4-6ebb575852e8
                            </th>
                            <td className="px-6 py-4">
                                Teste 2
                            </td>
                            <td className="px-6 py-4">
                                0002
                            </td>
                            <td className="px-6 py-4">
                                Físico
                            </td>
                            <td className="px-6 py-4">
                                1
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button 
                                    type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Editar
                                </button>
                                <button 
                                    type="button" 
                                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2 me-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Deletar
                                </button>
                            </td>
                        </tr>
                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                fbc1b59d-a32d-4bf4-bfd4-6ebb575852e8
                            </th>
                            <td className="px-6 py-4">
                                Teste 3
                            </td>
                            <td className="px-6 py-4">
                                0003
                            </td>
                            <td className="px-6 py-4">
                                Virtual
                            </td>
                            <td className="px-6 py-4">
                                1
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button 
                                    type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Editar
                                </button>
                                <button 
                                    type="button" 
                                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2 me-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Deletar
                                </button>
                            </td>
                        </tr>
                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                fbc1b59d-a32d-4bf4-bfd4-6ebb575852e8
                            </th>
                            <td className="px-6 py-4">
                                Teste 4
                            </td>
                            <td className="px-6 py-4">
                                0004
                            </td>
                            <td className="px-6 py-4">
                                Virtual Temporário
                            </td>
                            <td className="px-6 py-4">
                                1
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button 
                                    type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Editar
                                </button>
                                <button 
                                    type="button" 
                                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2 me-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Deletar
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <ModalCreditCard isOpen={isModalOpen} onClose={closeModal} />
        </div>
    )
}

export default CreditCard;