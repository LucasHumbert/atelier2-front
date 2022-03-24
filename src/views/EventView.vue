<template>
<div v-if="ready">
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
        <button class="button is-info" @click="copyToClipboard"> Copier le lien dans le presse-papier</button>
      </div>
      <hr>
      <div v-if="this.$store.state.accessToken">
        <div class="is-flex is-justify-content-center" v-if="showChoiceButton">
          <button class="button is-success mr-4" @click="postChoice(1)" >Je viens !</button>
          <button class="button is-danger" @click="postChoice(0)"  >Je ne viens pas !</button>
        </div>
        <div class="is-flex is-justify-content-center" v-else>
          <button class="button is-dark" @click="showChoice"  >J'ai changé d'avis</button>
        </div>
      </div>
      <div v-else> Rejoindre en tant que guest ?</div>
    </div>
  </div>
  <div class="card">
    <div class="card-content mt-2">
      <template v-for="text in textHtml">
        <strong> {{firstname}}</strong> {{text}} <br>
      </template>
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
      isLoading: true,
      ready: false,
      urlToCopy: window.location.href,
      choice: '',
      textHtml:[],
      firstname: '',
      showChoiceButton: true,
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
      this.ready = true
      console.log(this.eventInfo)
    });
    this.axios.get('http://api.auth.local:62563/me', {
      headers: { Authorization : `Bearer ${this.$store.state.accessToken}`}
    }) .then((response) => {
      this.firstname = response.data.profile.firstname
    })
        .catch(function (error) {
          console.log(error);
        });
  },
  methods: {
    copyToClipboard() {
      navigator.clipboard.writeText(this.urlToCopy);
      this.$buefy.toast.open("Vous avez copié le lien de l'événement dans le presse-papier")
    },
    postChoice(value) {
      if(value === 1) {
        this.axios.post(`http://api.event.local:62560/events/${this.eventInfo.event.id}/users/`,{},{
          headers: { Authorization : `Bearer ${this.$store.state.accessToken}`}
        })
            .then((response) => {
              this.textHtml.push(' : Je viendrai')
            })
            .catch(function (error) {
              console.log(error);
            });
      } else if (value === 0) {
        this.axios.post(`http://api.event.local:62560/events/${this.eventInfo.event.id}/users/`,{},{
          headers: { Authorization : `Bearer ${this.$store.state.accessToken}`}
        })
            .then((response) => {
              this.textHtml.push(' : Je ne viendrai pas')
            })
            .catch(function (error) {
              console.log(error);
            });
      }
      this.showChoiceButton = false;
    },
    showChoice () {
      this.showChoiceButton = true
    }

  }
}
</script>

<style scoped>

</style>
