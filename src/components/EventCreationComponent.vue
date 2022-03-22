<template>
  <div class="columns is-multiline is-justify-content-center">
    <form class="box column is-8 mt-6" @submit.prevent="signup">
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
                        ref="datepicker"
                        expanded
                        placeholder="A quelle date ?">
                    </b-datepicker>
                    <b-button
                        @click="$refs.datepicker.toggle()"
                        icon-pack="fa-regular"
                        icon-left="calendar"
                        type="is-primary" />
                  </b-field>
                </div>
                <div class="column is-half">
                  <b-field label="Heure">
                    <b-timepicker
                        placeholder="A quelle heure ?"
                        icon-pack="fa-solid"
                        icon="clock"
                        :incrementMinutes="minutesGranularity"
                        :incrementHours="hoursGranularity"
                    >
                    </b-timepicker>
                  </b-field>
                </div>
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
              <b-field
                       label="Adresse"
                       class="column is-12"
              >
                <div class="columns is-gapless">
                  <b-input class="column is-4"
                      v-model="city"
                      type="text"
                      placeholder="Nancy"
                  />
                  <b-input class="column"
                      v-model="street"
                      type="text"
                      placeholder="8 Rue Gabriel Mouilleron"
                  />
                  <b-button type="is-primary" @click="addAdress">Placer le marqueur</b-button>
                </div>
              </b-field>
            </div>
            <div id="map" v-if="ready">
              <template>
                <l-map style="height: 300px" :zoom="zoom" :center="center" @click="addMarker"  >
                  <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                  <l-marker v-if="marker" :lat-lng="marker"></l-marker>
                </l-map>
              </template>
            </div>
            <div class="is-flex is-justify-content-center pb-4 pt-4">
              <b-button>
                Créer l'événement
              </b-button>
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
      date: '',
      confpassword: '',
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
          this.center =  [response.data.lat, response.data.lon]
          this.ready = true
        })
  },
  methods: {
    addStreet() {
      if (this.street !== '') {
        this.AdressToLatLng()
      }
    },
    addCity() {
      if (this.city !== '') {
        this.AdressToLatLng()
      }
    },
    addAdress() {
      if (this.concatAdress !== ''){
        this.AdressToLatLng()
        console.log("CLICK")
      }
    },
    addMarker(event) {
      this.marker = event.latlng
      this.LatLngToAdress()
      console.log(this.marker)
    },
    AdressToLatLng() {
      this.axios.get(`https://api.geoapify.com/v1/geocode/search?text=${this.adress}&apiKey=d85ed141771b4ab8a3b0304bd9a79b5f`)
          .then((response) => {
            let data = response.data.features[0].properties;
            this.marker = [data.lat, data.lon]
            this.center = [data.lat, data.lon]
            console.log(this.marker)
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    LatLngToAdress() {
      this.axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${this.marker.lat}&lon=${this.marker.lng}&apiKey=d85ed141771b4ab8a3b0304bd9a79b5f`)
          .then((response) => {
            let data = response.data.features[0].properties;
            if (data.housenumber){
              this.center = [data.lat, data.lon]
              this.street =  data.housenumber + " " + data.street
              this.city = data.city
              this.adress = data.city + " " + data.street
            }
            else {
              this.street = data.street
              this.city = data.city
              this.adress = this.city + " " + data.street
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  },
  computed: {
    concatAdress() {
      return this.city + ' ' + this.street
    }
  }
}
</script>

<style scoped>

</style>
