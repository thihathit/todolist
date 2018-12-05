<template>
  <div class="tasks-view">
    <div
      :class="{loading: getDownloadInprogress}"

      class="contents"
      >

      <div v-for="(task, index) in getTasks"
        :key="index"
        :class="{inactive: task.inactive}"

        class="tasks"
        >

        <div
          @click="toggleTask(task.id)"

          class="toggle-btn"
          >

        </div>
        <div class="label">{{ task.label }}</div>
        <div
          @click="removeTask(task.id)"

          class="remove-btn"
          >
          Remove
        </div>
      </div>

      <div class="svg-grid">
        <SvgGrid />
      </div>
    </div>
  </div>
</template>

<script>
  import SvgGrid from '@/icons/SvgGrid.vue';

  export default {
    name: 'TasksView',
    components: {
      SvgGrid,
    },
    computed: {
      getTasks: function() {
        return this.$store.state.tasks;
      },
      getDownloadInprogress: function() {
        return this.$store.state.taskView.downloadInprogress;
      },
    },
    methods: {
      toggleTask: function(tskId) {
        this.$store.dispatch("toggleTask", tskId);
      },
      removeTask: function(tskId) {
        this.$store.dispatch("removeTask", tskId);
      },
    },
  }
</script>

<style scoped>
  .contents {
    transition: 0.6s opacity;
    opacity: 1;
  }
  .contents.loading {
    opacity: 0;
    cursor: progress;
  }
  .tasks {
    display: grid;
    grid-template-columns: 15px 1fr auto;
    grid-gap: 10px;
    align-items: center;
  }
  .toggle-btn {
    cursor: pointer;
    height: 15px;
    position: relative;
    z-index: 10;
    border: 2px solid #3D9360;
    border-radius: 100%;
  }
  .toggle-btn:after {
    opacity: 1;
    content: ' ';
    position: absolute;
    z-index: 11;
    width: 7px;
    height: 7px;
    left: 2px;
    top: 2px;
    background-color: #3D9360;
    border-radius: 100%;

    transition: 0.3s opacity;
  }
  .inactive .toggle-btn:after {
    opacity: 0;
  }
  .remove-btn {
    cursor: pointer;
    font-size: 12px;
    color: #555;
    transition: 0.3s color;
  }
  .remove-btn:hover {
    color: red;
  }
  .tasks.inactive .label {
    text-decoration: line-through;
  }

  .svg-grid {
    opacity: 0;
    width: 60px;
    position: absolute;
    z-index: 11;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;

    transition: 0.3s opacity;
  }
  .loading .svg-grid {
    opacity: 1;
  }
  .svg-grid svg {
    display: block;
    width: 100%;
    height: auto;
  }
</style>