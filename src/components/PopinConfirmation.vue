<template>
  <div class="popin">
    <div class="popin-content">
      <h3>Confirmer la suppression</h3>
      <p>Êtes-vous sûr de vouloir supprimer ce film ?</p>
      <button @click="$emit('confirm')">Confirmer</button>
      <button @click="$emit('cancel')">Annuler</button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.popin {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.popin-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}
</style>
