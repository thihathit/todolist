<template>
  <div class="page-tasks">
    <div class="wrapper">
      <div class="container">
        <TasksView />
        <InputTask />
        <SavingMsg />
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store.js';
import TasksView from '@/components/TasksView.vue'
import InputTask from '@/components/InputTask.vue'
import SavingMsg from '@/components/SavingMsg.vue'

export default {
  name: 'Tasks',
  components: {
    TasksView,
    InputTask,
    SavingMsg,
  },
  created: () => {
    store.dispatch("downloadTasks");
  }
}
</script>

<style scoped>
  .page-tasks {
    padding: 78px 15px;
    position: relative;
    z-index: 10;
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 400px;
    align-items: center;

    background-color: #f8f8f8;
  }
  .wrapper {
    width: 100%;
  }
  .container {
    max-width: 400px;
    margin: 0 auto;
  }
</style>
