<template>
  <div>
    <h1>Liste des Catégories</h1>
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Rechercher une catégorie..."
      class="search-input"
    />
    <div class="categories-list">
      <CategoryCard
        v-for="category in filteredCategories"
        :key="category.id"
        :category="category"
        @click="handleCategoryClick(category)"
      />
    </div>
  </div>
</template>

<script>
import { getCategories } from '../services/categoryService'; // Service pour récupérer les catégories
import CategoryCard from './CategoryCard.vue'; // Importer le composant CategoryCard

export default {
  components: {
    CategoryCard
  },
  data() {
    return {
      categories: [],
      searchQuery: '' // Ajout d'une propriété pour la recherche
    };
  },
  async created() {
    this.categories = await getCategories(); // Récupérer la liste des catégories
  },
  computed: {
    filteredCategories() {
      // Filtrer les catégories en fonction de la recherche
      return this.categories.filter(category => {
        return category.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    }
  },
  methods: {
    handleCategoryClick(category) {
      // Logique à exécuter lors du clic sur une carte de catégorie
      console.log('Catégorie cliquée:', category);
    }
  }
};
</script>

<style scoped>
.categories-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 colonnes */
  gap: 15px; /* Espace entre les cartes */
  padding: 20px; /* Padding autour de la grille */
}

.category-card {
  background-color: #fefefe; /* Fond légèrement gris */
  border: none; /* Suppression de la bordure pour un look plus moderne */
  border-radius: 8px; /* Coins arrondis */
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s; /* Transition pour l'effet */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Ombre légère */
  overflow: hidden; /* Pour éviter que le contenu déborde */
}

.category-card:hover {
  transform: scale(1.05); /* Légère augmentation de taille au survol */
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2); /* Ombre plus prononcée au survol */
}

.search-input {
  width: 100%; /* Largeur 100% pour le champ de recherche */
  padding: 10px; /* Espacement intérieur */
  margin-bottom: 20px; /* Marge en bas */
  border: 1px solid #ccc; /* Bordure */
  border-radius: 5px; /* Coins arrondis */
  font-size: 1em; /* Taille de la police */
}

h1 {
  text-align: center; /* Alignement centré pour le titre */
  margin-bottom: 20px; /* Marge en bas du titre */
}
</style>
