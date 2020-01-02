<template>
  <div class="home container-fluid">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <div class="row">
      <div class="col-12 bug-contents">
        <h1>THIS IS A FRONT END LOL</h1>
        <!-- <p v-for="bug in bugs" :key="bug._id">
          Bug:
          <router-link :to="{ name: 'bug', params: {id: bug._id}}">{{ bug.title }}</router-link>
          <br />
          Description: {{ bug.description }}
        </p>-->

        <form @submit.prevent="createBug" class="d-flex">
          <div class="form-group">
            <label for="title">Title</label>
            <input
              v-model="newBug.title"
              type="text"
              class="form-control"
              placeholder="Bug Title"
              id="title"
              required
            />
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <input
              v-model="newBug.description"
              type="text"
              class="form-control"
              placeholder="Bug Description"
              id="description"
              required
            />
          </div>
          <div class="form-group">
            <label for="reportedBy">Reported By</label>
            <input
              v-model="newBug.reportedBy"
              type="text"
              class="form-control"
              placeholder="Reported By"
              id="reportedBy"
              required
            />
          </div>
          <button class="btn btn-outline-success" type="submit">Add Bug</button>
        </form>

        <table
          id="table"
          data-filter-control="true"
          data-show-search-clear-button="true"
          class="table table-striped table-hover"
          style="width:100%"
          data-toggle="false"
        >
          <!-- changed data toggle from table to false to get filtering to work (??) -->
          <thead>
            <tr>
              <th data-field="title">Title</th>
              <th data-field="reportedBy" data-filter-control="select">
                Reported By
              </th>
              <th data-field="closed" data-filter-control="select">
                Closed Status
              </th>
              <th data-field="modifiedDate">
                Modified Date
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="bug in bugs" :key="bug._id">
              <td>
                <router-link :to="{ name: 'bug', params: { id: bug._id } }">{{
                  bug.title
                }}</router-link>
              </td>
              <td>{{ bug.reportedBy }}</td>
              <td v-bind:class="{ 'text-danger': bug['closed'] }">
                {{ bug.closed }}
              </td>
              <td>{{ bug.modifiedDate | formatDate }}</td>
              <!-- <td>{{bug.closed}}</td> -->
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

// $(function() {
//   $("#table").bootstrapTable();
// });

export default {
  name: "home",
  mounted() {
    this.$store.dispatch("getAllBugs");

    // setTimeout(
    //   function() {
    //     this.$store.dispatch("getAllBugs");
    //   }.bind(this),
    //   5000
    // );

    // $(function() {
    //   $("#table").bootstrapTable();
    // });
  },
  data() {
    return {
      newBug: {
        title: "",
        description: "",
        reportedBy: "",
        closed: false,
        closedDate: ""
      }
    };
  },
  methods: {
    async createBug() {
      let bug = { ...this.newBug };
      bug.modifiedDate = new Date();
      await this.$store.dispatch("createBug", bug); // the rest of the function was running before active bug was made
      this.newBug = {
        title: "",
        description: "",
        reportedBy: "",
        closed: false,
        closedDate: ""
      };
      let myActiveBug = this.$store.state.activeBug;
      this.$router.push({ name: "bug", params: { id: myActiveBug._id } });
    }
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

// NOTE excuse me WHAT the HECK commenting this out and then in makes it work perfectly. What's blocking it / resetting it???

// $(function() {
//   $("#table").bootstrapTable();
// });

setTimeout(function() {
  $("#table").bootstrapTable();
}, 1000);
</script>

<style>
table,
th,
td {
  border-top: 1px solid black !important; /* weird I had to do this, but okay */
  border: 1px solid black;
  text-align: left;
}

tr:nth-child(even) {
  background-color: #e0e0e0;
}
</style>
