<template>
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
        <div class ="flex-items-listtodo" v-for="todo in todolist">
          <div>
            <textarea name="todo" cols="auto" rows="2" @click="todo.isDisabled = !isDisabled" :disabled="todo.isDisabled">{{todo.task}}</textarea>
          </div>
          <button type="button" class="btn btn-danger" @click="deleteTask(todo)">Delete</button>
          <button class="btn-complete" @click="editTask(todo, true)"><span>Complete </span></button>
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
        <div class ="flex-items-listcomplete" v-for="complete in completelist">
          <div>
            <textarea name="todo" cols="auto" rows="2" disabled>{{complete.task}}</textarea>
          </div>
          <button class="btn-todo" @click="editTask(complete, false)"><span>Todo</span></button>
          <button type="button" class="btn btn-danger" @click="deleteTask(complete)">Delete</button>
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
    editTask(todo, isComplete) {
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
    deleteTask() {
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
          todo.isDisabled = false;
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

.newtodo {
  float: left;
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
  border: 1px solid black;
  float: left;
}

.flex-items-right {
  width: 550px;
  height: auto;
  margin: auto;
  padding: 7px;
  border: 1px solid black;
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
  width: 200px;
  height: 100px;
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
  width: 200px;
  height: 100px;
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

</style>
