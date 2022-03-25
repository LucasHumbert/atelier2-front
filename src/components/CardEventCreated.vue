<template>
  <div class="une_recette column is-4" style="position: relative">
    <router-link :to="{ name:'event' , params:{ id: event.id }}">
      <div class="card">
        <div class="card-header">
          <h1 class="card-header-title is-centered">{{ event.title }}</h1>
        </div>
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
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "CardEventCreated",
  props : ['event']
}
</script>

<style scoped>
h1, p{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
