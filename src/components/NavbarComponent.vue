<template>
  <b-navbar class="type is-primary mb-4">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
            src="@/assets/Reunionou-logo.png"
            alt="Lightweight UI components for Vue.js based on Bulma"
        >
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item href="/">
        Home
      </b-navbar-item>
      <b-navbar-item v-if="$store.state.accessToken" href="/profil">
        Profil
      </b-navbar-item>
    </template>

    <template #end v-if="!this.$store.state.accessToken">
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-primary" @click="$router.push('/signup')">
            <strong>Inscription</strong>
          </a>
          <a class="button is-light" @click="$router.push('/signin')">
            Connexion
          </a>
        </div>
      </b-navbar-item>
    </template>

    <template #end v-else>
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-primary" @click="disconnect">
            <strong>Déconnexion</strong>
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: "NavbarComponent",
  methods: {
    disconnect(){
      this.$store.commit('setToken', false)
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>
