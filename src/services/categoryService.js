// services/categoryService.js
import axios from 'axios';

export async function getCategories() {
  try {
    const response = await axios.get('/api/categories'); // Remplacez par votre endpoint
    console.log('Réponse de l\'API des catégories:', response.data); // Vérifiez la réponse
    return response.data; // Renvoie directement les données des catégories
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    return [];
  }
}
