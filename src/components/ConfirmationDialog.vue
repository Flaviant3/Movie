<template>
  <div class="confirmation-dialog">
    <p>Êtes-vous sûr de vouloir supprimer ce film ?</p>
    <button @click="$emit('confirm')">Oui</button>
    <button @click="$emit('cancel')">Non</button>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.confirmation-dialog {
  background: rgba(30, 30, 30, 0.9);
  color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s, opacity 0.3s;
}

.confirmation-dialog p {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.confirmation-dialog button {
  background-color: #ff6f61;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s, transform 0.3s;
  margin: 10px;
}

.confirmation-dialog button:hover {
  background-color: #ff3b2f;
  transform: scale(1.05);
}

.confirmation-dialog button:focus {
  outline: none;
}
</style>
