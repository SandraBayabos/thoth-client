<template>
  <div id="navbar">
    <button @click="logout" class="logout-btn">Logout</button>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  computed: {
    loggedIn: function () {
      return this.$store.getters.loggedIn;
    },
  },
  methods: {
    logout: function () {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },
  },
};
</script>

<style>
#navbar {
  padding: 15px;
  display: flex;
  justify-content: end;
  background-color: rgb(81, 90, 80);
}

button {
  display: block;
  text-decoration: none;
  border: none;
  outline: none;
  border-radius: 50px;
  padding: 5px 20px 5px 20px;
  text-transform: uppercase;
  font-weight: 600;
  color: rgb(237, 238, 223);
  background-color: rgb(230, 114, 106);
  margin-top: 20px;
}
</style>
