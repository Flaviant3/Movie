<template>
  <div class="category-card" @click="handleClick">
    <h3>{{ category.name }}</h3>
    <button @click.stop="edit()">Éditer</button>
    <button @click.stop="remove()">Supprimer</button>
  </div>
</template>

<script>
export default {
  props: {
    category: Object
  },
  methods: {
    handleClick() {
      this.$emit('click');
    },
    edit() {
      this.$emit('edit', this.category);
    },
    remove() {
      this.$emit('delete', this.category);
    }
  }
};
</script>

<style scoped>
.category-card {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.2s;
}
.category-card:hover {
  transform: scale(1.05);
}
</style>
