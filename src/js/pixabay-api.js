import axios from 'axios';

const API_KEY = '43813609-98f1a5b8a61f7cd1a2ca10379'; 
const BASE_URL = 'https://pixabay.com/api/';

export const fetchPhotosByQuery = async (query = 'cat') => {
    const searchParams = new URLSearchParams({
        key: API_KEY,
        q: query,
        orientation: 'horizontal',
        page: 1,
        per_page: 15,
    });

    try {
        const response = await axios.get(`${BASE_URL}?${searchParams.toString()}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error ${error.response.status}: ${error.response.statusText}`);
    }
};
