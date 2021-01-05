<template>
    <Popup class="popup" :active="active">
        <header class="popup-header">
            <div><b-icon-chevron-left></b-icon-chevron-left></div>
            <div>日常账本</div>
        </header>
        <div class="popup-content">
            <div class="popup-record-tab">
                <b-button class="active" variant="link">支出</b-button>
                <b-button variant="link">收入</b-button>
                <b-button variant="link">转账</b-button>
            </div>
            <div class="popup-record-amount">
                <div>工资</div>
                <input v-model="amount" type="text" placeholder="0.00" />
            </div>
            <div class="popup-record-title">
                <div>
                    <div><b-icon icon="cash"></b-icon></div>
                    <div>工资</div>
                </div>
                <div>工资</div>
                <div>工资</div>
                <div>工资</div>
                <div>工资</div>
                <div>工资</div>
            </div>
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
        props: {
            active: Boolean
        },
        data: function() {
            return {
                amount: null
            };
        },
        watch: {
            amount: function(newValue, oldValue) {
                if(!/^[0-9]{0,8}(\.[0-9]{0,2})?$/.test(newValue)) {
                    this.amount = oldValue;
                }
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
}
.popup-record-tab>*.active {
    border-radius: 0;
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
    border: 1px solid gray;
    text-align: center;
    cursor: pointer;
}
.popup-record-title>*>*:first-child {
    margin: 8px auto;
    width: 50px;
    height: 50px;
    line-height: 50px;
    font-size: 25px;
    border-radius: 25px;
    border: 1px solid #e1861b;
    color: #e1861b;
}
</style>