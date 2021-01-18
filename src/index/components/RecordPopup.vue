<template>
    <Popup class="popup" :active="active">
        <header class="popup-header">
            <div><b-icon-chevron-left @click="hide"></b-icon-chevron-left></div>
            <div>日常账本</div>
        </header>
        <div class="popup-content">
            <!-- tab选择 -->
            <div class="popup-record-tab">
                <b-button @click="tab('LOSS')" :class="{'active':activeTabName=='LOSS'}" variant="link">支出</b-button>
                <b-button @click="tab('PROFIT')" :class="{'active':activeTabName=='PROFIT'}" variant="link">收入</b-button>
                <b-button @click="tab('TRANSFER')" :class="{'active':activeTabName=='TRANSFER'}" variant="link">转账</b-button>
            </div><!-- tab选择 -->
            <!-- 金额输入 -->
            <div class="popup-record-amount">
                <div>{{ activeAccount?activeAccount.name:'' }}</div>
                <input v-model="amount" type="text" placeholder="0.00" />
            </div><!-- 金额输入 -->
            <!-- 科目选择 -->
            <div class="popup-record-title">
                <template v-for="account in accounts">
                    <div v-if="account.title.kind==activeTabName" @click="changeAccount(account)"
                         :key="account.id" :class="{'active':account==activeAccount}">
                        <div>{{ account.name[0] }}</div>
                        <div>{{ account.name }}</div>
                    </div>
                </template>
            </div><!-- 科目选择 -->
            <!-- 底部弹出框 -->
            <Popup class="popup-record-popup" :active="true && active" :height="'auto'">
                <div class="popup-record-popup-line1">
                    <div class="popup-record-time"><b-icon icon="calendar3"></b-icon> <input v-model="time" type="text" style="max-width: 50px" /></div>
                    <div class="popup-record-remark">
                        <b-icon icon="pencil-square"></b-icon>
                        <input v-model="remark" type="text" placeholder="写点啥备注下"/>
                        <b-button @click="add">OK</b-button>
                    </div>
                </div>
                <div class="popup-record-popup-line2">
                    <div>
                        <select v-model="realAccountId1">
                            <template v-for="account in accounts">
                                <option v-if="isReal(account.title)" :key="account.id" :value="account.id">{{ account.name }}</option>
                            </template>
                        </select>
                    </div>
                    <div>
                        <select v-model="realAccountId2" v-if="activeTabName=='TRANSFER'">
                            <template v-for="account in accounts">
                                <option v-if="isReal(account.title)" :key="account.id" :value="account.id">{{ account.name }}</option>
                            </template>
                        </select>
                    </div>
                    <div></div>
                    <div></div>
                </div>
            </Popup><!-- 底部弹出框 -->
        </div>
    </Popup>
</template>

<script>
    import Popup from './Popup.vue'

    export default {
        name: "RecordPopup",
        components: {
            Popup
        },
        data: function() {
            return {
                active: false,
                activeTabName: "LOSS",
                amount: null,
                accounts: [],
                activeAccount: null,
                realAccountId1: null,
                realAccountId2: null,
                time: this.moment().format("MM.DD"),
                remark: null
            };
        },
        computed: {
        },
        watch: {
            amount: function(newValue, oldValue) {
                if(!/^[0-9]{0,8}(\.[0-9]{0,2})?$/.test(newValue)) {
                    this.amount = oldValue;
                }
            }
        },
        created: function() {
            this.axios
                .get("account/list")
                .then(result => {
                    if(!result.success) {
                        alert(result.msg);
                        return;
                    }
                    this.accounts = result.data;
                    this.initActiveAccount();
                });
        },
        methods: {
            show: function() {
                this.active = true;
            },
            hide: function() {
                this.active = false;
            },
            clear: function() {
                this.amount = null;
                this.remark = null;
            },
            tab: function(tabName) {
                this.activeTabName = tabName;
                this.initActiveAccount();
            },
            initActiveAccount: function() {
                for(let account of this.accounts) {
                    if(this.isReal(account.title)) {
                        this.realAccountId1 = this.realAccountId1 || account.id;
                        this.realAccountId2 = this.realAccountId2 || account.id;
                        break;
                    }
                }
                for(let account of this.accounts) {
                    if(account.title.kind == this.activeTabName) {
                        this.activeAccount = account;
                        return;
                    }
                }
                this.activeAccount = null;
            },
            changeAccount: function(account) {
                this.activeAccount = account;
            },
            isReal: function(title) {
                return title.kind == "ASSETS" || title.kind == "LIABILITY";
            },
            add: function() {
                // 设置借方贷方
                let debitId; // 借方
                let creditId;// 贷方
                if(this.activeTabName == 'LOSS') { // 支出
                    debitId = this.activeAccount.id;
                    creditId = this.realAccountId1;
                } else if(this.activeTabName == 'PROFIT') { // 收入
                    debitId = this.realAccountId1;
                    creditId = this.activeAccount.id;
                } else {
                    debitId = this.realAccountId2;
                    creditId = this.realAccountId1;
                }
                // 请求
                this.axios
                        .post("record/add", {
                            amount: this.numeral(this.amount).multiply(100).value(), // 金额
                            debitId: debitId, // 借方
                            creditId: creditId, // 贷方
                            // groupId: xxx, // 联合ID
                            time: this.moment(this.time, "MM.DD").format("YYYY-MM-DD HH:mm:ss"), // 时间
                            remark: this.remark // 备注
                        })
                        .then(result => {
                            if(!result.success) {
                                alert(result.msg);
                                return;
                            }
                            this.$emit("recordChange");
                            this.clear();
                            this.hide();
                        });
            }
        }
    }
</script>

<style scoped>
.popup {
    background-color: white;
}

.popup-header {
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #e85353;
}
.popup-header>*:first-child {
    position: absolute;
    left: 0;
    top: 0;
    width: 50px;
    cursor: pointer;
}

.popup-record-tab {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
}
.popup-record-tab>* {
    color: gray;
    text-decoration: none;
    box-shadow: none;
    outline: none;
    border-radius: 0;
    border-bottom: 2px solid transparent;
}
.popup-record-tab>*.active {
    border-bottom: 2px solid #ee3f3e;
}

.popup-record-amount {
    padding: 0 20px;
    display: flex;
    justify-content: center;
    height: 60px;
    line-height: 60px;
    color: white;
    background-color: #e1861b;
}
.popup-record-amount>div {
    background-color: #e1861b;
}
.popup-record-amount>input {
    flex-grow: 1;
    text-align: right;
    border-style: none;
    color: inherit;
    background-color: transparent;
}

.popup-record-title {
    display: flex;
    flex-wrap: wrap;
}
.popup-record-title>* {
    width: 20%;
    height: 100px;
    text-align: center;
    cursor: pointer;
}
.popup-record-title>*>*:first-child {
    margin: 10px auto;
    width: 50px;
    height: 50px;
    box-sizing: border-box;
    line-height: 48px;
    font-size: 30px;
    font-family: -apple-system;
    border-radius: 25px;
    color: #e1861b;
    border: 1px solid transparent;
}
.popup-record-title>*.active>*:first-child, .popup-record-title>*:hover>*:first-child {
    border: 1px solid #e1861b;
}

.popup-record-popup-line1 {
    display: flex;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
}
.popup-record-popup-line1>*:first-child>input {
    max-width: 50px;
    border-style: none;
    height: 100%;
    box-sizing: border-box;
    background-color: transparent;
}
.popup-record-popup-line1>*:nth-child(n+2) {
    margin-left: 10px;
}
.popup-record-popup-line1>*:nth-child(n+2)::before {
    content: '|';
    display: block;
    margin-right: 10px;
}
.popup-record-time {

}
.popup-record-remark {
    display: flex;
    align-items: center;
    height: 100%;
    flex-grow: 1;
}
.popup-record-remark>input {
    height: 100%;
    flex-grow: 1;
    padding: 0 10px;
    border-style: none;
}
.popup-record-remark>button {
    height: 24px;
    line-height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}

.popup-record-popup-line2 {
    display: flex;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
}
.popup-record-popup-line2>* {
    width: 25%;
}
.popup-record-popup-line2>*>select {
    width: 100%;
    border-style: none;
    padding: 0 5px;
}
</style>