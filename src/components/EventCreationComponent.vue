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
                        icon="calendar"
                        placeholder="A quelle date ?">
                    </b-datepicker>
                    <b-button
                        @click="$refs.datepicker.toggle()"
                        icon-left="calendar-today"
                        type="is-primary" />
                  </b-field>
                </div>
                <div class="column is-half">
                  <b-field label="Heure">
                    <b-timepicker
                        placeholder="A quelle heure ?"
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
                <b-input
                    v-model="adress"
                    type="text"
                    placeholder="8 Rue Gabriel Mouilleron"
                />
              </b-field>
            </div>
            <div id="map" v-if="ready">
              <template>
                <l-map style="height: 300px" :zoom="zoom" :center="center" @click="addMarker">
                  <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                  <l-marker v-if="marker" :lat-lng="marker" @click="removeMarker(index)"></l-marker>
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
      adress: '',
      date: '',
      confpassword: '',
      ready: false,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
          '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15,
      center: [48.6822, 6.1862],
      markerLatLng: [48.6822, 6.1862],
      marker: '',
      index: '',
    }
  },
  mounted() {
    this.axios.get('http://ip-api.com/json/')
        .then((response) => {
          this.center =  [response.data.lat, response.data.lon ]
          this.ready = true
        })
  },
  methods: {
    removeMarker(index) {
      index = index - 1;
      this.markers.splice(index, 1);
    },
    addMarker(event) {
      console.log(event.latlng)
      this.marker = event.latlng
      console.log(this.marker)
    }
  }
}
</script>

<style scoped>

</style>
