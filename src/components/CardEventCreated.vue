<template>
  <div class="column is-4">
      <div class="card">
        <router-link :to="{ name:'event' , params:{ id: event.id }}">
          <div class="card-header">
            <h1 class="card-header-title is-centered">{{ event.title }}</h1>
          </div>
        </router-link>
        <div class="card-content">
          <div class="is-mobile">
            <div class="content">
              <p><span class="is-underlined">Date</span> : {{event.date}}</p>
            </div>
            <div class="content">
              <p><span class="is-underlined">Lieu</span> : {{event.address}}</p>
            </div>
          </div>
        </div>
        <div class="has-text-centered">
          <b-button @click="callParent" class="is-danger" id="delete">Delete</b-button>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "CardEventCreated",
  props: ['event'],
  methods: {
    callParent () {
      this.$emit('refresh', this.event.id)
    }
  }
}
</script>

<style scoped>
h1, p{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
