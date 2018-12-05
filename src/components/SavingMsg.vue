<template>
  <div
    :class="{active: getSaveInprogress}"

    class="saving-msg"
    >
    Saving data . . .
  </div>
</template>

<script>
import store from '@/store.js';

export default {
  name: 'SavingMsg',
  computed: {
    getSaveInprogress: function() {
      return this.$store.state.taskView.saveInprogress;
    },
  },
}
</script>

<style scoped>
  .saving-msg {
    z-index: 10;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 15px;
    opacity: 0;
    transition: 0.3s opacity;
    pointer-events: none;
    color: #FFFF00;
    font-size: 14px;
    padding: 15px 35px;
    background-color: #242424;
    border-radius: 3px;
    box-shadow: 0 0 3px rgba(0,0,0,0.5);
  }
  .saving-msg.active {
    opacity: 1;
  }
</style>
