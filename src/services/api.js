import axios from 'axios';

const API_URL = 'http://symfony.mmi-troyes.fr:8319/api';
const API_URL_MOVIES = `${API_URL}/movies`;
const API_URL_ACTORS = `${API_URL}/actors`;

const getAuthToken = () => {
  return localStorage.getItem('jwtToken'); // Récupérer le token
};

export const getActors = async () => {
  const token = getAuthToken();
  console.log(token, 'mon token');

  if (!token) {
    console.error('Aucun token d\'authentification trouvé.');
    return [];
  }

  try {
    const response = await axios.get(API_URL_ACTORS, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('Réponse de l\'API:', response.data);
    return response.data['hydra:member'] || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des acteurs:', error);
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('jwtToken');
      // Redirection vers la page de connexion
      this.router.push('/login');
    }
  }
};

export const addActor = async (newActor) => {
  const token = getAuthToken();

  if (!token) {
    console.error('Aucun token d\'authentification trouvé.');
    throw new Error('Unauthorized');
  }

  try {
    const response = await axios.post(API_URL_ACTORS, newActor, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'acteur:', error);
    throw error;
  }
};

export const deleteActor = async (actorId) => {
  const token = getAuthToken();

  if (!token) {
    console.error('Aucun token d\'authentification trouvé pour la suppression de l\'acteur.');
    throw new Error('Token manquant');
  }

  try {
    await axios.delete(`${API_URL_ACTORS}/${actorId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'acteur:', error);
    throw error;
  }
};

export const fetchLatestMovies = async () => {
  const token = getAuthToken();
  try {
    const response = await axios.get(API_URL_MOVIES, {
      headers: {
        'Authorization': `Bearer ${token}`
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
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du film:', error);
    throw error;
  }
};

export const fetchActorDetails = async (actorId) => {
  const token = getAuthToken();
  try {
    const response = await axios.get(`${API_URL_ACTORS}/${actorId}?include=movies`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des détails de l\'acteur:', error);
    console.error('Détails de l\'erreur:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const fetchLatestActors = async () => {
  return await getActors(); // Réutilisation de la fonction getActors
};
