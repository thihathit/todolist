<template>
  <div
    :class="{loading: getDownloadInprogress}"

    class="task-input"
    >
    <input
      @keyup.enter="onEnter"

      placeholder="Add task"
      type="text"
      >
  </div>
</template>

<script>
  export default {
    name: 'InputTask',
    computed: {
      getDownloadInprogress: function() {
        return this.$store.state.taskView.downloadInprogress;
      },
    },
    methods: {
      onEnter: function (e){
        let val = e.target.value;

        e.target.value = '';

        this.$store.dispatch("addTask", val);
      },
    },
  }
</script>

<style scoped>
  .task-input {
    margin-top: 15px;
    transition: 0.6s opacity;
    opacity: 1;
  }
  .task-input.loading {
    opacity: 0;
    cursor: progress;
  }
  .task-input:first-child {
    margin-top: 0;
  }

  .task-input input {
    width: 100%;
    display: block;
    background: none;
    padding: 8px 15px;
    border: 2px solid rgb(67, 121, 251);
    background-color: #fff;
  }
</style>