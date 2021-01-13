<template>
    <Popup class="popup" :active="active">
        <header class="popup-header">
            <div><b-icon-chevron-left></b-icon-chevron-left></div>
            <div>日常账本</div>
        </header>
        <div class="popup-content">
            <!-- tab选择 -->
            <div class="popup-record-tab">
                <b-button class="active" variant="link">支出</b-button>
                <b-button variant="link">收入</b-button>
                <b-button variant="link">转账</b-button>
            </div><!-- tab选择 -->
            <!-- 金额输入 -->
            <div class="popup-record-amount">
                <div>工资</div>
                <input v-model="amount" type="text" placeholder="0.00" />
            </div><!-- 金额输入 -->
            <!-- 科目选择 -->
            <div class="popup-record-title">
                <div class="active">
                    <div><b-icon icon="cash"></b-icon></div>
                    <div>工资</div>
                </div>
                <div>
                    <div><b-icon icon="cash"></b-icon></div>
                    <div>工资</div>
                </div>
                <div>
                    <div><b-icon icon="cash"></b-icon></div>
                    <div>工资</div>
                </div>
                <div>
                    <div><b-icon icon="cash"></b-icon></div>
                    <div>工资</div>
                </div>
                <div>
                    <div><b-icon icon="cash"></b-icon></div>
                    <div>工资</div>
                </div>
                <div>
                    <div><b-icon icon="cash"></b-icon></div>
                    <div>工资</div>
                </div>
            </div><!-- 科目选择 -->
            <!-- 底部弹出框 -->
            <Popup class="popup-record-popup" :active="true && active" :height="'auto'">
                <div class="popup-record-popup-line1">
                    <div class="popup-record-time"><b-icon icon="calendar3"></b-icon> 01.06</div>
                    <div class="popup-record-remark">
                        <b-icon icon="pencil-square"></b-icon>
                        <input type="text" placeholder="写点啥备注下"/>
                        <b-button>OK</b-button>
                    </div>
                </div>
                <div class="popup-record-popup-line2">
                    <div>
                        <select>
                            <option>啊啊啊</option>
                        </select>
                    </div>
                    <div>
                        <select>
                            <option>啊啊啊</option>
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