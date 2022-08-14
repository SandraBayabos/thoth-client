<template>
  <div class="body">
    <h3>Account Details:</h3>

    <div v-for="task in this.tasks" v-bind:key="task.id">
      <div class="task-row">
        <span>Due {{ task.due_date }}</span>
        <div class="card">
          <p>{{ task.name }}</p>
        </div>
      </div>
    </div>
    <button class="new-task-btn">Create New Task</button>
    <div class="task-form">
      <form>
        <div class="form-group">
          <label for="title"></label>
          <input
            type="text"
            class="form-control"
            placeholder="Your New Task"
            v-model="name"
          />
        </div>

        <div class="form-group">
          <label for="due-date"></label>
          <input type="date" class="form-control" v-model="dueDate" />
        </div>

        <div class="form-group pt-4">
          <div class="tag-input">
            <input
              class="form-control mb-4"
              v-model="newTag"
              type="text"
              @keydown.enter="addTag(newTag)"
              @keydown.prevent.tab="addTag(newTag)"
              @keydown.enter.prevent
              placeholder="Press Enter to add tags"
            />
            <ul class="tags">
              <li v-for="(tag, index) in tags" :key="tag" class="tag">
                {{ tag }}
                <span class="delete-tag" @click="removeTag(index)">X</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="btn-container">
          <button type="submit" @click="handleSubmit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import { ref } from "vue";

export default {
  name: "HomePage",
  data() {
    return {
      name: "",
      dueDate: "",
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
  setup() {
    const tags = ref([]);
    const newTag = ref("");

    const addTag = (tag) => {
      tags.value.push(tag);
      console.log(tag);
      newTag.value = "";
    };

    const removeTag = (index) => {
      tags.value.splice(index, 1);
    };

    return { tags, newTag, addTag, removeTag };
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault();
      const response = await axios.post("/task/create", {
        user_id: localStorage.getItem("jwtToken"),
        name: this.name,
        due_date: this.dueDate,
        tags: this.tags,
      });

      this.tasks = [...this.tasks, response.data.task];
    },
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

.task-form {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 300px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 4px 2px -2px gray;
  padding: 20px;
}

.form-header {
  border-bottom: 1px solid black;
}

.heading {
  font-size: 1em;
  font-weight: 600;
}

ul {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 7px;
  margin: 0;
  padding: 0;
}
.tag {
  background: black;
  padding: 5px 20px 5px 20px;
  border-radius: 50px;
  color: white;
  white-space: nowrap;
  transition: 0.1s ease background;
}

.delete-tag {
  padding-left: 10px;
  font-size: 0.8em;
  cursor: pointer;
}
</style>
