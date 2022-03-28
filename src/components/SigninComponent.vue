<template>
  <div class="columns is-multiline is-justify-content-center">
    <form class="box column is-6 mt-6" @submit.prevent="login">
      <h1 class="title is-4 has-text-centered">
        Se connecter
      </h1>
      <b-field label="Email">
        <b-input v-model="userInfo.email" type="email" maxlength="30" required/>
      </b-field>

      <b-field label="Password">
        <b-input v-model="userInfo.password" type="password" required/>
      </b-field>

      <div class="has-text-centered mt-5 mb-3">
        <button class="button">
          Se connecter
        </button>
      </div>
      <p class="has-text-centered">
        Pas encore de compte ?
        <router-link to="/signup">
          Créez en un
        </router-link>
      </p>
    </form>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      showPassword: false,
      userInfo: {
        email: '',
        password: ''
      },
      state: '',
    }
  },
  mounted() {
    if (this.$store.state.accessToken) {
      this.$router.push('/')
    }
  },
  methods: {
    validEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    login() {
      if (this.validEmail(this.userInfo.email)) {
        this.axios.get('http://api.auth.local:62563/auth', {
          auth: {
            username: this.userInfo.email,
            password: this.userInfo.password
          }
        }).then((response) => {
          this.$store.commit('setToken', response.data.accessToken)
          this.$store.commit('setUserId', response.data.user_id)
          this.$router.push('/')
        }).catch(error => this.$buefy.toast.open({
              duration: 5000,
              message: 'Vos information sont <b>incorrect</b>',
              position: 'is-bottom',
              type: 'is-danger'
            })
        )
      }
    }
  }
}

</script>
