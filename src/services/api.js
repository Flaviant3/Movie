import axios from 'axios';

const API_URL = 'http://symfony.mmi-troyes.fr:8319/api'; // Remplacez par l'URL de votre API

export const fetchLatestMovies = async () => {
  try {
    const response = await axios.get(`${API_URL}/movies/latest`); // Assurez-vous que ce point de terminaison existe
    return response.data; // Retourne les données des films
  } catch (error) {
    console.error('Erreur lors de la récupération des films:', error);
    throw error; // Propager l'erreur
  }
};

export class api {
  static async get(s) {

  }

  static async post(s, movie) {

  }
}
