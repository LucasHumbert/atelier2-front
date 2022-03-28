<template>
  <div class="card">
    <div class="card-header">
      <div class="card-header-title is-size-4">Invités de {{ eventInfo.event.title }}</div>
    </div>
    <div class="card-content">
      <div class="content">
        <ul>
          <li v-for="guest in this.guests">
            {{ guest.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalGuestsComponent",
  props: ['eventInfo', 'guests']
}
</script>

<style scoped>

</style>