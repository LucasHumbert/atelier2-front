<template>
  <div v-if="ready">
    <div class="columns">
      <b-loading :is-full-page="true" v-model="isLoading"></b-loading>

      <div class="column is-half m-4">
        <l-map style="z-index: 1" :zoom="zoom" :center="[this.eventInfo.event.lat, this.eventInfo.event.lon]">
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          <l-marker :lat-lng="[this.eventInfo.event.lat, this.eventInfo.event.lon]"></l-marker>
        </l-map>
        <div class="box is-flex is-justify-content-space-around is-align-items-center">
          <div class="is-flex is-align-items-center is-size-5">
            <img v-if="meteo.temperature > 15" src="@/assets/sun.png" alt="soleil" class="mr-4">
            <img v-else-if="meteo.temperature > 5" src="@/assets/cloud.png" alt="soleil" class="mr-4">
            <img v-else src="@/assets/snowflake.png" alt="soleil" class="mr-4">
            {{meteo.temperature}} °C
          </div>
          <div class="is-size-4">
            {{meteo.desc}}
          </div>
        </div>
      </div>
      <div class="column is-half">
        <div>
          <h2 class="title is-2"> {{ eventInfo.event.title }} </h2>
          <h5 class="subtitle mt-1 is-5"> {{ eventInfo.event.description }} </h5>
          <h5 class="subtitle mt-1 is-5" v-if="!isLoading"> Quand ? {{ dateConverter }} </h5>
          <h5 class="subtitle mt-1 is-5"> Où ? {{ eventInfo.event.address }} </h5>
          <h5 class="subtitle mt-1 is-5"> Organisateur : {{ organisateur }}</h5>
          <div class="is-flex is-align-items-center">
            <button class="button is-info" @click="copyToClipboard">Copier le lien d'invitation</button>
            <p class="mx-3">OU</p>
            <button class="button is-info" @click="invitWithMail">Inviter un utilisateur</button>
          </div>

          <div class="mt-3">
            <b-button v-if="this.eventInfo.users && this.eventInfo.users.length > 0" type="is-info is-light"
                      @click="isCardModalActive=true">Voir les participants
            </b-button>
            <b-button v-else type="is-info is-light">Aucun participant</b-button>
            <b-button v-if="this.guests && this.guests.length > 0" type="is-info is-light" class="ml-3"
                      @click="isModalGuestsActive=true">Voir les invités
            </b-button>
            <b-button v-else type="is-info is-light" class="ml-3">Aucun invité</b-button>
          </div>
        </div>
        <hr>
        <template v-if="!done">
          <div v-if="this.$store.state.accessToken && this.$store.state.user_id !== this.eventInfo.event.creator_id">
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
          <div v-else-if="this.$store.state.user_id !== this.eventInfo.event.creator_id">
            <button v-if="showButtonGuest" class="button is-link" @click="guestJoin">Rejoindre en tant qu'invité</button>
          </div>
        </template>
        <template v-else>
          <div class="has-text-centered">
            Événement terminé
          </div>
        </template>
      </div>

      <!-- Modal participants -->
      <b-modal v-model="isCardModalActive" :width="640">
        <ModalParticipantsComponent :event-info="eventInfo" :participants="participants"></ModalParticipantsComponent>
      </b-modal>

      <!-- Modal guests -->
      <b-modal v-model="isModalGuestsActive" :width="640">
        <ModalGuestsComponent :event-info="eventInfo" :guests="guests"></ModalGuestsComponent>
      </b-modal>
    </div>
    <div class="card is-flex is-flex-direction-column-reverse" style="max-height: calc(100vh - 620px); overflow-y: scroll; margin-top: 100px;">
      <div class="card-content mt-2">
        <template v-for="message in messages">
          <MessageComponent :message="message"></MessageComponent>
        </template>
      </div>
    </div>
    <div v-if="this.$store.state.accessToken">
      <form @submit.prevent="sendMessage(newMessage, 0)" class="is-flex">
        <b-input type="text" style="width: 100%;" v-model="newMessage" autofocus grouped>
        </b-input>
        <button class="button"><i class="far fa-paper-plane"></i></button>
      </form>
    </div>

  </div>
</template>

<script>
import MessageComponent from "@/components/MessageComponent";
import ModalParticipantsComponent from "@/components/Modals/ModalParticipantsComponent";
import ModalGuestsComponent from "@/components/Modals/ModalGuestsComponent";

export default {
  name: "EventView",
  components: {
    MessageComponent,
    ModalParticipantsComponent,
    ModalGuestsComponent
  },
  data() {
    return {
      lat: '',
      lon: '',
      eventInfo: {},
      participants: [],
      guests: [],
      messages: [],
      inEvent: false,
      newMessage: '',
      done: false,
      showButtonGuest: true,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
          '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15,
      isLoading: true,
      ready: false,
      urlToCopy: window.location.href,
      choice: '',
      firstname: '',
      lastname: '',
      showChoiceButton: true,
      isCardModalActive: false,
      isModalGuestsActive: false,
      meteo:  {
        temperature: '',
        desc: ''
      }
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
        this.firstname = response.data.userConnected.firstname
        this.lastname = response.data.userConnected.lastname
        this.inEvent = response.data.inEvent
        if (this.inEvent === true && response.data.choice !== 2) {
          this.showChoiceButton = false
        }
      });
    }

    this.axios.get(`http://api.event.local:62560/events/${this.$route.params.id}?embed[]=users`)
    .then((response) => {
      this.eventInfo = response.data;
      this.done = response.data.event.done
      this.participants = this.eventInfo.users
      this.isLoading = false;
      this.ready = true
      this.lat = this.eventInfo.event.lat
      this.lon = this.eventInfo.event.lon
      this.meteoAPI()
    });

    this.axios.get(`http://api.event.local:62560/guests/${this.$route.params.id}`)
    .then(response => {
      this.guests = response.data.guests
    })

    this.axios.get(`http://api.event.local:62560/events/${this.$route.params.id}/messages`)
    .then(response => {
      this.messages = response.data.messages
    })
  },
  methods: {
    meteoAPI () {
      //Get Openweather API
      this.axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.lon}&exclude=hourly,daily&appid=a4ebf009d3cd58878c01e6f142fa8f40&lang=fr&units=metric`)
          .then((response) => {
            console.log(response.data)
            this.meteo.temperature = Math.round(response.data.current.temp)
            this.meteo.desc = response.data.current.weather[0].description
            this.meteo.desc = this.meteo.desc.charAt(0).toUpperCase() + this.meteo.desc.slice(1)
          });
    },
    copyToClipboard() {
      navigator.clipboard.writeText(this.urlToCopy);
      this.$buefy.toast.open("Vous avez copié le lien de l'événement dans le presse-papier")
    },
    changeChoice(value) {
      if (this.inEvent === false) {
        this.axios.post(`http://api.event.local:62560/events/${this.eventInfo.event.id}/users/`, {
          choice: value
        }, {
          headers: {Authorization: `Bearer ${this.$store.state.accessToken}`}
        })
        .then((response) => {
          this.inEvent = true
          if (value === 1) {
            this.messages.push({'content': 'Je viens !','user': { 'firstname': this.firstname, 'lastname': this.lastname}})
            this.sendMessage('Je viens !')
          } else if (value === 0) {
            this.messages.push({'content': 'Je viens pas !','user': { 'firstname': this.firstname, 'lastname': this.lastname}})
            this.sendMessage('Je viens pas !')
          }
          this.participants.push({ "user_id": this.$store.state.user_id, "firstname": this.firstname, "lastname": this.lastname, "choice": value })
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
            this.messages.push({'content': 'Je viens !','user': { 'firstname': this.firstname, 'lastname': this.lastname}})
            this.sendMessage('Je viens !')
          } else if (value === 0) {
            this.messages.push({'content': 'Je viens pas !','user': { 'firstname': this.firstname, 'lastname': this.lastname}})
            this.sendMessage('Je viens pas !')
          }
          this.participants.forEach(el => {
            if (el.user_id === this.$store.state.user_id) {
              el.choice = value
            }
          })
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    },
    sendMessage(content, auto = 1) {
      this.axios.post(`http://api.event.local:62560/events/${this.eventInfo.event.id}/message/`, {
        content: content
      }, {
        headers: {Authorization: `Bearer ${this.$store.state.accessToken}`}
      })
      .then((response) => {
        if (auto === 0) {
          this.messages.push({'content': content,'user': { 'firstname': this.firstname, 'lastname': this.lastname}})
        }
        this.newMessage = ''
      })
      .catch(function (error) {
        console.log(error)
      });
    },
    guestJoin() {
      this.$buefy.dialog.prompt({
        message: `Quel est votre nom ?`,
        inputAttrs: {
          maxlength: 50
        },
        trapFocus: true,
        onConfirm: (value) => {
          this.axios.post(`http://api.event.local:62560/guests/${this.$route.params.id}`, {
            name: value
          })
          .then(() => {
            this.$buefy.toast.open(`Vous êtes enregistré en tant que ${value}`)
            this.guests.push({'name': value})
            this.showButtonGuest = false
          })
          .catch(error => {
            console.log(error)
          })
        }
      })
    },
    invitWithMail() {
      this.$buefy.dialog.prompt({
        message: `Entrer le mail de la personne que vous souhaitez inviter ?`,
        inputAttrs: {
          maxlength: 125
        },
        trapFocus: true,
        onConfirm: (value) => {
          this.axios.post(`http://api.event.local:62560/events/${this.$route.params.id}/invitation`, {
            mail: value
          })
          .then(response => {
            this.participants.push({ "user_id": response.data.user.user_id, "firstname": response.data.user.firstname, "lastname": response.data.user.lastname, "choice": 2 })
            this.inEvent = true
          })
          .catch(error => {
            this.$buefy.toast.open(`Une erreur est survenue`)
          })
        }
      })
    }
  }
}
</script>

<style scoped>
img {
  height: 50px
}
</style>
