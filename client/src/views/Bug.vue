<template>
  <div class="bug container-fluid">
    Bug Details
    <br />
    Title: {{ bug.title }}
    <br />
    Description: {{ bug.description }}
    <br />
    Reported By: {{ bug.reportedBy }}
    <br />
    Closed Status: {{ bug.closed }}
    <br />
  </div>
</template>

<script>
export default {
  name: "bug",
  mounted() {
    this.$store.dispatch("getActiveBug", this.$route.params.id);
  },
  computed: {
    bug() {
      return this.$store.state.activeBug;
    }
  }
};
</script>

<style>
</style>