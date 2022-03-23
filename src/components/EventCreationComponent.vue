<template>
  <div class="columns is-multiline is-justify-content-center">
    <form class="box column is-8 mt-6" @submit.prevent="postEvent">
      <div class="column is-12">
        <div>
          <h1 class="has-text-centered is-size-4 pt-4">
            <b>Créer un événement</b>
          </h1>
          <section class="pb-4 pl-6 pr-6 mt-4">
            <div class="is-flex is-justify-content-center">
              <b-field
                  label="Titre"
                  class="column is-12"
              >
                <b-input
                    v-model="title"
                    type="text"
                    placeholder="Anniversaire de Lucas"
                />
              </b-field>
            </div>
            <div class="is-flex is-justify-content-center">
              <section class="columns">
                <div class="column is-half">
                  <b-field label="Date">
                    <b-datepicker
                        v-model="date"
                        ref="datepicker"
                        expanded
                        placeholder="A quelle date ?">
                    </b-datepicker>
                    <b-button
                        @click="$refs.datepicker.toggle()"
                        icon-pack="fa-regular"
                        icon-left="calendar"
                        type="is-primary"/>
                  </b-field>
                </div>
                {{date.toISOString().split('T')[0]}}
                <div class="column is-half">
                  <b-field label="Heure">
                    <b-timepicker
                        v-model="hours"
                        placeholder="A quelle heure ?"
                        icon-pack="fa-solid"
                        icon="clock"
                        :incrementMinutes="minutesGranularity"
                        :incrementHours="hoursGranularity"
                    >
                    </b-timepicker>
                  </b-field>
                </div>
                {{hours.toLocaleTimeString()}}
              </section>
            </div>
            <div class="is-flex is-justify-content-center">
              <b-field
                  label="Description"
                  class="column is-12"
              >
                <b-input
                    v-model="description"
                    maxlength="200"
                    type="textarea"
                    placeholder="Description..."
                />
              </b-field>
            </div>
            <div class="is-flex is-justify-content-center">
              <b-radio v-model="public"
                       name="public"
                       native-value="true">
                Public
              </b-radio>
              <b-radio v-model="public"
                       name="prive"
                       native-value="false">
                Privé
              </b-radio>
            </div>
            <b-field
                label="Adresse"
                class="column is-12"/>

            <div class="columns is-gapless">
              <b-input class="column is-3"
                       v-model="city"
                       type="text"
                       placeholder="Nancy"/>
              <b-input class="column"
                       v-model="street"
                       type="text"
                       placeholder="8 Rue Gabriel Mouilleron"/>
              <b-button type="is-primary" @click="addAddress">Placer le marqueur</b-button>
            </div>
            <div id="map" v-if="ready">
              <template>
                <l-map style="height: 300px" :zoom="zoom" :center="center" @click="addMarker">
                  <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                  <l-marker v-if="marker" :lat-lng="marker"></l-marker>
                </l-map>
              </template>
            </div>
            <div class="is-flex is-justify-content-center pb-4 pt-4">
              <button class="button">
                Créer l'événement
              </button>
            </div>
          </section>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "EventCreation",
  data() {
    return {
      minutesGranularity: 15,
      hoursGranularity: 2,
      title: '',
      description: '',
      street: '',
      city: '',
      address: '',
      date: new Date(),
      hours: new Date(),
      public: false,
      ready: false,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
          '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15,
      center: [48.6822, 6.1862],
      marker: '',
      index: '',
    }
  },
  mounted() {
    this.axios.get('http://ip-api.com/json/')
        .then((response) => {
          this.center = [response.data.lat, response.data.lon]
          this.ready = true
        })
  },
  methods: {
    addAddress() {
      if (this.concatAddress !== '') {
        this.AddressToLatLng()
      }
    },
    addMarker(event) {
      this.marker = event.latlng
      this.LatLngToAddress()
      console.log(this.marker)
    },
    AddressToLatLng() {
      this.axios.get(`https://api.geoapify.com/v1/geocode/search?text=${this.concatAddress}&apiKey=d85ed141771b4ab8a3b0304bd9a79b5f`)
          .then((response) => {
            let data = response.data.features[0].properties;
            console.log(data)
            this.marker = [data.lat, data.lon]
            this.center = [data.lat, data.lon]
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    LatLngToAddress() {
      this.axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${this.marker.lat}&lon=${this.marker.lng}&apiKey=d85ed141771b4ab8a3b0304bd9a79b5f`)
          .then((response) => {
            let data = response.data.features[0].properties;
            if (data.housenumber) {
              this.center = [data.lat, data.lon]
              this.street = data.housenumber + " " + data.street
              this.city = data.city
              this.address = data.city + " " + data.street
            } else {
              this.street = data.street
              this.city = data.city
              this.address = this.city + " " + data.street
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    postEvent() {
      let fusion = this.date.toISOString().split('T')[0] + ' ' + this.hours.toLocaleTimeString()
      let date = new Date(fusion);
      console.log(date)
      this.axios.post(`http://api.event.local:62560/events`, {
        title: this.title,
        description: this.description,
        address: this.address,
        date: fusion,
        lat: this.marker.lat,
        lon: this.marker.lng,
        public: this.public
      }, {
        headers: { Authorization : `Bearer ${this.$store.state.accessToken}`}
      })
          .then((response) => {
            console.log(response.data)
            this.$router.push(`/event/${response.data}`)
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  },
  computed: {
    concatAddress() {
      return this.city + ' ' + this.street
    }
  }
}
</script>

<style scoped>

</style>
