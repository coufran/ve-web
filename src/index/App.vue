<template>
  <div id="app">
    <div id="content">
      <RecordPanel v-if="activePanel == 'record'"></RecordPanel>
      <AccountPanel v-if="activePanel == 'account'"></AccountPanel>
      <MinePanel v-if="activePanel == 'mine'"></MinePanel>
    </div>
    <footer class="nav">
      <div class="nav-item" :class="{active : activePanel == 'record'}" @click="changePanel('record')">
        <span><b-icon icon="pen"></b-icon></span>
        <span>记账</span>
      </div>
      <div class="nav-item" :class="{active : activePanel == 'account'}" @click="changePanel('account')">
        <span><b-icon icon="credit-card"></b-icon></span>
        <span>账户</span>
      </div>
      <div class="nav-item" :class="{active : activePanel == 'mine'}" @click="changePanel('mine')">
        <span><b-icon icon="person"></b-icon></span>
        <span>我的</span>
      </div>
    </footer>
  </div>
</template>

<script>
import RecordPanel from "./components/RecordPanel.vue"
import AccountPanel from "./components/AccountPanel.vue"
import MinePanel from "./components/MinePanel.vue"

export default {
    name: 'App',
    components: {
        RecordPanel,
        AccountPanel,
        MinePanel
    },
    data: function() {
        return {
            activePanel: "record" // record（记账），account（账户），mine（我的）
        };
    },
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
    },
    methods: {
        changePanel: function(panel) {
            this.activePanel = panel;
        }
    }
}
</script>

<style>
  #app {
    margin: 0 auto;
    width: 100%;
    max-width: 500px;
    min-height: 100vh;
    background-color: rgb(242,242,242);
    display: flex;
    flex-direction: column;
  }

  #content {
    flex-grow: 1;
  }

  .nav {
    height: 60px;
    display: flex;
    border-top: 1px solid #eee;
  }
  .nav-item {
    padding: 5px 6px 0 0;
    font-size: 12px;
    flex-grow: 1;
    text-align: center;
    display: flex;
    flex-direction: column;
    cursor: pointer;
  }
  .nav-item.active {
    color: var(--cyan);
  }
  .nav-item>*:first-child {
    font-size: 20px;
  }
</style>
