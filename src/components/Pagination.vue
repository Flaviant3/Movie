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
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

:root {
  --primary-color: #e67e22; /* Orange */
  --secondary-color: #2ecc71; /* Green */
  --background-color: #ecf0f1; /* Light Gray */
  --text-color: #2c3e50; /* Dark Gray */
  --border-radius: 5px;
  --transition-duration: 0.3s;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  font-family: 'Roboto', sans-serif;
  color: var(--text-color);
}

button {
  margin: 0 5px;
  padding: 10px 15px;
  border: none;
  border-radius: var(--border-radius);
  background-color: #d35400; /* Darker orange */
  color: white;
  cursor: pointer;
  transition: background-color var(--transition-duration), transform var(--transition-duration);
}

button:disabled {
  background-color: #bdc3c7; /* Disabled button color */
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #e67e22; /* Orange */
  transform: scale(1.05);
}

span {
  margin: 0 10px;
  font-size: 1.2em;
}
</style>
