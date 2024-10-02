// services/api.js
import axios from 'axios';

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

export const fetchLatestActors = async () => {
  try {
    const response = await axios.get(API_URL_ACTORS);
    return response.data['hydra:member'] || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des derniers acteurs:', error);
    return [];
  }
};
