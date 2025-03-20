import { useState, useEffect } from "react";
import ModalPerson from "./ModalPerson";
import { getPersons, deletePerson } from "@/services/person";

interface MessageItem {
    id: string;
    name: string;
}

interface PersonData {
    Message: MessageItem[];
    StatusCode: number;
}

function Person() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [persons, setPersons] = useState<PersonData>(); // Mantendo PersonData
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [personId, setPersonId] = useState<string>("");
    
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await getPersons();
            setPersons(data);
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

    const handlePerson = () => {
        fetchData();
        closeModal();
    }

    const handleDelete = async (id: string) => {
        console.log("Deleting person", id);
        await deletePerson(id).then(() => {
            fetchData();
        }).catch((error) => {
            console.error(error);
        });
    }

    if (loading) {
        return (
            <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                <span className="font-medium">Carregando...</span>
            </div>
        )
    }

    if (error) {
        return(
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">Error:</span> {error}
            </div>
        )
    }

    return (
        <div>
            <div className="flex items-center mt-5">
                <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 ml-10 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={() =>
                        {
                            openModal();
                            setIsUpdate(false);
                        }    
                    }
                >
                    Novo
                </button>
                <h1 className="text-2xl ml-115 mt-5 mr-10 font-semibold text-gray-900 dark:text-white">Pessoa</h1>
            </div>       
            <div className="relative overflow-x-auto mt-10 ml-10 mr-10 shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="w-1/3 px-6 py-3">
                                Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nome
                            </th>
                            <th scope="col" className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {persons?.Message?.map((message) => (
                            <tr
                                key={message.id}
                                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-500 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {message.id}
                                </th>
                                <td className="px-6 py-4">{message.name}</td>
                                <td className="px-6 py-2 text-right">
                                    <button 
                                        type="button"
                                        onClick={ () => {
                                            setPersonId(message.id);
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
            </div>
            <ModalPerson 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                onPersonAction={handlePerson}
                isUpdate={isUpdate}
                personId={isUpdate ? personId : ""}
            />
        </div>
    );
}

export default Person;