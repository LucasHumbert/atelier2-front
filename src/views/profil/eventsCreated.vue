<template>

</template>

<script>
export default {
  name: "eventsCreated",
  mounted() {
    if (!this.$store.state.accessToken) {
      this.$router.push('/signin')
    }
  }
}
</script>

<style scoped>

</style>
