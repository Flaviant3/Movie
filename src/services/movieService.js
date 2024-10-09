// services/movieService.js
import axios from 'axios';

const API_URL = 'http://symfony.mmi-troyes.fr:8319/api/movies';

export const getMovies = async () => {
  const allMovies = [];
  let currentPage = 1;
  let totalPages;

  try {
    do {
      const response = await axios.get(`${API_URL}?page=${currentPage}`);
      console.log('Réponse de l\'API:', response.data); // Vérifiez la réponse

      // Ajoutez les films de la page actuelle
      allMovies.push(...response.data['hydra:member']);

      // Récupérez le nombre total de pages
      const lastPageLink = response.data['hydra:view']['hydra:last'];
      totalPages = lastPageLink ? parseInt(lastPageLink.split('page=')[1]) : currentPage;

      currentPage++;
    } while (currentPage <= totalPages);

    return allMovies; // Retournez tous les films
  } catch (error) {
    console.error('Erreur lors de la récupération des films:', error);
    return [];
  }
};

export const addMovie = async (newMovie) => {
  try {
    const response = await axios.post(API_URL, newMovie);
    return response.data; // Assurez-vous de retourner les données de la réponse
  } catch (error) {
    console.error('Erreur lors de l\'ajout du film:', error); // Affichez l'erreur
    throw error; // Relancez l'erreur pour la gérer dans le composant
  }
};

export async function deleteMovie(movieId) {
  try {
    await axios.delete(`${API_URL}/${movieId}`);
  } catch (error) {
    console.error('Erreur lors de la suppression du film:', error);
    throw error; // Relancer l'erreur pour la gérer dans le composant
  }
}
