<template>
  <div class="container mt-5 p-4">
    <b-field label="Nom" label-position="on-border">
      <b-input placeholder="Kebler"></b-input>
    </b-field>
    <b-field label="Prénom" label-position="on-border">
      <b-input placeholder="Jules"></b-input>
    </b-field>
    <b-field label="Email" label-position="on-border">
      <b-input placeholder="exemple@gmail.com"></b-input>
    </b-field>
    <b-field label="Mot de passe" label-position="on-border">
      <b-input placeholder="exemple@gmail.com"></b-input>
    </b-field>
    <button class="m-auto button is-primary">S'inscrire</button>
  </div>
</template>

<script>
export default {
  name: "FormSignInComponent"
}
</script>

<style scoped>

</style>
