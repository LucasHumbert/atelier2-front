<template>
  <section class="columns is-centered">
    <div class="column is-8 box pl-5 pr-5 p-5 mt-6">
      <div>
        <AccountLayout />
      </div>
      <div class="mb-6">
        <h1 class="mb-5 ml-6 is-size-5 is-underlined">Vos évènements :</h1>
        <div v-if="ready" class="columns is-multiline is-justify-content-center">
          <p v-if="events.length === 0">Vous n'avez créé aucun évènement</p>
          <CardEventCreated v-else v-for="event in events" :event="event" @refresh="deleteEvent" style="cursor:pointer;" />
        </div>
        <div v-else class="has-text-centered">
          <p>Chargement de vos évènements</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AccountLayout from "@/components/AccountLayout";
import CardEventCreated from "@/components/CardEventCreated";

export default {
  name: "eventsCreated",
  components: {CardEventCreated, AccountLayout},
  data () {
    return {
      events : [],
      ready: false
    }
  },
  mounted() {
    if (!this.$store.state.accessToken) {
      this.$router.push('/signin')
    }
    else {
      this.loadEvents()
    }
  },
  methods: {
    loadEvents() {
      this.axios.get(`${this.$urlEvent}/events?creator_id=${this.$store.state.user_id}`,{
        headers: { Authorization : `Bearer ${this.$store.state.accessToken}`}
      }).then(response => {
        this.events = response.data.events
        this.ready = true
      })
    },
    deleteEvent (id) {
      this.$buefy.dialog.confirm({
        message: "La <b>suppression</b> de l'évènement n'est pas réversible. Êtes vous sûre de vouloir continuer?",
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.ready = false
          this.$buefy.toast.open('Suppression confirmée')
          this.axios.delete(`${this.$urlEvent}/events/${id}`,{
            headers: { Authorization : `Bearer ${this.$store.state.accessToken}`}
          })
          this.loadEvents()
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
