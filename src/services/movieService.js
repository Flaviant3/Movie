import axios from 'axios'; // Assurez-vous d'importer axios

const API_URL = 'http://symfony.mmi-troyes.fr:8319/api/movies'; // Remplacez par votre URL API

const getAuthToken = () => {
  return localStorage.getItem('jwtToken'); // Récupérer le token
};

export const getMovies = async () => {
  const allMovies = [];
  let currentPage = 1;
  let totalPages;

  const token = getAuthToken();
  console.log(token, 'mon token'); // moshi verif token

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
    console.error('Erreur lors de la récupération des films:', error);
    return [];
  }
};


export const addMovie = async (movieData) => {
  const token = localStorage.getItem('jwtToken'); // Récupérer le jeton du localStorage

  try {
    const response = await axios.post('http://symfony.mmi-troyes.fr:8319/api/movies', movieData, {
      headers: {
        Authorization: `Bearer ${token}`, // Ajouter le jeton dans l'en-tête
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'ajout du film:', error);
    throw error; // Propager l'erreur pour la gestion ultérieure
  }
};

export const updateMovie = async (movieId, updatedMovie) => {
  try {
    const response = await axios.patch(`${API_URL}/${movieId}`, updatedMovie, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/merge-patch+json'
      },
    });
    return response.data; // Assurez-vous de retourner les données de la réponse
  } catch (error) {
    console.error('Erreur lors de la mise à jour du film:', error); // Affichez l'erreur
    throw error; // Relancez l'erreur pour la gérer dans le composant
  }
}

export async function deleteMovie(movieId) {
  try {
    await axios.delete(`${API_URL}/${movieId}`);
  } catch (error) {
    console.error('Erreur lors de la suppression du film:', error);
    throw error; // Relancer l'erreur pour la gérer dans le composant
  }
}
