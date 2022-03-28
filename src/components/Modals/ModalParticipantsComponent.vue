<template>
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
          <li v-for="user in participants">
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
</template>

<script>
export default {
  name: "ModalParticipantsComponent",
  props: ['eventInfo', 'participants'],
  data(){
    return{
      selectedFilterOption: 3
    }
  }
}
</script>

<style scoped>

</style>