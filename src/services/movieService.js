import axios from 'axios';

const API_URL = 'http://symfony.mmi-troyes.fr:8319/api/movies';

const getAuthToken = () => {
  return localStorage.getItem('jwtToken');
};

export const getMovies = async () => {
  const allMovies = [];
  let currentPage = 1;
  let totalPages;

  const token = getAuthToken();
  if (!token) {
    console.error('Aucun token d\'authentification trouvé.');
    return [];
  }

  try {
    do {
      const response = await axios.get(`${API_URL}?page=${currentPage}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      allMovies.push(...response.data['hydra:member']);
      const lastPageLink = response.data['hydra:view']['hydra:last'];
      totalPages = lastPageLink ? parseInt(lastPageLink.split('page=')[1]) : currentPage;
      currentPage++;
    } while (currentPage <= totalPages);

    return allMovies;
  } catch (error) {
    console.error('Erreur lors de la récupération des films:', error.response ? error.response.data : error);
    return [];
  }
};

export const addMovie = async (movieData) => {
  const token = getAuthToken();

  if (!token) {
    console.error('Aucun token d\'authentification trouvé pour l\'ajout du film.');
    throw new Error('Token manquant');
  }

  try {
    const response = await axios.post(API_URL, movieData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'ajout du film:', error);
    throw error;
  }
};

export const updateMovie = async (movieId, updatedMovie) => {
  const token = getAuthToken();

  if (!token) {
    console.error('Aucun token d\'authentification trouvé pour la mise à jour du film.');
    throw new Error('Token manquant');
  }

  try {
    const response = await axios.patch(`${API_URL}/${movieId}`, updatedMovie, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/merge-patch+json'
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du film:', error);
    throw error;
  }
};

export const deleteMovie = async (movieId) => {
  const token = getAuthToken();

  if (!token) {
    console.error('Aucun token d\'authentification trouvé pour la suppression du film.');
    throw new Error('Token manquant');
  }

  try {
    await axios.delete(`${API_URL}/${movieId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Erreur lors de la suppression du film:', error);
    throw error;
  }
};
