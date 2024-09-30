// services/actorService.js
import axios from 'axios';

const API_URL = 'http://symfony.mmi-troyes.fr:8319/api/actors';

export const getActors = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log('Réponse de l\'API:', response.data); // Vérifiez la réponse
    return response.data['hydra:member'] || []; // Utilisez 'hydra:member' pour accéder aux acteurs
  } catch (error) {
    console.error('Erreur lors de la récupération des acteurs:', error);
    return [];
  }
};
