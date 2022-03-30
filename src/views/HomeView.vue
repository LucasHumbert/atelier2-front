<template>
  <div>
    <div class ="has-text-centered" v-if="this.$store.state.accessToken">
      <router-link to="/create/event">
        <b-button type="is-primary is-light">Créer un événement</b-button>
      </router-link>
    </div>
    <div class="columns is-multiline p-6" v-if="ready">
      <template v-for="event in events">
        <cardevent-component :event="event" />
      </template>
    </div>
  </div>
</template>

<script>
import NavbarComponent from "@/components/NavbarComponent";
import CardeventComponent from "@/components/CardeventComponent";
export default {
  name: 'HomeView',
  data() {
    return{
      events: [],
      ready: false
    }
  },
  components: {
    CardeventComponent,
    NavbarComponent,
  },
  mounted() {
    this.axios.get(`${this.$urlEvent}events`)
    .then(response => {
      this.events = response.data.events
      this.ready = true
    })
  }
}
</script>

<style scoped>

</style>
