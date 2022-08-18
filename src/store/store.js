import axios from "axios";
import { createStore } from "vuex";

const store = createStore({
  state: {
    authenticated: localStorage.getItem("jwtStorage") !== null,
    currentUser: {},
  },
  getters: {
    loggedIn(state) {
      return state.authenticated !== null;
    },
  },
  mutations: {
    setAuthenticated(state, payload) {
      state.authenticated = payload;
      localStorage.setItem("jwtToken", payload);
    },
    setCurrentUser(state, payload) {
      state.currentUser = payload;
    },
  },
  actions: {
    async loginUser({ commit }, formData) {
      await axios
        .post("auth/login", formData)
        .then((response) => {
          if (response.status === 200) {
            console.log("this runs first");
            localStorage.setItem("jwtToken", response.data.token);
            commit("setCurrentUser", response.data.user);
            commit("setAuthenticated", response.data.token);
            console.log(response.data.user);
          } else {
            console.log(response.data);
          }
        })
        .catch((error) => {
          if (error) {
            console.log(error);
          }
        });
    },
    logout({ commit }) {
      // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) => {
        commit("logout");
        localStorage.removeItem("jwtToken");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    },
  },
});

export default store;
