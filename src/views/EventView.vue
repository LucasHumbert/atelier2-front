<template>
  <div v-if="ready" class="columns">
    <b-loading :is-full-page="true" v-model="isLoading"></b-loading>
    <div class="column is-half">
      <l-map  v-if="!isCardModalActive"  style="" :zoom="zoom" :center="[this.eventInfo.event.lat, this.eventInfo.event.lon]">
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
        <div>
          <b-button v-if="this.eventInfo.users.length > 0" type="is-info is-light" @click="isCardModalActive=true">Voir les participants</b-button>
          <b-button v-else type="is-info is-light">Aucun participant</b-button>
        </div>
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

    <b-modal v-model="isCardModalActive" :width="640">
      <div class="card">
        <div class="card-header">
          <div class="card-header-title is-size-4">Participants à {{ eventInfo.event.title }}</div>
        </div>
        <div class="card-content">
          <div class="content">
            <div class="has-text-centered">
              Trier par
              <select v-model="selectedFilterOption">
                <option value="3">Tous</option>
                <option value="0">Ne participe pas</option>
                <option value="1">Participe</option>
                <option value="2">Indécis</option>
              </select>
            </div>

            <ul v-if="parseInt(selectedFilterOption) === 3">
              <li v-for="user in this.eventInfo.users">
                {{ user.firstname }} -
                <span v-if="user.choice === 1" class="is-italic has-text-success"> Participe</span>
                <span v-else-if="user.choice === 0" class="is-italic has-text-danger"> Ne participe pas</span>
                <span v-else class="is-italic has-text-info"> Indécis</span>
              </li>
            </ul>
            <ul v-else>
              <li v-for="user in this.eventInfo.users.filter(el => { return el.choice === parseInt(selectedFilterOption) })">
                {{ user.firstname }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </b-modal>
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
      isLoading: true,
      ready: false,
      isCardModalActive: false,
      selectedFilterOption: 3
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
    this.axios.get(`http://api.event.local:62560/events/${this.$route.params.id}?embed[]=users`).then((response) => {
      this.eventInfo = response.data;
      this.isLoading = false;
      this.ready = true
      //console.log(this.eventInfo)
    });
  }
}
</script>

<style scoped>

</style>
