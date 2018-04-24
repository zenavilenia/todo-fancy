<template>
  <div>
    <div class="navigator">
      <button type="button" class="btn btn-danger btn-md btn-logout"
      v-on:click="logout">Logout</button>
    </div>
    <div class="flex-container">
      <div class="flex-items-left">
        <div class="flex-container-left">
          <div class="flex-items-todo">
            <p>Todo: </p>
          </div>
          <div class="flex-items-todo">
            <input placeholder="new todo..." class="form-control form-control-sm"
            type="text" v-model="newtodo">
          </div>
          <div class="flex-items-todo">
            <button class="btn btn-primary btn-block" @click="addTodo()">Add</button>
          </div>
        </div>
        <div class ="flex-container-listtodo">
          <div class ="flex-items-listtodo" v-for="todo in todolist" :key="todo._id"
          :style="{'background-color':todo.bgColor}">
            <div>
              <textarea name="todo" cols="auto" rows="2" v-model="todo.task"
              :disabled="todo.isDisabled"></textarea>
            </div>
            <button type="button" class="btn btn-info" @click="editTask(todo)">Edit</button>
            <select class="form-control color-selector" data-live-search="true"
            @click="colorPicker(todo._id, selectedColorTodo[index])"
            v-model="selectedColorTodo[index]" required>
              <option v-for="(color,i) in colors" :key="i" :value="color"> {{ color }} </option>
            </select>
            <button type="button" class="btn btn-danger" @click="deleteTask(todo)">Delete</button>
            <button class="btn-complete" @click="editIsComplete(todo, true)">
              <span>Complete </span>
            </button>
          </div>
        </div>
      </div>
      <div class="flex-items-right">
        <div class="flex-container-right">
          <div class="flex-items-complete">
            <p>Complete: </p>
          </div>
        </div>
        <div class ="flex-container-listcomplete">
          <div class ="flex-items-listcomplete" v-for="complete in completelist"
          :key="complete._id" :style="{'background-color':complete.bgColor}">
            <div>
              <textarea name="todo" cols="auto" rows="2" v-model="complete.task"
              :disabled="complete.isDisabled"></textarea>
            </div>
            <button type="button" class="btn btn-info" @click="editTask(complete)">Edit</button>
            <select class="form-control color-selector" data-live-search="true"
            @click="colorPicker(complete._id, selectedColorComplete[index])"
            v-model="selectedColorComplete[index]" required>
              <option v-for="(color,i) in colors" :key="i" :value="color"> {{ color }} </option>
            </select>
            <button class="btn-todo" @click="editIsComplete(complete, false)">
              <span>Todo</span>
            </button>
            <button type="button" class="btn btn-danger"
            @click="deleteTask(complete)">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      newtodo: '',
      todolist: [],
      completelist: [],
      selectedColorTodo: [],
      selectedColorComplete: [],
      colors: ['Red', 'Blue', 'Yellow', 'Aqua', 'BlueViolet', 'Cyan', 'DarkOrchid', 'SteelBlue', 'Teal'],
    };
  },
  methods: {
    addTodo() {
      axios.post('http://localhost:3000/todo/', {
        task: this.newtodo,
      }, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(() => {
          location.reload();
        })
        .catch((err) => {
          console.log('ini err', err);
        });
    },
    editIsComplete(todo, isComplete) {
      axios.put('http://localhost:3000/todo/', {
        id: todo._id,
        isComplete,
      }, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(() => {
          location.reload();
        })
        .catch((err) => {
          console.log('ini err', err);
        });
    },
    editTask(todo) {
      console.log('masuk edit task');
      console.log('todo', todo);
      todo.isDisabled = !todo.isDisabled;
      if (todo.isDisabled) {
        axios.put('http://localhost:3000/todo/task', {
          id: todo._id,
          task: todo.task,
        }, {
          headers: {
            token: localStorage.getItem('token'),
          },
        })
          .then(() => {
            location.reload();
          })
          .catch((err) => {
            console.log('ini err', err);
          });
      }
    },
    deleteTask(todo) {
      axios.delete(`http://localhost:3000/todo/${todo._id}`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(() => {
          location.reload();
        })
        .catch((err) => {
          console.log('ini err', err);
        });
    },
    colorPicker(id, bgColor) {
      axios.put('http://localhost:3000/todo/bgColor', {
        id,
        bgColor,
      }, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(() => {
          location.reload();
        })
        .catch((err) => {
          console.log('ini err', err);
        });
    },
    logout() {
      localStorage.removeItem('token');
      alert('logged out');
      this.$router.push('/login');
    },
  },
  async created() {
    const arrTodo = [];
    const arrComplete = [];
    axios.get('http://localhost:3000/todo/', {
      headers: {
        token: localStorage.getItem('token'),
      },
    })
      .then((response) => {
        response.data.data.map((todo) => {
          console.log(todo);
          todo.isDisabled = true;
          if (todo.isComplete) {
            arrComplete.push(todo);
          } else {
            arrTodo.push(todo);
          }
        });
        this.todolist = arrTodo;
        console.log('list', this.todolist);
        this.completelist = arrComplete;
      })
      .catch((err) => {
        console.log('ini err', err);
      });
  },
  mounted: () => {
    document.body.className = 'todo';
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
  text-align: left;
  font-size: 22px;
  font-family: Vivaldi, cursive;
}

a {
    color: black;
}

.navigator {
  height: 50px;
  margin-top: 20px;
  margin-right: 55px;
}

.btn-logout {
  float: right;
}

.newtodo {
  float: left;
}

.btn-logout {
  margin: 10px;
}

.flex-container {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  height: auto;
  max-width: 1200px;
  margin: auto;
  border: 2px solid #000000;
  background-color: rgb(255,255,255,0.3);
  border-radius: 20px;
  align-items: flex-start;
  align-content: flex-start;
}

.flex-items-left {
  width: 550px;
  height: auto;
  margin: auto;
  padding: 7px;
  float: left;
}

.flex-items-right {
  width: 550px;
  height: auto;
  margin: auto;
  padding: 7px;
  float: right;
}

.flex-container-left {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.flex-items-todo {
  padding: 10px;
}

.flex-container-right {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.flex-items-complete {
  padding: 10px;
}

.flex-container-listtodo {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: flex-start
}

.flex-items-listtodo {
  width: 240px;
  height: 140px;
  border: 1px solid black;
  padding: 5px;
  text-align: center;
  margin: 10px;
  border-radius: 8px;
}

.flex-container-listcomplete {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: flex-start
}

.flex-items-listcomplete {
  width: 240px;
  height: 140px;
  border: 1px solid black;
  padding: 5px;
  text-align: center;
  margin: 10px;
  border-radius: 8px;
}

.btn-complete {
  border-radius: 8px;
  background-color: #f4511e;
  border: none;
  color: #FFFFFF;
  text-align: center;
  font-size: 14px;
  padding: 4px;
  width: 90px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
}

.btn-complete span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.btn-complete span:after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.btn-complete:hover span {
  padding-right: 15px;
}

.btn-complete:hover span:after {
  opacity: 1;
  right: 0;
}

.btn-danger {
  border-radius: 8px;
  border: none;
  color: #FFFFFF;
  text-align: center;
  font-size: 14px;
  padding: 4px;
  width: 70px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 3px;
}

.btn-info {
  border-radius: 8px;
  border: none;
  color: #FFFFFF;
  text-align: center;
  font-size: 14px;
  padding: 4px;
  width: 70px;
  transition: all 0.5s;
  cursor: pointer;
  margin-left: 14px;
  margin-bottom: 3px;
  margin-top: 3px;
}

.btn-todo {
  border-radius: 8px;
  background-color: #f4511e;
  border: none;
  color: #FFFFFF;
  text-align: center;
  font-size: 14px;
  padding: 4px;
  width: 90px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
}

.btn-todo span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.btn-todo span:after {
  content: '\00ab';
  position: absolute;
  opacity: 0;
  top: 0;
  left: -10px;
  transition: 0.5s;
}

.btn-todo:hover span {
  padding-left: 15px;
}

.btn-todo:hover span:after {
  opacity: 1;
  left: 0;
}

.color-selector {
  width: 90px;
  float: right;
  margin-right: 28px;
  margin-left: 0px;
}
</style>
