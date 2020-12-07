<template>
    <Panel id="panel-mine">
        <header class="panel-header">
            <span>我的</span>
        </header>
        <div id="mine-info">
            <span id="mine-logo"><img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2866953378,474015488&fm=11&gp=0.jpg"/></span>
            <span id="mine-name">Coufran</span>
        </div>
        <ul id="mine-list">
            <li><b-icon icon="power"></b-icon><span>退出登录</span></li>
        </ul>
    </Panel>
</template>

<script>
    import Panel from './Panel.vue'

    export default {
        name: "MinePanel",
        components: {
            Panel
        }
    }
</script>

<style scoped>
    .panel-header {
        height: 50px;
        line-height: 50px;
        font-size: 18px;
        text-align: center;
        box-sizing: border-box;
        border-bottom: 1px lightgray solid;
        background-color: white;
        position: relative;
    }

    #mine-info {
        padding: 0 20px;
        background-color: white;
        height: 100px;
        line-height: 100px;
    }
    #mine-logo>img {
        width: 60px;
        height: 60px;
        border-radius: 30px;
    }
    #mine-name {
        margin-left: 20px;
    }
    #mine-list {
        list-style-type: none;
        padding: 0;
    }
    #mine-list>li {
        padding: 0 20px;
        height: 40px;
        line-height: 40px;
        background-color: white;
        border-top: 1px lightgray solid;
        cursor: pointer;
    }
    #mine-list>li::after {
        content: '>';
        float: right;
    }
    #mine-list>li>span {
        margin-left: 10px;
    }
</style>