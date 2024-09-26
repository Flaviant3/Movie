<template>
  <div class="profile-page">
    <h1>Éditer le Profil</h1>

    <form @submit.prevent="updateProfile">
      <div>
        <label for="username">Nom d'utilisateur:</label>
        <input type="text" id="username" v-model="user.username" required />
      </div>

      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="user.email" required />
      </div>

      <div>
        <label for="bio">Biographie:</label>
        <textarea id="bio" v-model="user.bio"></textarea>
      </div>

      <button type="submit">Mettre à jour le profil</button>
    </form>

    <button @click="resetPassword">Réinitialiser le mot de passe</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        email: '',
        bio: ''
      }
    };
  },
  methods: {
    updateProfile() {
      // Logique pour mettre à jour le profil de l'utilisateur
      // Par exemple, envoyer une requête API pour enregistrer les modifications
      console.log('Profil mis à jour:', this.user);
      alert('Profil mis à jour avec succès !');
    },
    resetPassword() {
      // Logique pour réinitialiser le mot de passe
      alert('Un email de réinitialisation a été envoyé.');
    }
  },
  created() {
    // Remplacer par votre logique pour récupérer les données de l'utilisateur
    this.user = {
      username: 'utilisateur123',
      email: 'utilisateur@example.com',
      bio: 'Ceci est ma biographie.'
    };
  }
};
</script>

<style scoped>
.profile-page {
  padding: 20px;
}
form div {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
}
input, textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
button {
  padding: 10px 15px;
}
</style>
