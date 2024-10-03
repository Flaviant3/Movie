<template>
  <div>
    <input
      type="text"
      v-model="searchTerm"
      placeholder="Rechercher une catégorie"
      class="search-input"
    />
    <div class="categories-list">
      <div v-for="category in filteredCategories" :key="category.id">
        <Category :category="category" @click="handleCategoryClick(category)" />
      </div>
    </div>
  </div>
</template>

<script>
import { getCategories } from '../services/categoryService';
import CategoryCard from './CategoryCard.vue'; // Assurez-vous que le chemin est correct

export default {
  components: {
    Category: CategoryCard // Enregistrement du composant
  },
  data() {
    return {
      categories: [],
      searchTerm: '',
    };
  },
  computed: {
    filteredCategories() {
      return this.categories.filter(category => {
        return category.title && category.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      });
    }
  },
  methods: {
    async fetchCategories() {
      this.categories = await getCategories();
    },
    handleCategoryClick(category) {
      console.log('Category clicked:', category);
    }
  },
  mounted() {
    this.fetchCategories();
  }
};
</script>

<style scoped>
body {
  background-color: #141414; /* Fond sombre pour correspondre à l'esthétique Netflix */
  color: #ffffff; /* Texte blanc pour un bon contraste */
}

.search-input {
  width: 100%; /* Largeur 100% pour le champ de recherche */
  padding: 10px; /* Espacement intérieur */
  margin-bottom: 20px; /* Marge en bas */
  border: 1px solid #555; /* Bordure sombre */
  border-radius: 5px; /* Coins arrondis */
  font-size: 1em; /* Taille de la police */
  background-color: #333; /* Fond sombre pour le champ de recherche */
  color: #fff; /* Texte blanc */
}

.search-input::placeholder {
  color: #aaa; /* Couleur des placeholders */
}

.categories-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); /* Colonnes adaptatives */
  gap: 20px; /* Espace entre les cartes */
  padding: 20px; /* Padding autour de la grille */
}

.category-card {
  background-color: #222; /* Fond sombre pour les cartes de catégories */
  border: none; /* Suppression de la bordure pour un look plus moderne */
  border-radius: 8px; /* Coins arrondis */
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s; /* Transition pour l'effet */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5); /* Ombre légère */
  overflow: hidden; /* Pour éviter que le contenu déborde */
}

.category-card:hover {
  transform: scale(1.05); /* Légère augmentation de taille au survol */
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.7); /* Ombre plus prononcée au survol */
}

h3 {
  margin: 10px 0 5px; /* Marges pour le titre */
  font-size: 1.2em; /* Taille de police du titre */
  text-align: center; /* Alignement centré */
  color: #e50914; /* Rouge Netflix pour le titre */
}

p {
  margin: 0 0 10px; /* Marges pour la description */
  font-size: 0.9em; /* Taille de police pour la description */
  color: #ddd; /* Couleur de texte pour la description */
  text-align: center; /* Alignement centré */
}
</style>
