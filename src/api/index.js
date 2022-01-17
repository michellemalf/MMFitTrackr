

export const BASE_URL = 'https://fitnesstrac-kr.herokuapp.com/api';

export const callApi = async ({ url, method, token, body }) => {
    console.log('callApi: ', { url, method, token, body });

    try {
        const options = {
            method: method ? method.toUpperCase() : 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };

        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }

        console.log('request URL: ', BASE_URL + url);
        const response = await fetch(BASE_URL + url, options);
        console.log(response)
        const data = await response.json();
        console.log('data: ', data);

        if (data.error) {
            throw data.error;
        }

        return data;
    } catch (error) {
        console.error('ERROR: ', error);
    }
};