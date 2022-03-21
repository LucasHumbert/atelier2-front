<template>
  <form-sign-up-component/>
</template>

<script>
import FormSignInComponent from "@/components/FormSignUpComponent";
import FormSignUpComponent from "@/components/FormSignUpComponent";

export default {
  name: "SignupView",
  components : {
    FormSignUpComponent,
    FormSignInComponent
  }
}
</script>

<style scoped>

</style>
