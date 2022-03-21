<template>
  <div class="columns is-multiline is-justify-content-center">
    <form class="box column is-8 mt-6" @submit.prevent="signup">
      <div class="column is-12">
        <div>
          <h1 class="has-text-centered is-size-4 pt-4">
            <b>Inscription</b>
          </h1>
          <section class="pb-4 pl-6 pr-6 mt-4">
            <div class="is-flex is-justify-content-center">
              <b-field
                  label="Nom"
                  class="column is-6"
              >
                <b-input
                    v-model="nom"
                    type="text"
                    placeholder="entrez votre nom"
                />
              </b-field>
              <b-field
                  label="Prénom"
                  class="column is-6"
              >
                <b-input
                    v-model="prenom"
                    type="text"
                    placeholder="entrez votre prénom"
                />
              </b-field>
            </div>
            <div class="is-flex is-justify-content-center">
              <b-field
                  label="Email"
                  class="column is-12"
              >
                <b-input
                    v-model="email"
                    type="text"
                    placeholder="entrez votre email"
                />
              </b-field>
            </div>
            <div class="is-flex is-justify-content-center">
              <b-field style="white-space: nowrap;
    text-overflow: ellipsis;
    max-width: calc(100% - 2em);
    overflow: hidden;"
                  label="Mot de passe"
                  class="column is-6"
              >
                <b-input
                    v-model="password"
                    type="password"
                    placeholder="entrez votre mot de passe"
                />
              </b-field>
              <b-field style="white-space: nowrap;
    text-overflow: ellipsis;
    max-width: calc(100% - 2em);
    overflow: hidden;"
                       label="Confirmation du mot de passe"
                       class="column is-6"
              >
                <b-input
                    v-model="confpassword"
                    type="password"
                    placeholder="confirmez votre mot de passe"
                />
              </b-field>
            </div>
            <div class="is-flex is-justify-content-center pb-4 pt-4">
              <b-button>
                Inscription
              </b-button>
            </div>
          </section>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "FormSignUpComponent",
  data() {
    return {
      nom: '',
      prenom: '',
      email: '',
      password: '',
      confpassword: '',
      ready: false,
    }
  },
  methods: {
    signup() {
      if (this.nom && this.prenom && this.email && this.password && this.confpassword) {
        if (this.password === this.confpassword) {
          // Requete POST API
        } else {
          this.$buefy.toast.open('Les mots de passe ne correspondent pas')
        }
      } else {
        this.$buefy.toast.open('Renseigner tous les champs')
      }
    }
  }
}
</script>

<style scoped>

</style>
