<template>
  <b-navbar class="type is-primary mb-4">
    <template #brand>
      <b-navbar-item>
        <img
            src="@/assets/Reunionou-logo.png"
            alt="Lightweight UI components for Vue.js based on Bulma"
        >
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        Home
      </b-navbar-item>
      <b-navbar-item v-if="$store.state.accessToken"  tag="router-link" :to="{ path: '/profil' }">
        Profil
      </b-navbar-item>
    </template>

    <template #end v-if="!this.$store.state.accessToken">
      <b-navbar-item tag="div">
        <div class="buttons">
          <router-link to="/signup">
            <a class="button is-primary">
              <strong>S'inscrire</strong>
            </a>
          </router-link>
          <router-link to="/signin">
            <a class="button is-light">
              Se connecter
            </a>
          </router-link>
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
      this.$store.commit('setUserId', false)
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>
