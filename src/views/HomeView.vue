<template>
  <div>
    <div class="columns is-multiline p-6">
      <cardevent-component description="test" name="Anniversaire de Baptiste" />
      <cardevent-component description="test" name="Anniversaire de Calvin" />
      <cardevent-component description="test" name="Anniversaire de Lucas" />
      <cardevent-component description="test" name="Anniversaire de Kévin" />
      <cardevent-component description="test" name="Anniversaire de Jean" />
    </div>
  </div>
</template>

<script>
import NavbarComponent from "@/components/NavbarComponent";
import CardeventComponent from "@/components/CardeventComponent";
export default {
  name: 'HomeView',
  components: {
    CardeventComponent,
    NavbarComponent,
  }
}
</script>

<style scoped>

</style>
