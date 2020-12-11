<template>
    <Panel id="panel-record">
        <b-button variant="outline-danger" id="panel-record-add">记一笔</b-button>
        <!-- 丁字面板 -->
        <div id="panel-record-t" class="slider">
            <!-- 丁字面板滚动 -->
            <div class="slider-body">
                <div class="panel-record-t-title">
                    <div class="panel-record-t-left">{{moment().format("D日")}}</div>
                    <div class="panel-record-t-middle"><span></span></div>
                    <div class="panel-record-t-right">0.00</div>
                </div>
                <!-- 收支记录 -->
                <div v-for="(record, index) in records" :key="index" class="panel-record-t-item">
                    <div class="panel-record-t-left">
                        <div>工资 {{ numeral(record.amount).format("0.00") }}</div>
                        <div class="panel-record-t-remark">10月工资{{dataStore.repositories.test.test-key}}</div>
                    </div>
                    <div class="panel-record-t-middle"><b-icon icon="credit-card"></b-icon></div>
                    <div class="panel-record-t-right">
                        <div>房租 100.00</div>
                        <div class="panel-record-t-remark">10月房租</div>
                    </div>
                </div><!-- 收支记录 -->
            </div><!-- 丁字面板滚动 -->
        </div><!-- 丁字面板 -->
        <div id="panel-record-bg"></div>
    </Panel>
</template>

<script>
    import Panel from './Panel.vue'

    export default {
        name: "RecordPanel",
        components: {
            Panel
        },
        created: function() {
            this.axios
                .get("/record/list", {
                    params: {
                        startTime: this.moment().format("YYYY/MM/DD")
                    }
                })
                .then(result => {
                    if(!result.success) {
                        alert(result.msg)
                        return;
                    }
                    let records = result.data;
                    this.records = records;
                })
        },
        computed: function() {

        },
        data: function() {
            return {
                records: []
            };
        }
    }
</script>

<style>
    #panel-record {
        display: flex;
        flex-direction: column;
        position: relative;
        align-items: center;
    }
    #panel-record>* {
        z-index: 1;
    }
    #panel-record::before {
        content: '';
        position: absolute;
        background-color: rgb(235,235,235);
        display: block;
        width: 2px;
        height: 100%;
        z-index: 0;
    }
    #panel-record-add {
        margin-top: 20px;
        height: 100px;
        width: 100px;
        border-radius: 50px;
        background-color: #f2f2f2;
        color: #ee504f;
        border-color: #ee504f;
    }
    #panel-record-t {
        flex-grow: 1;
        width: 100%;
        height: 0;
    }

    .slider {
        overflow-y: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }
    .slider::-webkit-scrollbar {
        display: none;
    }
    .slider-body {

    }

    .panel-record-t-item, .panel-record-t-title {
        display: flex;
        margin-top: 20px;
        /*background-color: lightgreen;*/
        font-size: 16px;
        line-height: 24px;
    }
    .panel-record-t-left, .panel-record-t-right {
        flex-grow: 1;
        width: 0;
    }
    .panel-record-t-left {
        text-align: right;
    }
    .panel-record-t-item .panel-record-t-middle {
        width: 24px;
        height: 24px;
        margin: 0 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 12px;
        text-align: center;
        background-color: rgb(242,242,242);
        color: var(--orange);
        border: 1px solid var(--orange);
    }
    .panel-record-t-item .panel-record-t-remark {
        color: var(--gray);
        font-size: 12px;
    }

    .panel-record-t-title .panel-record-t-left, .panel-record-t-title .panel-record-t-right {
        color: var(--gray);
        font-size: 12px;
    }
    .panel-record-t-title .panel-record-t-middle {
        margin: 0 10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .panel-record-t-title .panel-record-t-middle>* {
        display: block;
        width: 6px;
        height: 6px;
        border-radius: 3px;
        background-color: var(--gray);
    }

</style>