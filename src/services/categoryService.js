import axios from 'axios';

const API_URL = 'http://symfony.mmi-troyes.fr:8319/api/categories';

export async function getCategories() {
  try {
    const response = await axios.get(API_URL); // Utilisation de l'URL API définie
    console.log('Réponse de l\'API des catégories:', response.data); // Vérifiez la réponse
    return response.data['hydra:member'] || []; // Utilisez 'hydra:member' pour accéder aux acteurs
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    return []; // Retourne un tableau vide en cas d'erreur
  }
}
