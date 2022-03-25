<template>
  <section class="columns is-centered">
    <div class="column is-8 box pl-5 pr-5 p-5 mt-6">
      <div>
        <AccountLayout />
      </div>
      <div class="mb-6">
        <h1 class="mb-5 ml-6 is-size-5 is-underlined">Vos évènements :</h1>
        <div class="columns is-multiline is-justify-content-center">
          <p v-if="events.length === 0">Vous n'avez créé aucun évènement</p>
          <CardEventCreated v-else v-for="event in events" :event="event" style="cursor:pointer;" />
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
      events : []
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
      this.axios.get(`${this.$urlEvent}/events?filter[]=creator_token`,{
        headers: { Authorization : `Bearer ${this.$store.state.accessToken}`}
      }).then(response => {
        this.events = response.data.events
        //console.log(this.events)
      })
    }
  }
}
</script>

<style scoped>

</style>
