import instance from "./config";

export const createPerson = async (name: string) => {
    await instance.post('/person', {
        name: name,
    }).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error);
    });
}

export const updatePerson = async (id: string, name: string) => {
    await instance.put(`/person`, {
        id: id,
        name: name,
    }).then((response) => {
        if (response.status === 200 || response.status === 204) {
            console.log("Person updated successfully");
            getPersons();
        }
    }).catch((error) => {
        console.log(error);
    });
}

export const deletePerson = async (id: string) => {
    await instance.delete(`/person/${id}`).then((response) => {
        if (response.status === 200 || response.status === 204) {
            console.log("Person deleted successfully");
            getPersons();
        }
        console.log(response);
    }).catch((error) => {
        console.log(error);
    });
}

export const getPerson = async (id: string) => {
    const response = await instance.get<{
        id: string,
        name: string,
    }>(`/person/${id}`).catch((error) => {
        console.error("Failed to fetch person:", error.message);
        if (error.config) {
            console.error("Request was made to:", error.config.baseURL + error.config.url);
        }
        return {} as any;
    });

    return response.data;
}

export const getPersons = async () => {
    const response = await instance.get<[{
        id: string,
        name: string,
    }]>('/persons').catch((error) => {
        console.error("Failed to fetch persons:", error.message);
        if (error.config) {
            console.error("Request was made to:", error.config.baseURL + error.config.url);
        }
        return [] as any;
    });
    return response.data;
}
