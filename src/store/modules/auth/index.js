// import axios from "axios";

// export default {
//   namespaced: true,
//   state() {
//     user: '';
//   },
//   mutations: {
//     setUser(state, user) {
//       state.user = user;
//       console.log("User set in store");
//     },
//   },
//   getters: {
//     getUser: (state) => {
//       console.log("Retrieving user...");
//       return state.user;
//     },
//   },
//   actions: {
//     async login(store, credentials) {
//       let response = await axios
//         .post("auth/login", {
//           body: JSON.stringify(credentials),
//         })
//         .json();
//       store.commit("setUser", response.user);
//     },
//   },
// };
