<template>
    <Panel id="panel-account">
        <header id="panel-account-header">
            <span>我的资产</span>
            <div id="panel-account-header-btns">
                <div>+</div>
            </div>
        </header>
        <div id="panel-account-main" class="slider">
            <div class="slider-body">
                <!-- 资产汇总 -->
                <header class="account-summary">
                    <div class="account-summary-main">
                        <span>3453613.22</span>
                        <span class="account-summary-font-small">净资产</span>
                    </div>
                    <div class="account-summary-assist">
                        <div><span class="account-summary-font-small">负债</span> <span>92117.69</span></div>
                        <div><span class="account-summary-font-small">资产</span> <span>192117.69</span></div>
                    </div>
                </header><!-- 资产汇总 -->
                <!-- 账户分类 -->
                <div class="account-container">
                    <article  v-for="j in 6" :key="j" class="account-title">
                        <header class="account-title-header">
                            <div>现金</div>
                        </header>
                        <!-- 账户 -->
                        <section v-for="i in j" :key="i" class="account-account">
                            <div>钱包</div>
                            <div>150.00</div>
                        </section><!-- 账户 -->
                    </article>
                </div><!-- 账户分类 -->
            </div>
        </div>
    </Panel>
</template>

<script>
    import Panel from './Panel.vue'

    export default {
        name: "AccountPanel",
        components: {
            Panel
        }
    }
</script>

<style>
    #panel-account {
        display: flex;
        flex-direction: column;
    }
    #panel-account-header {
        height: 50px;
        line-height: 50px;
        font-size: 18px;
        text-align: center;
        box-sizing: border-box;
        border-bottom: 1px lightgray solid;
        background-color: white;
        position: relative;
    }
    #panel-account-header-btns {
        height: inherit;
        line-height: inherit;
        position: absolute;
        right: 0;
        top: 0;
    }
    #panel-account-header-btns>* {
        padding: 0 20px;
        cursor: pointer;
    }

    #panel-account-main {
        width: 100%;
        height: 0;
        flex-grow: 1;
    }

    .account-summary {
        background-color: white;
    }
    .account-summary-main {
        padding: 15px 20px;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        border-bottom: 1px lightgray dashed;
    }
    .account-summary-main>*:first-child {
        font-size: 18px;
    }
    .account-summary-assist {
        padding: 10px 20px;
        display: flex;
        justify-content: space-between;
    }
    .account-summary-font-small {
        font-size: 12px;
        color: var(--gray);
    }

    .account-container {
        padding: 0 20px;
    }
    .account-title {
        margin: 20px 0;
        background-color: white;
        border-radius: 10px 10px 0 0;
        overflow: hidden;
    }
    .account-title-header {
        padding: 0 20px;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        background-color: deepskyblue;
        color: white;
    }
    .account-account {
        padding: 0 20px;
        height: 50px;
        line-height: 50px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border-bottom: 1px lightgray dashed;
        box-sizing: border-box;
    }
    .account-account:last-child {
        border-style: none;
    }
</style>