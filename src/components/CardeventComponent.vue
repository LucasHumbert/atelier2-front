<template>
  <div class="column is-4">
    <router-link :to="{ name:'event' , params:{ id: event.id }}">
      <div class="card">
        <div class="card-content">
          <div class="content">
            <h3 class="title is-3">{{ event.title }}</h3>
            <h6 class="subtitle is-6 mb-1">{{ event.description }}</h6>
            <p class="my-1">{{ event.date }}</p>
            <p class="is-italic my-1">{{ event.address }}</p>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "CardeventComponent",
  props: ['event'],
}
</script>

<style scoped>
div.column h3 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
