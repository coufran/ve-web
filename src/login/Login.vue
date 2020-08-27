<template>
    <div id="container">
        <h1 id="logo">微鱼</h1>
        <b-form-input class="form-line" v-model="username" autofocus placeholder="用户名" @keypress.enter="login"></b-form-input>
        <b-form-input class="form-line" type="password" v-model="password" placeholder="密码" @keypress.enter="login"></b-form-input>
        <b-button class="form-line" block variant="info" @click="login">登 录</b-button>
        <div id="msg" class="form-line text-danger">{{msg}}</div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data: function() {
            return {
                username: null,
                password: null,
                msg: null
            };
        },
        methods: {
            login: function() {
                // validate
                if(!this.username) {
                    this.msg = "请输入用户名";
                    return;
                }
                if(!this.password) {
                    this.msg = "请输入密码";
                    return;
                }

                // reset
                this.msg = null;

                // request
                this.axios
                    .post("/auth/login", {
                        username: this.username,
                        password: this.password
                    })
                    .then(response => {
                        if(!response.success) {
                            this.msg = response.msg;
                            return;
                        }
                        let token = response.data;
                        window.sessionStorage.setItem("token", token);
                        window.location.href = "index.html";
                    });
            }
        }
    }
</script>

<style>
    body{
        background-color: rgb(242,242,2420);
    }
</style>

<style scoped>
    #container {
        margin: 0 auto;
        padding-top: 50px;
        width: 100%;
        max-width: 1000px;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #logo {
        text-align: center;
    }

    .form-line {
        width: 100%;
        margin-top: 20px;
        max-width: 300px;
    }

    #msg {
        margin-top: 10px;
        font-size: 12px;
        text-align: center;
    }

</style>