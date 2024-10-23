<template>
  <div class="pagination">
    <button :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">Précédent</button>
    <span>Page {{ currentPage }} sur {{ totalPages }}</span>
    <button :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)">Suivant</button>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: Number,
    totalPages: Number
  },
  methods: {
    goToPage(page) {
      this.$emit('onPageChange', page);
    }
  }
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

button {
  margin: 0 5px;
}
</style>
