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
    }
  },
  actions: {
    async getAllBugs({ commit, dispatch }) {
      let res = await _myServer.get("bugs");
      console.log(res.data);
      commit("setAllBugs", res.data); // not data.data because we're not on the herokuapp sandbox
    }
  },
  modules: {}
});
