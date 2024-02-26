import axios from 'axios';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'e6b6c8af914a6106c49c3b6632be77bd';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  params: {
    api_key: API_KEY
  }
});

export const getPopularMovies = async () => {
  try {
    const response = await apiClient.get('/movie/popular');
    return response.data.results;
  } catch (error) {
    // Handle the error here. For example, you could log it or display a message to the user.
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};