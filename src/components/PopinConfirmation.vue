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
  background-color: rgba(0, 0, 0, 0.8); /* Fond noir plus opaque */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.5s ease; /* Animation d'apparition */
}

.popin-content {
  background: linear-gradient(135deg, #ffffff, #f9f9f9);
  padding: 40px; /* Plus d'espace pour un aspect aéré */
  border-radius: 15px; /* Coins plus arrondis */
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); /* Ombre plus prononcée */
  animation: slideIn 0.5s ease; /* Animation d'entrée */
  max-width: 450px; /* Largeur maximale */
  width: 90%; /* Largeur responsive */
  position: relative; /* Pour le loader */
  overflow: hidden; /* Pour cacher le loader en dehors */
}

.loader {
  border: 5px solid rgba(255, 255, 255, 0.5); /* Bordure blanche semi-transparente */
  border-top: 5px solid #28a745; /* Bordure verte */
  border-radius: 50%; /* Cercle */
  width: 40px; /* Largeur du loader */
  height: 40px; /* Hauteur du loader */
  animation: spin 1s linear infinite; /* Animation de rotation */
  position: absolute; /* Positionnement absolu */
  top: 20px; /* Ajuster la position */
  left: calc(50% - 20px); /* Centrer horizontalement */
  display: none; /* Cacher par défaut */
}

@keyframes spin {
  0% {
    transform: rotate(0deg); /* Début de la rotation */
  }
  100% {
    transform: rotate(360deg); /* Fin de la rotation */
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1; /* Commence visible */
    background-color: white; /* Fond initial */
  }
  50% {
    background-color: #dc3545; /* Change en rouge à moitié */
  }
  100% {
    opacity: 0; /* Finit invisible */
    transform: translateY(-20px); /* Léger mouvement vers le haut */
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px); /* Début légèrement au-dessus */
  }
  to {
    opacity: 1;
    transform: translateY(0); /* Finit à sa position normale */
  }
}

button {
  padding: 12px 25px; /* Espacement intérieur */
  border: none; /* Pas de bordure */
  border-radius: 8px; /* Coins arrondis */
  cursor: pointer; /* Curseur pointer */
  font-size: 1em; /* Taille de la police */
  margin: 10px; /* Marge entre les boutons */
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s; /* Transitions fluides */
}

button:hover {
  transform: translateY(-2px); /* Légère élévation au survol */
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3); /* Ombre plus prononcée */
}

button.confirm {
  background-color: #28a745; /* Vert */
  color: white; /* Couleur du texte */
}

button.cancel {
  background-color: #dc3545; /* Rouge */
  color: white; /* Couleur du texte */
}

button.confirm.loading {
  background-color: #ffc107; /* Jaune pour l'état de chargement */
  pointer-events: none; /* Désactiver les clics */
}

button.confirm.loading:hover {
  background-color: #ffc107; /* Pas de changement de couleur au survol */
}

.confirmation-message {
  display: none; /* Cacher par défaut */
  font-size: 1.2em; /* Taille de police pour le message de confirmation */
  color: #dc3545; /* Couleur rouge pour le message */
  margin-top: 15px; /* Marge en haut */
}

/* Apparition du message de confirmation */
.confirmation-message.visible {
  display: block; /* Afficher le message */
  animation: fadeIn 0.5s ease; /* Animation d'apparition */
}

/* Styles pour l'animation de disparition */
.popin.fade-out {
  animation: fadeOut 0.5s ease forwards; /* Animation de sortie */
}

</style>
