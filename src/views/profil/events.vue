<template>
  <section class="columns is-centered">
    <div class="column is-8 box pl-5 pr-5 p-5 mt-6">
      <div>
        <AccountLayout />
      </div>
      <div class="mb-6">
        <h1 class="mb-5 ml-6 is-size-5 is-underlined">Vos évènements :</h1>
        <div class="columns is-multiline is-justify-content-center">
          <CardEvent />
          <CardEvent />
          <CardEvent />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AccountLayout from "@/components/AccountLayout";
import CardEvent from "@/components/CardEvent";
export default {
  name: "events",
  components: {CardEvent, AccountLayout}
}
</script>

<style scoped>

</style>
