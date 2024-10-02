import axios from 'axios';

const API_URL = 'http://symfony.mmi-troyes.fr:8319';
const API_URL_MOVIES = 'http://symfony.mmi-troyes.fr:8319/api/movies';
const API_URL_ACTORS = 'http://symfony.mmi-troyes.fr:8319/api/actors';

export const fetchLatestMovies = async () => {
  try {
    const response = await axios.get(API_URL_MOVIES);
    return response.data['hydra:member'] || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des derniers films:', error);
    return [];
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`${API_URL_MOVIES}/${movieId}?include=actors`);
    return response.data; // Retourne les détails du film avec les acteurs
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du film:', error);
    throw error;
  }
};

export const fetchActorDetails = async (actorId) => {
  try {
    const response = await axios.get(`${API_URL}${actorId}?include=movies`);
    return response.data; // Retourne les détails de l'acteur avec les films
  } catch (error) {
    console.error('Erreur lors de la récupération des détails de l\'acteur:', error);
    throw error;
  }
}
export const fetchLatestActors = async () => {
  try {
    const response = await axios.get(API_URL_ACTORS);
    return response.data['hydra:member'] || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des derniers acteurs:', error);
    return [];
  }
};
