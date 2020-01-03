import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

let _myServer = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 6000
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bugs: [],
    activeBug: {},
    notes: []
  },
  mutations: {
    setAllBugs(state, data) {
      state.bugs = data;
    },
    setActiveBug(state, data) {
      state.activeBug = data;
    },
    addBug(state, data) {
      state.bugs.push(data);
    },
    setNotes(state, data) {
      state.notes.push(...data);
    }
  },
  actions: {
    async getAllBugs({ commit, dispatch }) {
      let res = await _myServer.get("bugs");
      console.log(res.data);
      commit("setAllBugs", res.data); // not data.data because we're not on the herokuapp sandbox
    },
    async getActiveBug({ commit, dispatch }, id) {
      let res = await _myServer.get("bugs/" + id);
      commit("setActiveBug", res.data);
    },
    async createBug({ commit, dispatch }, bug) {
      let res = await _myServer.post("bugs", bug);
      commit("addBug", res.data);
      commit("setActiveBug", res.data); // attempt to make new bug the active one
    },
    async closeBug({ commit, dispatch }, id) {
      let res = await _myServer.delete("bugs/" + id);
      // commit("closeBug", res.data) // Do I need anything here? Probably refreshing page. NOTE how do I accomplish this? by putting this.$router.go() in bug.vue > methods > closeBug of course
      // commit("setActiveBug", res.data);
      // this.$forceUpdate();
    },
    async editBug({ commit, dispatch }, updatedBug) {
      debugger;
      let res = await _myServer.put("bugs/" + updatedBug.id, updatedBug);
      console.log(res);
    },
    async getNotes({ commit, dispatch }, bugId) {
      let res = await _myServer.get("bugs/" + bugId + "/notes");
      commit("setNotes", res.data);
    }
  },
  modules: {}
});
