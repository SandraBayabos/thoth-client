<template>
  <div id="green-bg"></div>
  <div class="form-container">
    <div id="login-form" class="shadow-sm">
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            class="form-control"
            placeholder="Email"
            v-model="email"
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            v-model="password"
          />
        </div>

        <button>Login</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login: function () {
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch("loginUser", { email, password })
        .then(() => {
          console.log("this runs second");
          this.$router.push("/home");
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style>
#green-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 40vw;
  background-color: rgb(81, 90, 80);
  height: 100%;
}

.form-container {
  height: calc(100vh - 60px);
  position: relative;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

#login-form {
  width: 500px;
  height: 300px;
  background-color: rgb(237, 238, 223);
  padding: 30px;
  border-radius: 10px;
  /* box-shadow: ; */
}

form {
  width: 100%;
}
</style>
