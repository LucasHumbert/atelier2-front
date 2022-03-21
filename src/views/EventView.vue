<template>
  <div class="columns">
    <div class="column is-half">

    </div>
    <div class="column is-half">
      <div>
        <h2 class="title is-2"> Titre de l'évènement </h2>
        <h5 class="subtitle mt-1 is-5"> Description de l'évènement </h5>
        <h5 class="subtitle mt-1 is-5"> Quand ? 23/05/2022 à 15h </h5>
        <h5 class="subtitle mt-1 is-5"> Où ? 8B rue auguste bichaton </h5>
      </div>
      <hr>
      <div class="is-flex is-justify-content-center">
        <button class="button is-success mr-4">Je viens !</button>
        <button class="button is-danger">Je ne viens pas !</button>
      </div>
      <div class="card">
        <div class="card-content mt-2">
          <h6> <span class="is-underlined">Lana</span>: Je viens !</h6>
          <h6> <span class="is-underlined">Didier</span>: Je viens !</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "EventView",
}
</script>

<style scoped>

</style>
