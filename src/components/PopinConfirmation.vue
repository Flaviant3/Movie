<template>
  <div class="popin">
    <div class="popin-content">
      <h3>Confirmer la suppression</h3>
      <p>Êtes-vous sûr de vouloir supprimer ?</p>
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
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.5s ease;
}

.popin-content {
  background: linear-gradient(135deg, #ffffff, #f9f9f9);
  padding: 40px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  animation: slideIn 0.5s ease;
  max-width: 450px;
  width: 90%;
  position: relative;
  overflow: hidden;
}

.loader {
  border: 5px solid rgba(255, 255, 255, 0.5);
  border-top: 5px solid #28a745;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  position: absolute;
  top: 20px;
  left: calc(50% - 20px);
  display: none;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
    background-color: white;
  }
  50% {
    background-color: #dc3545;
  }
  100% {
    opacity: 0;
    transform: translateY(-20px);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

button {
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1em;
  margin: 10px;
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

button.confirm {
  background-color: #28a745;
  color: white;
}

button.cancel {
  background-color: #dc3545;
  color: white;
}

button.confirm.loading {
  background-color: #ffc107;
  pointer-events: none;
}

button.confirm.loading:hover {
  background-color: #ffc107;
}

.confirmation-message {
  display: none;
  font-size: 1.2em;
  color: #dc3545;
  margin-top: 15px;
}

.confirmation-message.visible {
  display: block;
  animation: fadeIn 0.5s ease;
}

.popin.fade-out {
  animation: fadeOut 0.5s ease forwards;
}
</style>
