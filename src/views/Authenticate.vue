<template>
  <div class="page-authenticate">
    <div class="wrapper">
      <div class="container">
        <SignIn />
      </div>
    </div>
  </div>
</template>

<script>
  import SignIn from '@/components/SignIn.vue';

  export default {
    name: 'Root',
    components: {
      SignIn,
    },
  }
</script>

<style scoped>
  .page-authenticate {
    padding: 0 15px;
    display: flex;
    width: 100%;
    height: 100%;
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