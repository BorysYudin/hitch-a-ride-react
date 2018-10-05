export const handleResponse = response => {
    if([200, 201].includes(response.status))
        return response;
    return Promise.reject(response);
};
