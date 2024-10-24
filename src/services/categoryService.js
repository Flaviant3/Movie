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

export const addCategory = async (categoryData) => {
  const token = getAuthToken();

  if (!token) {
    console.error('Aucun token d\'authentification trouvé pour l\'ajout de la catégorie.');
    throw new Error('Token manquant');
  }

  try {
    const response = await axios.post(API_URL, categoryData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la catégorie:', error);
    throw error;
  }
};

export const updateCategory = async (categoryId, updatedCategory) => {
  const token = getAuthToken();

  if (!token) {
    console.error('Aucun token d\'authentification trouvé pour la mise à jour de la catégorie.');
    throw new Error('Token manquant');
  }

  try {
    const response = await axios.patch(`${API_URL}/${categoryId}`, updatedCategory, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/merge-patch+json'
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la catégorie:', error);
    throw error;
  }
};

export const deleteCategory = async (categoryId) => {
  const token = getAuthToken();

  if (!token) {
    console.error('Aucun token d\'authentification trouvé pour la suppression de la catégorie.');
    throw new Error('Token manquant');
  }

  try {
    await axios.delete(`${API_URL}/${categoryId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Erreur lors de la suppression de la catégorie:', error);
    throw error;
  }
};
