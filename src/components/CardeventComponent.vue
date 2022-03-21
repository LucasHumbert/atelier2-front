<template>
  <div class="column is-one-third ">
    <div class="card">
      <div class="card-content">
        <div class="content">
          <h3 class="title is-3">{{ name }}</h3>
          <h6 class="subtitle is-6">{{ description }}</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardeventComponent",
  props: ['name', 'description']
}
</script>

<style scoped>

</style>
