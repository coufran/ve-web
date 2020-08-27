<template>
  <div id="app">
    <b-button variant="primary">按钮</b-button>
  </div>
</template>

<script>

export default {
  name: 'App',
  created: function() {
      this.axios
          .get("/auth/isLogin")
          .then(function(response) {
              if(!response.success) {
                  alert(response.msg);
                  return;
              }
              let isLogin = response.data;
              if(!isLogin) {
                  window.location.href = "login.html";
              }
          });
  }
}
</script>

<style>

</style>
