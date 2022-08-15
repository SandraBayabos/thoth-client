<template>
  <NavBar />
  <div class="container-fluid px-5">
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "./components/Nav.vue";
export default {
  name: "App",
  components: {
    NavBar,
  },
};
</script>

<style>
.container-fluid {
  /* height: calc(100vh - 50px); */
  background-color: rgb(204, 191, 174);
}

#green-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 40vw;
  background-color: rgb(81, 90, 80);
  height: 100%;
}
</style>
