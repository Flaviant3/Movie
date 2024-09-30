// services/movieService.js
import axios from 'axios';

const API_URL = 'http://symfony.mmi-troyes.fr:8319/api/movies';

export const getMovies = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log('Réponse de l\'API:', response.data); // Vérifiez la réponse
    return response.data['hydra:member'] || []; // Utilisez 'hydra:member' pour accéder aux films
  } catch (error) {
    console.error('Erreur lors de la récupération des films:', error);
    return [];
  }
};
