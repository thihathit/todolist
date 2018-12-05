<template
  v-if="isInit"
  >
  <div class="sign-in-btn">
    <div
      @click="signIn"

      class='btn'
      >
      <svg class='icon' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="865 355.5 20 20" width="20" height="20"><g><path d=" M 884.805 363.541 L 884 363.541 L 884 363.5 L 875 363.5 L 875 367.5 L 880.653 367.5 C 879.826 369.828 877.612 371.5 875 371.5 C 871.686 371.5 869 368.815 869 365.5 C 869 362.186 871.686 359.5 875 359.5 C 876.53 359.5 877.922 360.076 878.98 361.02 L 881.809 358.192 C 880.024 356.528 877.635 355.5 875 355.5 C 869.477 355.5 865 359.977 865 365.5 C 865 371.024 869.477 375.5 875 375.5 C 880.524 375.5 885 371.024 885 365.5 C 885 364.83 884.932 364.176 884.805 363.541 Z " fill="rgb(255,193,7)"/><path d=" M 866.153 360.846 L 869.44 363.256 C 870.328 361.055 872.48 359.5 875 359.5 C 876.53 359.5 877.922 360.076 878.98 361.02 L 881.809 358.192 C 880.024 356.528 877.635 355.5 875 355.5 C 871.158 355.5 867.828 357.668 866.153 360.846 Z " fill="rgb(255,61,0)"/><path d=" M 875 375.5 C 877.582 375.5 879.93 374.512 881.705 372.905 L 878.61 370.285 C 877.572 371.074 876.304 371.501 875 371.5 C 872.399 371.5 870.192 369.842 869.36 367.528 L 866.098 370.039 C 867.752 373.278 871.114 375.5 875 375.5 Z " fill="rgb(76,175,80)"/><path d=" M 884.805 363.541 L 884 363.541 L 884 363.5 L 875 363.5 L 875 367.5 L 880.653 367.5 C 880.257 368.608 879.546 369.576 878.608 370.285 L 878.61 370.285 L 881.705 372.905 C 881.487 373.102 885 370.5 885 365.5 C 885 364.83 884.932 364.176 884.805 363.541 Z " fill="rgb(25,118,210)"/></g></svg>
      <div class="label">
        Sign in with Google
      </div>
    </div>
  </div>
</template>

<script>
  import store from '@/store.js'
  import gdfs from 'gdrive-fs';

  export default {
    name: 'SignIn',
    computed: {
      isInit: function() {
        let auth = this.getAuth();

        return auth.isInit;
      },
    },
    methods: {
      getAuth: function() {
        return this.$store.state.auth;
      },
      signIn: function() {
        let auth = this.getAuth();

        if (auth.isInit && !auth.isAuth) {
          gdfs.signIn().then(() => {
            store.dispatch("updateAuth", {
              name: 'isAuth',
              value: true,
            });
          })
        }
      },
    },
  }
</script>

<style scoped>
  .sign-in-btn {
    display: flex;
  }

  .btn {
    display: flex;
    margin: 0 auto;
    align-items: center;
    cursor: pointer;
    border-radius: 3px;
    background-color: #fff;
    box-shadow: 0 0 3px rgba(0,0,0,0.25);
    padding: 8px 15px;

    transition: 0.3s box-shadow;
  }
  .btn:hover {
    box-shadow: 0 0 10px rgba(67, 121, 251, 0.5);
  }

  .btn .icon {
    display: block;
    width: 16px;
    height: auto;
  }
  .btn .label {
    color: #6a6a6a;
    margin-left: 15px;
  }
</style>