import { useState, useEffect } from 'react';
import { createPerson, getPerson, updatePerson } from '@/services/person';

interface ModalPersonProps {
    isOpen: boolean;
    onClose: () => void;
    onPersonAction: () => void;
    isUpdate: boolean;
    personId: string;
}

const ModalPerson: React.FC<ModalPersonProps> = ({ isOpen, onClose, onPersonAction, isUpdate, personId }) => {
    const [personName, setPersonName] = useState('');
    const [title, setTitle] = useState("Cadastro de Pessoa");
    const [buttonText, setButtonText] = useState("Adicionar nova pessoa");

    useEffect(() => {
        if (isUpdate && personId) {
            setTitle("Atualização de Pessoa");
            setButtonText("Atualizar pessoa");
            const fetchPerson = async () => {
                try {
                    const response = await getPerson(personId);
                    setPersonName(response.Message.name);
                } catch (error) {
                    console.error("Error fetching person", error);
                }
            };
            fetchPerson();
        } else {
            setTitle("Cadastro de Pessoa");
            setButtonText("Adicionar nova pessoa");
            setPersonName("");
        }
    }, [isUpdate, personId]); // Removido personName

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (isUpdate) {
                console.log("Updating person", personId, personName);
                await updatePerson(personId, personName);
            } else {
                await createPerson(personName);
            }

            onPersonAction();
        } catch (err) {
            console.error("Error creating person", err);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPersonName(e.target.value);
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {title}
                        </h3>
                        <button type="button" onClick={onClose} className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l6-6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="personName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                                <input
                                    type="text"
                                    name="personName"
                                    id="personName"
                                    value={personName}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Digite um nome"
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

export default ModalPerson;