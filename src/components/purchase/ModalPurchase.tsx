import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalPurchaseType: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

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
                            Cadastro de Compra
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
                        <form className="space-y-4" action="#">
                            <div className="flex">
                                <div className="flex-1 mr-5">
                                    <label htmlFor="place" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Local</label>
                                    <input type="text" name="place" id="place" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Papelaria do Zé" />
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrição</label>
                                    <input type="text" name="description" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Caderno 100 folhas" />
                                </div>
                            </div>
                            <div className="flex">
                                <div className="flex-1 mr-5">
                                    <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Data</label>
                                    <input type="date" name="date" id="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                                </div>
                                <div className="flex-1 mr-5">
                                    <label htmlFor="total" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Valor (R$)</label>
                                    <input type="text" name="total" id="total" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="100,00" required />
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="installment" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Parcelas</label>
                                    <input type="number" name="installment" id="installment" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="0" required />
                                </div>
                            </div>
                            <div className="flex">
                                <div className="flex-1 mr-5">
                                    <label htmlFor="person" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Pessoa</label>
                                    <select id="person" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected>Escolha a Pessoa</option>
                                        <option value="1">Pessoa 1</option>
                                        <option value="2">Pessoa 2</option>
                                        <option value="3">Pessoa 3</option>
                                        <option value="4">Pessoa 4</option>
                                    </select>
                                </div>
                                <div className="flex-1 mr-5">
                                    <label htmlFor="paymentType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Tipo de Pagamento</label>
                                    <select id="paymentType" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected>Escolha o Tipo de Pagamento</option>
                                        <option value="1">Dinheiro</option>
                                        <option value="2">Débito</option>
                                        <option value="3">Crédito</option>
                                        <option value="4">PIX</option>
                                    </select>
                                </div>
                                <div className="flex-1 mr-5">
                                    <label htmlFor="creditCard" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cartão de Credito</label>
                                    <select id="creditCard" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected>Escolha o Cartão</option>
                                        <option value="1">Pessoa 1 - 0001</option>
                                        <option value="2">Pessoa 2 - 0010</option>
                                        <option value="3">Pessoa 3 - 0100</option>
                                        <option value="4">Pessoa 4 - 1000</option>
                                    </select>
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="purchaseType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Tipo de Compra</label>
                                    <select id="purchaseType" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected>Escolha o Tipo de Compra</option>
                                        <option value="1">Alimentação</option>
                                        <option value="2">Papelaria</option>
                                        <option value="3">Carro</option>
                                        <option value="4">Casa</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-center">
    <button 
        type="submit" 
        className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 sm:px-10 md:px-20 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-auto min-w-40"
    >
        Adicionar nova compra
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