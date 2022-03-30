<template>
  <div>
    <span class="has-text-weight-bold">{{ message.user.firstname + " " +  message.user.lastname}}</span>
     :
    <template v-if="message.content.includes('https://www.youtube.com/watch') || message.content.includes('https://youtu.be')">
      {{ this.newContent }}
      <youtube :video-id="videoId"></youtube>
    </template>
    <template v-else>
      <span v-html="message.content">{{ message.content }}</span>
    </template>
    <br>
  </div>
</template>

<script>
export default {
  name: "MessageComponent",
  props: ['message'],
  data() {
    return{
      videoId: '',
      newContent: ''
    }
  },
  mounted() {
    if (this.message.content.includes('https://www.youtube.com/watch')) {

      let indexOfLink = this.message.content.indexOf('https://www.youtube.com/watch')
      let link = this.message.content.slice(indexOfLink)
      this.newContent = this.message.content.slice(0, indexOfLink)
      this.videoId = this.$youtube.getIdFromURL(link)

    } else if (this.message.content.includes('https://youtu.be')) {

      let tag = this.message.content.slice(17)
      let link = `https://www.youtube.com/watch?v=${tag}`
      this.videoId = this.$youtube.getIdFromURL(link)

    }
  }
}
</script>

<style scoped>

</style>