<template>
  <div class="columns is-centered">
    <div class="column is-10 is-half mb-6">
      <b-navbar centered style="border-radius: 5px">
        <template #start>
          <b-navbar-item id="layout" tag="router-link" to="profil" class="is-size-5 is-underlined">
            Profil
          </b-navbar-item>
          <b-navbar-item tag="router-link" to="profil_events" class="is-size-5 is-underlined">
            Mes Évènements
          </b-navbar-item>
          <b-navbar-item tag="router-link" to="profil_eventsCreated" class="is-size-5 is-underlined">
            Évènements Créés
          </b-navbar-item>
        </template>
        <template #end>
          <b-navbar-item v-if="notification" tag="router-link" to="" class="is-size-5">
            <b-dropdown :triggers="['hover']" aria-role="list">
              <template #trigger>
                <b-button
                    label="Notif !"
                    type="is-danger"/>
              </template>
              <b-dropdown-item aria-role="listitem">Vous avez été invité à un évènement!</b-dropdown-item>
              <b-dropdown-item aria-role="listitem">Vous avez été invité à un évènement!</b-dropdown-item>
              <b-dropdown-item aria-role="listitem">Vous avez été invité à un évènement!</b-dropdown-item>
            </b-dropdown>
          </b-navbar-item>
          <b-navbar-item v-else tag="router-link" to="" class="is-size-5">
            <b-dropdown :triggers="['hover']" aria-role="list">
              <template #trigger>
                <b-button label="Notif"/>
              </template>
            </b-dropdown>
          </b-navbar-item>
        </template>
      </b-navbar>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      notification: false
    }
  }
}
</script>

<style scoped>

</style>
