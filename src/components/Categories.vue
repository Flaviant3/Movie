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
import CategoryCard from './CategoryCard.vue';

export default {
  components: {
    Category: CategoryCard
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
  background-color: #141414;
  color: #ffffff;
}

.search-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #555;
  border-radius: 5px;
  font-size: 1em;
  background-color: #333;
  color: #fff;
}

.search-input::placeholder {
  color: #aaa;
}

.categories-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  padding: 20px;
}

.category-card {
  background-color: #222;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.category-card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.7);
}

h3 {
  margin: 10px 0 5px;
  font-size: 1.2em;
  text-align: center;
  color: #e50914;
}

p {
  margin: 0 0 10px;
  font-size: 0.9em;
  color: #ddd;
  text-align: center;
}
</style>
