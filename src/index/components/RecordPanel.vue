<template>
    <Panel id="panel-record">
        <b-button variant="outline-danger" id="panel-record-add">记一笔</b-button>
        <!-- 丁字面板 -->
        <div id="panel-record-t" ref="panelRecordT" class="slider">
            <!-- 丁字面板滚动 -->
            <div class="slider-body">
                <template v-for="recordsByDayItem in recordsByDay">
                    <div class="panel-record-t-title" :key="recordsByDayItem.date.format()">
                        <div class="panel-record-t-left">{{recordsByDayItem.date.format("D日")}}</div>
                        <div class="panel-record-t-middle"><span></span></div>
                        <div class="panel-record-t-right">{{numeral(recordsByDayItem.sum/100).format("0.00")}}</div>
                    </div>
                    <!-- 收支记录 -->
                    <template v-for="record in recordsByDayItem.records">
                        <div v-if="record.expend || record.income" :key="record.id" class="panel-record-t-item">
                            <div class="panel-record-t-left">
                                <div v-if="record.expend">{{ record.debit.name }} {{ numeral(record.amount/100).format("0.00") }}</div>
                                <div v-if="record.expend" class="panel-record-t-remark">{{ record.remark }}</div>
                            </div>
                            <div class="panel-record-t-middle"><b-icon icon="credit-card"></b-icon></div>
                            <div class="panel-record-t-right">
                                <div v-if="record.income">{{ record.credit.name }} {{ numeral(record.amount/100).format("0.00") }}</div>
                                <div v-if="record.income" class="panel-record-t-remark">{{ record.remark }}</div>
                            </div>
                        </div>
                    </template><!-- 收支记录 -->
                </template>
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
        // created: function() {
        //     this.load();
        // },
        mounted: function() {
            this.loadIfNeed();
            this.$refs.panelRecordT.addEventListener("scroll", () => {
              this.loadIfNeed();
            });
        },
        data: function() {
            return {
                recordsByDay: [],
                lastLoadDate: null
            };
        },
        methods: {
            loadIfNeed: function() {
                let scrollTop = this.$refs.panelRecordT.scrollTop; // 顶部距离
                let scrollHeight = this.$refs.panelRecordT.scrollHeight; // 内容高度
                let clientHeight = this.$refs.panelRecordT.clientHeight; // 高度
                console.info(scrollTop);
                console.info(scrollHeight);
                console.info(clientHeight);
                if(scrollHeight <= clientHeight + scrollTop) {
                    // this.load(this.loadIfNeed);
                }
            },
            load: function(successCallback) {
                let date;
                if(this.lastLoadDate == null) {
                    date = this.moment();
                } else {
                    date = this.lastLoadDate.subtract(1, "days");
                }
                this.axios
                    .get("/record/list", {
                        params: {
                            startTime: date.format("YYYY/MM/DD"),
                            endTime: date.format("YYYY/MM/DD")
                        }
                    })
                    .then(result => {
                        if(!result.success) {
                            alert(result.msg)
                            return;
                        }
                        this.recordsByDay.push({
                            date: date,
                            records: result.data,
                            sum: this.sumAmount(result.data)
                        });
                        this.lastLoadDate = date;
                        if(successCallback) {
                            successCallback();
                        }
                    });
            },
            sumAmount: function(records) {
                let sum = 0;
                for(let i=0; i<records.length; i++) {
                    let record = records[i];
                    if(record.income) {
                        sum += record.amount;
                    } else if(record.expend) {
                        sum -= record.amount;
                    }
                }
                return sum;
            }
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