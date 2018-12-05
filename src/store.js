import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router.js';

import { gdrive } from '@/libraries/api-info.js';
import gdfs from 'gdrive-fs';

import uniqid from 'uniqid'

Vue.use(Vuex)

const dataFileName = 'todolist.app';

const store = new Vuex.Store({
  state: {
    auth: {
      isInit: false,
      isAuth: false,
    },
    tasks: [],
    taskView: {
      downloadInprogress: true,
      saveInprogress: false,
    },
  },
  getters: {},
  mutations: {
    // tasks
    ADD_TASK: (state, task) => {
      state.tasks.push(task);
    },
    UPDATE_TASKS: (state, tasks) => {
      state.tasks = tasks;
    },
    TOGGLE_TASK: (state, id) => {
      let item = state.tasks.find(task => task.id === id);

      item.inactive = !item.inactive;
    },
    REMOVE_TASK: (state, id) => {
      let index = state.tasks.findIndex(task => task.id === id);

      state.tasks.splice(index, 1);
    },

    // auth
    UPDATE_AUTH: (state, payload) => {
      state.auth[payload.name] = payload.value;
    },

    // taskView
    UPDATE_TASKVIEW: (state, payload) => {
      state.taskView[payload.name] = payload.value;
    },
  },
  actions: {
    // tasks
    downloadTasks: async (context) => {
      store.dispatch("updateTaskView", {
        name: 'downloadInprogress',
        value: true,
      });

      let tasks = await downloadDriveData();

      context.commit("UPDATE_TASKS", tasks);

      store.dispatch("updateTaskView", {
        name: 'downloadInprogress',
        value: false,
      });
    },
    addTask: (context, label) => {
      let task = {
        id: uniqid(),
        label: label,
        inactive: false,
      };

      context.commit("ADD_TASK", task);

      updateDriveData();
    },
    toggleTask: (context, id) => {
      context.commit("TOGGLE_TASK", id);

      updateDriveData();
    },
    removeTask: (context, id) => {
      context.commit("REMOVE_TASK", id);

      updateDriveData();
    },

    // auth
    updateAuth: (context, payload) => {
      context.commit("UPDATE_AUTH", payload);
    },

    // taskView
    updateTaskView: (context, payload) => {
      context.commit("UPDATE_TASKVIEW", payload);
    },
  },
});

// authentication
store.watch(
  function (state) {
    return state.auth.isAuth;
  },
  function(value) {
    if (value) {
      // update state.tasks
      store.dispatch("downloadTasks");

      // redirect
      if (store.state.route.name == 'authenticate') {
        router.push('/')
      }
    }
  }
)


const updateDriveData = async () => {
  const data = JSON.stringify(store.state.tasks);

  store.dispatch("updateTaskView", {
    name: 'saveInprogress',
    value: true,
  });

  let gInst = gdfs.createClient();
  let filePath = `/${gdrive.dataFolder}/${gdrive.dataFile}`;

  let readFolder = await gInst.readdir(gdrive.dataFolder);

  if (!readFolder) { // create folder
    await gInst.mkdir(gdrive.dataFolder);
  }

  // enter folder
  await gInst.chdir(gdrive.dataFolder);

  let readFile = await gInst.readFile(filePath);

  if (readFile) { // update existing data file
    let fileInfo = await gInst.stat(filePath);

    let updateFile = await gdfs.updateFile(fileInfo.id, 'text/plain', data);
  }
  else { // create data file
    let writeFile = await gInst.writeFile(filePath, 'text/plain', data);
  }

  store.dispatch("updateTaskView", {
    name: 'saveInprogress',
    value: false,
  });
}

const downloadDriveData = async () => {
  let gInst = gdfs.createClient();
  let filePath = `/${gdrive.dataFolder}/${gdrive.dataFile}`;

  let readFile = await gInst.readFile(filePath);

  if (readFile) {
    let tasks = JSON.parse(readFile);

    return tasks;
  }

  return null;
}


export default store;
