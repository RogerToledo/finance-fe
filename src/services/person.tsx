import instance from "./config";

export interface Person {
    id: string;
    name: string;
}

export interface PersonResponse {
    message: Person[];
    statusCode: number;
}

export interface PeopleResponse {
    message: Person;
    statusCode: number;
}

export const createPerson = async (name: string) => {
    const response = await instance.post('/v1/person', {
        name: name,
    });

    return response.data;
}

export const updatePerson = async (id: string, name: string) => {
    const response = await instance.put(`/v1/person`, {
        id: id,
        name: name,
    });

    return response.data;
}

export const deletePerson = async (id: string) => {
    const response = await instance.delete(`/v1/person/${id}`);

    return response.data;
}

export const getPeople = async (id: string) => {
    const response = await instance.get<PeopleResponse>(`/v1/person/${id}`);

    return response.data;
}

export const getPerson = async () => {
    const response = await instance.get<PersonResponse>('/v1/person');
    return response.data;
}
