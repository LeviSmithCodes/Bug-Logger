<template>
  <div class="bug container-fluid">
    <h4>Bug Details</h4>
    <br />
    Title: {{ bug.title }}
    <br />
    Description: {{ bug.description }}
    <br />
    Reported By: {{ bug.reportedBy }}
    <br />
    Last modified on: {{ bug.modifiedDate | formatDate }}
    <br />
    Closed Status: {{ bug.closed }}
    <br />
    <h4>Notes:</h4>
    <notes />
    <br />
    <hr />
    <br />
    <h4>Edit the bug</h4>
    <form @submit="editBug(bug)">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          v-model="editedBug.title"
          type="text"
          name="title"
          class="form-control"
          placeholder="enter updated title"
          required
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          v-model="editedBug.description"
          type="text"
          name="description"
          class="form-control"
          placeholder="enter updated description"
          required
        />
      </div>
      <button class="btn btn-info" type="submit">
        Edit Bug
      </button>
    </form>
    <button class="btn btn-danger" type="button" @click="closeBug">
      Close Bug
    </button>
  </div>
</template>

<script>
import Notes from "../components/Notes";
export default {
  name: "bug",
  mounted() {
    this.$store.dispatch("getActiveBug", this.$route.params.id);
  },
  data() {
    return {
      editedBug: {
        title: "",
        description: ""
      }
    };
  },
  methods: {
    async closeBug() {
      this.$swal({
        title: "Are you sure?",
        text: "You can't undo closing a bug",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Close the bug!",
        cancelButtonText: "Keep the bug open",
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then(result => {
        if (result.value) {
          this.$swal("Closed", "You successfully closed this bug", "success");
          this.$store.dispatch("closeBug", this.$route.params.id);
          this.$router.go(); // refreshes page?
        } else {
          this.$swal("Cancelled", "Your bug is still open", "info");
        }
      });
    },
    async editBug(bug) {
      try {
        // TODO try to call up active object, modify it, and pass it as the single parameter?
        let formData = { ...this.editedBug };
        // await this.$store.commit("editBug", this.$route.params.id, formData);
        // console.log(formData);
        // console.log(bug);
        bug.title = formData.title;
        bug.description = formData.description;
        bug.modifiedDate = new Date();
        console.log(bug);
        // console.log(this.$route.params.id);
        // debugger;
        await this.$store.dispatch("editBug", bug);
      } catch (error) {
        console.error(error);
      }
    }
  },
  computed: {
    bug() {
      return this.$store.state.activeBug;
    }
  },
  components: {
    Notes
  }
  // components: {
  //   title: null,
  //   description: null
  // }
};
</script>

<style></style>
