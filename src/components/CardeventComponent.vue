<template>
  <div class="column is-4">
    <router-link :to="{ name:'event' , params:{ id: id }}">
      <div class="card">
        <div class="card-content">
          <div class="content">
            <h3 class="title is-3">{{ name }}</h3>
            <h6 class="subtitle is-6">{{ description }}</h6>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "CardeventComponent",
  props: ['name', 'description', 'id'],
}
</script>

<style scoped>
div.column h3 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
