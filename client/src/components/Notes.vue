<template>
  <div class="notes">
    <form @submit.prevent="createNote" class="d-flex">
      <div class="form-group">
        <label for="content">Note</label>
        <input v-model="newNote.content" id="content" type="text" placeholder="Add Note" required />
      </div>
      <br />
      <div class="form-group">
        <label for="reportedBy">Reported By</label>
        <input
          v-model="newNote.reportedBy"
          id="reportedBy"
          type="text"
          placeholder="Reported By"
          required
        />

        <button type="submit" class="btn btn-outline-success">Add Note</button>
      </div>
    </form>
    <div v-for="note in notes" :key="note._id">
      <br />
      <b>Note:</b>
      {{ note.content }}
      <br />
      <b>Reported By:</b>
      {{ note.reportedBy }}
      <br />
      <b>Status:</b>
      {{ note.flagged }}
      <br />
    </div>
  </div>
</template>

<script>
export default {
  name: "Notes",
  mounted() {
    // console.log(this.$route.params.id);
    // debugger;
    this.$store.state.notes = []; // clears out store, otherwise notes multiply and travel
    this.$store.dispatch("getNotes", this.$route.params.id);
  },
  computed: {
    notes() {
      return this.$store.state.notes;
    }
  },
  data() {
    return {
      newNote: {
        content: "",
        reportedBy: ""
      }
    };
  },
  methods: {
    createNote() {
      let note = { ...this.newNote };
      note.bug = this.$route.params.id;
      note.flagged = "pending";
      this.$store.dispatch("createNote", note);
      this.newNote.content = "";
      this.newNote.reportedBy = "";
    }
  }
};
</script>

<style></style>
