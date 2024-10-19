import axios from 'axios';

const API_URL = 'http://symfony.mmi-troyes.fr:8319';
const API_URL_MOVIES = `${API_URL}/api/movies`;
const API_URL_ACTORS = `${API_URL}/api/actors`;

const getAuthToken = () => {
  return localStorage.getItem('jwtToken'); // Récupérer le token
};

export const fetchLatestMovies = async () => {
  const token = getAuthToken();
  try {
    const response = await axios.get(API_URL_MOVIES, {
      headers: {
        'Authorization': `Bearer ${token}` // Ajoutez le token dans les en-têtes
      }
    });
    return response.data['hydra:member'] || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des derniers films:', error);
    return [];
  }
};

export const fetchMovieDetails = async (movieId) => {
  const token = getAuthToken();
  try {
    const response = await axios.get(`${API_URL_MOVIES}/${movieId}?include=actors`, {
      headers: {
        'Authorization': `Bearer ${token}` // Ajoutez le token dans les en-têtes
      }
    });
    return response.data; // Retourne les détails du film avec les acteurs
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du film:', error);
    throw error;
  }
};

export const fetchActorDetails = async (actorId) => {
  const token = getAuthToken();
  try {
    const response = await axios.get(`${API_URL}/api/actors/${actorId}?include=movies`, {
      headers: {
        'Authorization': `Bearer ${token}` // Ajoutez le token dans les en-têtes
      }
    });
    return response.data; // Retourne les détails de l'acteur avec les films
  } catch (error) {
    console.error('Erreur lors de la récupération des détails de l\'acteur:', error);
    throw error;
  }
};

export const fetchLatestActors = async () => {
  const token = getAuthToken();
  try {
    const response = await axios.get(API_URL_ACTORS, {
      headers: {
        'Authorization': `Bearer ${token}` // Ajoutez le token dans les en-têtes
      }
    });
    return response.data['hydra:member'] || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des derniers acteurs:', error);
    return [];
  }
};
