<template>
  <div v-if="ready">
    <div class="columns">
      <b-loading :is-full-page="true" v-model="isLoading"></b-loading>

      <div class="column is-half m-4">
        <l-map v-if="!isCardModalActive" style="" :zoom="zoom" :center="[this.eventInfo.event.lat, this.eventInfo.event.lon]">
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
          <h5 class="subtitle mt-1 is-5"> Organisateur : {{ organisateur }}</h5>
          <button class="button is-info" @click="copyToClipboard"> Copier le lien d'invitation</button>
          <div class="mt-3">
            <b-button v-if="this.eventInfo.users && this.eventInfo.users.length > 0" type="is-info is-light"
                      @click="isCardModalActive=true">Voir les participants
            </b-button>
            <b-button v-else type="is-info is-light">Aucun participant</b-button>
          </div>
        </div>
        <hr>
        <div v-if="this.$store.state.accessToken">
          <div class="is-flex is-justify-content-center" v-if="showChoiceButton">
            <button class="button is-success mr-4" @click="changeChoice(1); showChoiceButton = false">Je viens !
            </button>
            <button class="button is-danger" @click="changeChoice(0); showChoiceButton = false">Je ne viens pas !
            </button>
          </div>
          <div class="is-flex is-justify-content-center" v-else>
            <button class="button is-dark" @click="changeChoice(2); showChoiceButton = true">J'ai changé d'avis</button>
          </div>
        </div>
        <div v-else> Rejoindre en tant que guest ?</div>
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
    <div class="card">
      <div class="card-content mt-2">
        <template v-for="text in textHtml">
          <strong> {{ firstname }} {{ lastname }}</strong> {{ text }} <br>
        </template>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "EventView",
  data() {
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
      textHtml: [],
      firstname: '',
      lastname: '',
      showChoiceButton: true,
      isCardModalActive: false,
      selectedFilterOption: 3
    };
  },
  computed: {
    dateConverter() {
      const start = Date.parse(this.eventInfo.event.date);
      const date = new Date(start);
      return date.toLocaleString('fr-FR')
    },
    organisateur() {
      return this.eventInfo.event.creatorUser.firstname + " " + this.eventInfo.event.creatorUser.lastname.toUpperCase() + " | " + this.eventInfo.event.creatorUser.mail
    }
  },
  mounted() {
    if (this.$store.state.accessToken) {
      this.axios.get(`http://api.event.local:62560/events/${this.$route.params.id}?filter[]=userConnected`, {
        headers: {Authorization: `Bearer ${this.$store.state.accessToken}`}
      })
      .then((response) => {
        this.firstname = response.data.userConnected.firstname;
        this.lastname = response.data.userConnected.lastname
        if (response.data.inEvent === true && response.data.choice !== 2) {
          this.showChoiceButton = false
        }
      });
    }

    this.axios.get(`http://api.event.local:62560/events/${this.$route.params.id}?embed[]=users`)
    .then((response) => {
      this.eventInfo = response.data;
      this.isLoading = false;
      this.ready = true
    });

  },
  methods: {
    copyToClipboard() {
      navigator.clipboard.writeText(this.urlToCopy);
      this.$buefy.toast.open("Vous avez copié le lien de l'événement dans le presse-papier")
    },
    changeChoice(value) {
      if (this.eventInfo.inEvent === false) {
        this.axios.post(`http://api.event.local:62560/events/${this.eventInfo.event.id}/users/`, {
          choice: value
        }, {
          headers: {Authorization: `Bearer ${this.$store.state.accessToken}`}
        })
            .then((response) => {
              if (value === 1) {
                this.textHtml.push(' : Je viendrai')
              } else if (value === 0) {
                this.textHtml.push(' : Je ne viendrai pas')
              }
            })
            .catch(function (error) {
              console.log(error);
            });
      } else {
        this.axios.put(`http://api.event.local:62560/events/${this.eventInfo.event.id}/users/`, {
          choice: value
        }, {
          headers: {Authorization: `Bearer ${this.$store.state.accessToken}`}
        })
            .then((response) => {
              if (value === 1) {
                this.textHtml.push(' : Je viendrai')
              } else if (value === 0) {
                this.textHtml.push(' : Je ne viendrai pas')
              }
            })
            .catch(function (error) {
              console.log(error);
            });
      }
    },
  }
}
</script>

<style scoped>

</style>
