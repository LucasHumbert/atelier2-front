<template>
  <section class="columns is-centered">
    <div class="column is-8 box pl-5 pr-5 p-5 mt-6">
      <div>
        <AccountLayout />
      </div>
      <div class="p-2">
        <h1 class="pb-4 is-size-5">
          Informations Personnelles :
        </h1>
        <div v-if="edit.length > 0">
          <form @submit.prevent="putInfos">
            <div v-if="edit.indexOf('prenom') !== -1" class="is-flex">
              <b-tooltip label="Annuler" position="is-top">
                <i class="fas fa-undo is-clickable" @click="cancelInfos('prenom')" />
              </b-tooltip>
              <p class="pb-2 pl-1">
                <span class="is-underlined">Prénom :</span>
                <b-input v-model="prenom" />
              </p>
            </div>
            <div v-else class="is-flex">
              <b-tooltip label="Modifier" position="is-top">
                <i class="fas fa-pen is-clickable" @click="editInfos('prenom')" />
              </b-tooltip>
              <p class="pb-2 pl-1">
                <span class="is-underlined">Prénom</span> : {{ prenom }}
              </p>
            </div>
            <div v-if="edit.indexOf('nom') !== -1" class="is-flex">
              <b-tooltip label="Annuler" position="is-top">
                <i class="fas fa-undo is-clickable" @click="cancelInfos('nom')" />
              </b-tooltip>
              <p class="pb-2">
                <span class="is-underlined">Nom :</span>
                <b-input v-model="nom" />
              </p>
            </div>
            <div v-else class="is-flex">
              <b-tooltip label="Modifier" position="is-top">
                <i class="fas fa-pen is-clickable" @click="editInfos('nom')" />
              </b-tooltip>
              <p class="pb-2">
                <span class="is-underlined">Nom</span> : {{ nom }}
              </p>
            </div>
            <div class="has-text-centered">
              <button class="button" outlined>
                Valider
              </button>
            </div>
          </form>
        </div>
        <div v-else>
          <div class="is-flex">
            <b-tooltip label="Modifier" position="is-top">
              <i class="fas fa-pen is-clickable" @click="editInfos('prenom')" />
            </b-tooltip>
            <p class="pb-2 pl-1">
              <span class="is-underlined">Prénom</span> : {{ prenom }}
            </p>
          </div>
          <div class="is-flex">
            <b-tooltip label="Modifier" position="is-top">
              <i class="fas fa-pen is-clickable" @click="editInfos('nom')" />
            </b-tooltip>
            <p class="pb-2 pl-1">
              <span class="is-underlined">Nom</span> : {{ nom }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AccountLayout from "@/components/AccountLayout";
export default {
  name: "profil",
  components: {AccountLayout},
  data () {
    return {
      edit: [],
      prenom: 'prenom',
      nom: 'nom',
    }
  },
  methods: {
    editInfos (name) {
      this.edit.push(name)
    },
    cancelInfos (name) {
      this.edit.splice(this.edit.indexOf(name), 1)
    },
    putInfos () {
    }
  }
}
</script>

<style scoped>

</style>
