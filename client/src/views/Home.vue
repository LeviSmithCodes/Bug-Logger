<template>
  <div class="home container-fluid">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <div class="row">
      <div class="col-12 bug-contents">
        <h1>THIS IS A FRONT END LOL</h1>
        <p v-for="bug in bugs" :key="bug._id">
          Bug:
          <router-link :to="{ name: 'bug', params: {id: bug._id}}">{{ bug.title }}</router-link>
          <br />
          Description: {{ bug.description }}
        </p>
      </div>
    </div>

    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  mounted() {
    this.$store.dispatch("getAllBugs");
  },
  computed: {
    bugs() {
      return this.$store.state.bugs;
    }
  }
  // components: {
  //   HelloWorld
  // }
};
</script>

<style>
h1 {
  /* justify-content: center !important; */
}
.bug-contents {
  /* justify-content: left; */
  /* color: red; */
}
</style>
