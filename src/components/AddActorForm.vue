<template>
  <div class="add-actor-form">
    <h2>Ajouter un Acteur</h2>
    <input v-model="firstname" placeholder="Prénom" />
    <input v-model="lastname" placeholder="Nom" />
    <button @click="submit">Ajouter</button>
    <button @click="$emit('close')">Annuler</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstname: '',
      lastname: ''
    };
  },
  methods: {
    async submit() {
      if (this.firstname && this.lastname) {
        const newActor = { firstname: this.firstname, lastname: this.lastname };
        this.$emit('add-actor', newActor);
        this.firstname = '';
        this.lastname = '';
      } else {
        alert('Veuillez remplir tous les champs.');
      }
    }
  }
};
</script>

<style scoped>
.add-actor-form {
  /* Ajoutez votre style ici */
}
</style>
