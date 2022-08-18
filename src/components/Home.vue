<template>
  <div class="body pt-3">
    <div class="header">
      <h3>Account Details:</h3>
      <span class="task-length">| {{ tasks.length }} Tasks</span>
    </div>

    <div v-for="task in this.tasks" v-bind:key="task.id">
      <div class="task-row">
        <span v-if="task.completed === false"
          >Due {{ formatDate(task.due_date) }}</span
        >
        <span v-else>Completed</span>
        <div
          v-bind:id="task.id"
          @click="handleStatus"
          class="card"
          :class="task.completed ? 'completed' : ''"
        >
          <p>{{ task.name }}</p>
          <ul class="tags">
            <li v-for="(tag, index) in task.tag_array" :key="index" class="tag">
              {{ tag }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <button @click="showModal = true" class="new-task-btn">
      Create New Task
    </button>
    <div v-if="showModal" class="task-form">
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
          <button class="create" type="submit" @click="handleSubmit">
            Create
          </button>
          <button class="close-modal" @click="showModal = false">Close</button>
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
      showModal: false,
    };
  },
  computed: {
    loggedIn: function () {
      return this.$store.getters.loggedIn;
    },
    currentUser: () => {
      return this.$store.state.currentUser;
    },
  },
  async mounted() {
    console.log(localStorage.getItem("jwtToken"));
    this.showModal = false;
    if (this.loggedIn) {
      await axios
        .get("task/")
        .then((response) => {
          this.tasks = response.data.data;
          console.log(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
      console.log(response);
      this.showModal = false;

      this.tasks = [response.data.task, ...this.tasks];

      this.name.value = "";
      this.dueDate.value = "";
      this.tasks = [];
    },
    async handleStatus(e) {
      const id = e.target.id;
      console.log({ id });
      const response = await axios.put(`/task/update/${id}`, {
        completed: true,
      });
      e.target.classList.toggle("completed");
      console.log(response);
    },

    formatDate(isoString) {
      const daysOfWeek = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];
      const date = new Date(isoString);
      const day = date.getDay(); // index
      return daysOfWeek[day];
    },
  },
};
</script>

<style>
.header {
  display: flex;
  align-items: center;
}

h3 {
  text-transform: uppercase;
  margin: 0;
}

.task-length {
  font-weight: 600;
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
  cursor: pointer;
}

.card:hover {
  transform: scale(1.02);
}

.new-task-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  border: none;
  background-color: rgb(81, 90, 80);
  padding: 15px 25px 15px 25px;
  text-transform: uppercase;
  font-weight: 600;
  color: rgb(237, 238, 223);
  border-radius: 10px;
}

.task-form {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  max-height: 300px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 4px 2px -2px gray;
  padding: 20px;
  overflow-y: scroll;
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
  flex-wrap: wrap;
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

.completed {
  cursor: default;
  pointer-events: none;
  text-decoration: line-through;
  opacity: 0.5;
}

.completed:hover {
  transform: scale(1);
}

.btn-container {
  display: flex;
  justify-content: end;
}

.btn-container > button {
  margin-right: 10px;
  margin-left: 10px;
  border: none;
  outline: none;
  border-radius: 50px;
  padding: 5px 20px 5px 20px;
  text-transform: uppercase;
  font-weight: 600;
  color: rgb(237, 238, 223);
}

.btn-container > .create {
  background-color: rgb(81, 90, 80);
}

.btn-container > .close-modal {
  background-color: rgb(230, 114, 106);
}
</style>
