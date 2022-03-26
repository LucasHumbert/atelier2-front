<template>
  <div>
    <span class="has-text-weight-bold">{{ message.user.firstname + " " +  message.user.lastname}}</span>
     :
    {{ message.content }}
    <br>
  </div>
</template>

<script>
export default {
  name: "MessageComponent",
  props: ['message']
}
</script>

<style scoped>

</style>