import axios from 'axios'; // Assurez-vous d'importer axios

const API_URL = 'http://symfony.mmi-troyes.fr:8319/api/actors'; // Remplacez par votre URL API

const getAuthToken = () => {
  return localStorage.getItem('jwtToken'); // Récupérer le token
};

export const getActors = async () => {
  const token = getAuthToken();
  console.log(token, 'mon token'); // Vérifiez le token

  if (!token) {
    console.error('Aucun token d\'authentification trouvé.');
    return [];
  }

  try {
    const response = await axios.get(API_URL, {
      headers: {
        'Authorization': `Bearer ${token}` // Ajoutez le token dans les en-têtes
      }
    });
    console.log('Réponse de l\'API:', response.data); // Vérifiez la réponse
    return response.data['hydra:member'] || []; // Utilisez 'hydra:member' pour accéder aux acteurs
  } catch (error) {
    console.error('Erreur lors de la récupération des acteurs:', error);
    if(error.response.status === 401) {
      localStorage.removeItem('jwtToken');
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
    const response = await axios.post(API_URL, newActor, {
      headers: {
        'Authorization': `Bearer ${token}` // Ajoutez le token dans les en-têtes
      }
    });
    return response.data; // Retourne les données de la réponse
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'acteur:', error);
    throw error; // Relance l'erreur pour la gérer dans le composant
  }
};

export const deleteActor = async (actorId) => {
  const token = getAuthToken();

  if (!token) {
    console.error('Aucun token d\'authentification trouvé pour la suppression de l\'acteur.');
    throw new Error('Token manquant');
  }

  try {
    await axios.delete(`${API_URL}/${actorId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'acteur:', error);
    throw error;
  }
};
