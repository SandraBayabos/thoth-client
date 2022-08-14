<template>
  <div id="header">
    <h3>Account Details:</h3>

    <div v-for="task in this.tasks" v-bind:key="task.user_id">
      <div class="task-row">
        <span>Due {{ task.due_date }}</span>
        <div class="card">
          <p>{{ task.name }}</p>
        </div>
      </div>
    </div>
    <button class="new-task-btn">Create New Task</button>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import axios from "axios";

export default {
  name: "HomePage",
  data() {
    return {
      tasks: [],
    };
  },
  async created() {
    await axios
      .get("auth/auto_login", {})
      .then((response) => {
        const userId = response.data.user;
        console.log(userId);
        axios
          .get("task/")
          .then((response) => {
            this.tasks = response.data.data;
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style>
h3 {
  text-transform: uppercase;
}

.task-row {
  padding-top: 20px;
  padding-bottom: 20px;
  border-top: 1px solid black;
}

.card {
  padding: 20px;
  background-color: rgb(237, 238, 223);
  box-shadow: 0 4px 2px -2px gray;
  font-size: 0.8em;
  max-width: 40vw;
}

.new-task-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>
