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
                        <span>{{ numeral((assetsAmount+liabilityAmount)/100).format("0.00") }}</span>
                        <span class="account-summary-font-small">净资产</span>
                    </div>
                    <div class="account-summary-assist">
                        <div><span class="account-summary-font-small">负债</span> <span>{{ numeral(0-liabilityAmount/100).format("0.00") }}</span></div>
                        <div><span class="account-summary-font-small">资产</span> <span>{{ numeral(assetsAmount/100).format("0.00") }}</span></div>
                    </div>
                </header><!-- 资产汇总 -->
                <!-- 账户分类 -->
                <div class="account-container">
                    <template v-for="(accountByTitleItem, index) in accountByTitle">
                        <article v-if="isReal(accountByTitleItem.title)" :key="index" class="account-title">
                            <header class="account-title-header">
                                <div>{{ accountByTitleItem.title.name }}</div>
                            </header>
                            <!-- 账户 -->
                            <section v-for="account in accountByTitleItem.accounts" :key="account.id" class="account-account">
                                <div>{{ account.name }}</div>
                                <div>{{ numeral(account.amount/100).format("0.00") }}</div>
                            </section><!-- 账户 -->
                        </article>
                    </template>
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
        },
        data: function() {
            return {
                accounts: [],
            };
        },
        computed: {
            accountByTitle: function() {
                let accountByTitleMap = new Map();
                for(let i=0; i<this.accounts.length; i++) {
                    let account = this.accounts[i];
                    let accountByTitleItem = accountByTitleMap.get(account.title.id);
                    if(accountByTitleItem == null) {
                        accountByTitleItem = {
                            title: account.title,
                            accounts: []
                        };
                    }
                    accountByTitleItem.accounts.push(account);
                    accountByTitleMap.set(account.title.id, accountByTitleItem);
                }
                let accountByTitle = [];
                accountByTitleMap.forEach(value => {
                    accountByTitle.push(value);
                });
                return accountByTitle;
            },
            assetsAmount: function() {
                return this.sumAmount("ASSETS");
            },
            liabilityAmount: function() {
                return this.sumAmount("LIABILITY");
            }
        },
        created: function() {
            this.axios
                .get("/account/list")
                .then(result => {
                    if(!result.success) {
                        alert(result.msg);
                        return;
                    }
                    this.accounts = result.data;
                });
        },
        methods: {
            isReal: function(title) {
                return title.kind == "ASSETS" || title.kind == "LIABILITY";
            },
            sumAmount: function(kind) {
                let sumAmount = 0;
                for(let i=0; i<this.accounts.length; i++) {
                    let account = this.accounts[i];
                    if(account.title.kind == kind) {
                        sumAmount += account.amount;
                    }
                }
                return sumAmount;
            }
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