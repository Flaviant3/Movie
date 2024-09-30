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
    this.categories = await getCategories(); // Charger les catégories au moment de la création
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
      this.$router.push({ name: 'CategoryDetails', params: { id: category.id } }); // Navigation vers les détails de la catégorie
    }
  }
};
</script>

<style>
.categories-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 colonnes */
  gap: 20px; /* Espace entre les cartes */
  padding: 20px; /* Padding autour de la grille */
}

.category-card {
  background-color: #fefefe; /* Fond légèrement gris */
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s; /* Transition pour l'effet */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* Pour éviter que le contenu déborde */
}

.category-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Ombre plus prononcée au survol */
}

.search-input {
  width: 100%; /* Largeur 100% pour le champ de recherche */
  padding: 10px; /* Espacement intérieur */
  margin-bottom: 20px; /* Marge en bas */
  border: 1px solid #ccc; /* Bordure */
  border-radius: 5px; /* Coins arrondis */
  font-size: 1em; /* Taille de la police */
}

h3 {
  margin: 10px 0 5px; /* Marges pour le titre */
  font-size: 1.2em; /* Taille de police du titre */
}

p {
  margin: 0 0 10px; /* Marges pour la description */
  font-size: 0.9em; /* Taille de police pour la description */
  color: #555; /* Couleur de texte pour la description */
}
</style>
