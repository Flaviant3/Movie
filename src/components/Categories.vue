<template>
  <div class="categories-page">
    <h1>Catégories de Films</h1>

    <input type="text" v-model="searchQuery" placeholder="Rechercher par nom de catégorie" />

    <button @click="showAddCategoryForm = !showAddCategoryForm">
      {{ showAddCategoryForm ? 'Annuler' : 'Ajouter une catégorie' }}
    </button>

    <div v-if="showAddCategoryForm">
      <h2>Ajouter une catégorie</h2>
      <form @submit.prevent="addCategory">
        <input type="text" v-model="newCategory.name" placeholder="Nom de la catégorie" required />
        <button type="submit">Ajouter</button>
      </form>
    </div>

    <div class="categories-list">
      <CategoryCard
        v-for="category in paginatedCategories"
        :key="category.id"
        :category="category"
        @click.native="goToCategoryDetails(category.id)"
        @edit="editCategory(category)"
        @delete="confirmDelete(category)"
      />
    </div>

    <pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      @change-page="changePage"
    />

    <popin-confirmation
      v-if="showConfirmation"
      @confirm="deleteCategory"
      @cancel="showConfirmation = false"
    />
  </div>
</template>

<script>
import CategoryCard from './CategoryCard.vue';
import Pagination from './Pagination.vue';
import PopinConfirmation from './PopinConfirmation.vue';

export default {
  components: {
    CategoryCard,
    Pagination,
    PopinConfirmation
  },
  data() {
    return {
      searchQuery: '',
      categories: [], // Remplir avec la liste des catégories
      newCategory: {
        name: ''
      },
      showAddCategoryForm: false,
      currentPage: 1,
      itemsPerPage: 5,
      showConfirmation: false,
      categoryToDelete: null
    };
  },
  computed: {
    filteredCategories() {
      return this.categories.filter(category =>
        category.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    paginatedCategories() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredCategories.slice(start, start + this.itemsPerPage);
    },
    totalPages() {
      return Math.ceil(this.filteredCategories.length / this.itemsPerPage);
    }
  },
  methods: {
    goToCategoryDetails(categoryId) {
      this.$router.push({ name: 'CategoryDetails', params: { id: categoryId } });
    },
    addCategory() {
      const newId = this.categories.length + 1; // Remplacer par une logique d'ID unique
      this.categories.push({ id: newId, ...this.newCategory });
      this.resetNewCategory();
      this.showAddCategoryForm = false;
    },
    resetNewCategory() {
      this.newCategory = { name: '' };
    },
    editCategory(category) {
      this.newCategory = { ...category };
      this.showAddCategoryForm = true;
    },
    confirmDelete(category) {
      // Vérifiez si la catégorie est liée à des films
      if (this.isCategoryLinkedToMovies(category)) {
        alert('Cette catégorie ne peut pas être supprimée car elle est liée à un ou plusieurs films.');
        return;
      }
      this.categoryToDelete = category.id;
      this.showConfirmation = true;
    },
    deleteCategory() {
      this.categories = this.categories.filter(category => category.id !== this.categoryToDelete);
      this.showConfirmation = false;
      this.categoryToDelete = null;
    },
    changePage(page) {
      this.currentPage = page;
    },
    isCategoryLinkedToMovies(category) {
      // Remplacer par votre logique pour vérifier si la catégorie est liée à des films
      // Par exemple, vous pourriez avoir une liste de films avec une propriété categoryId
      return false; // Placeholder, à remplacer par la vraie logique
    }
  },
  created() {
    // Remplacer par votre logique pour récupérer les catégories
    this.categories = [
      { id: 1, name: 'Action' },
      { id: 2, name: 'Comédie' },
      { id: 3, name: 'Drame' },
      { id: 4, name: 'Science-fiction' },
      { id: 5, name: 'Horreur' },
      { id: 6, name: 'Documentaire' }
    ];
  }
};
</script>

<style scoped>
.categories-page {
  padding: 20px;
}
.categories-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
