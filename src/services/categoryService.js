import axios from 'axios';

const API_URL = 'http://symfony.mmi-troyes.fr:8319/api/categories';

const getAuthToken = () => {
  return localStorage.getItem('jwtToken'); // Récupérer le token
};

export const getCategories = async () => {
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
    console.log('Réponse de l\'API des catégories:', response.data); // Vérifiez la réponse
    return response.data['hydra:member'] || []; // Utilisez 'hydra:member' pour accéder aux catégories
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    return [];
  }
};
