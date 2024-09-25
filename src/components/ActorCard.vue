<template>
  <div class="actor-card" @click="handleClick">
    <h3>{{ actor.name }}</h3>
  </div>
</template>

<script>
export default {
  props: {
    actor: Object
  },
  methods: {
    handleClick() {
      this.$emit('click');
    }
  }
};
</script>

<style scoped>
.actor-card {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.2s;
}
.actor-card:hover {
  transform: scale(1.05);
}
</style>
