<template>
  <div class="confirmation-dialog">
    <p>Êtes-vous sûr de vouloir supprimer ce film ?</p>
    <button @click="$emit('confirm')">Oui</button>
    <button @click="$emit('cancel')">Non</button>
  </div>
</template>

<style scoped>
.confirmation-dialog {
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}
.confirmation-dialog button {
  margin: 10px;
}
</style>
