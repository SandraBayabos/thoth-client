<template>
  <div id="navbar">
    <a href="">Logout</a>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style>
#navbar {
  height: 50px;
  display: flex;
  justify-content: end;
  background-color: rgb(81, 90, 80);
}

a {
  display: block;
  padding: 20px;
  text-decoration: none;
}
</style>
