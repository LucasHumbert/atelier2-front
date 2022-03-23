<template>
  <div class="columns">
    <b-loading :is-full-page="true" v-model="isLoading"></b-loading>
    <div class="column is-half">
      <l-map style="" :zoom="zoom" :center="[this.eventInfo.event.lat, this.eventInfo.event.lon]">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <l-marker :lat-lng="[this.eventInfo.event.lat, this.eventInfo.event.lon]"></l-marker>
      </l-map>
    </div>
    <div class="column is-half">
      <div>
        <h2 class="title is-2"> {{ eventInfo.event.title }} </h2>
        <h5 class="subtitle mt-1 is-5"> {{ eventInfo.event.description }} </h5>
        <h5 class="subtitle mt-1 is-5" v-if="!isLoading"> Quand ? {{ dateConverter }} </h5>
        <h5 class="subtitle mt-1 is-5"> Où ? {{ eventInfo.event.address }} </h5>
      </div>
      <hr>
      <div class="is-flex is-justify-content-center">
        <button class="button is-success mr-4">Je viens !</button>
        <button class="button is-danger">Je ne viens pas !</button>
      </div>
      <div class="card">
        <div class="card-content mt-2">
          <h6> <span class="is-underlined">Lana</span>: Je viens !</h6>
          <h6> <span class="is-underlined">Didier</span>: Je viens !</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "EventView",
  data () {
    return {
      eventInfo: {},
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
          '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15,
      isLoading: true
    };
  },
  computed: {
    dateConverter(){
      const start = Date.parse(this.eventInfo.event.date);
      const date = new Date(start);
      return date.toLocaleString('fr-FR')
    }
  },
  mounted() {
    this.axios.get(`http://api.event.local:62560/events/${this.$route.params.id}`).then((response) => {
      this.eventInfo = response.data;
      this.isLoading = false;
      console.log(this.eventInfo)
    });
  }
}
</script>

<style scoped>

</style>
