<template>
    <Panel id="panel-record">
        <b-button @click="showRecordPopup" variant="outline-danger" id="panel-record-add">记一笔</b-button>
        <!-- 丁字面板 -->
        <div id="panel-record-t" ref="panelRecordT" class="slider">
            <!-- 丁字面板滚动 -->
            <div class="slider-body">
                <PanelRecordTDay v-for="recordsByDayItem in recordsByDay"
                                 :records-by-day-item="recordsByDayItem"
                                 :key="recordsByDayItem.date.format()">
                </PanelRecordTDay>
            </div><!-- 丁字面板滚动 -->
        </div><!-- 丁字面板 -->
        <div id="panel-record-bg"></div>
        <!-- 记一笔弹出层 -->
        <RecordPopup ref="recordPopup" @recordChange="reload"></RecordPopup><!-- 记一笔弹出层 -->
    </Panel>
</template>

<script>
import Panel from './Panel.vue'
import RecordPopup from './RecordPopup.vue'
import PanelRecordTDay from "@/index/components/PanelRecordTDay";

export default {
    name: "PanelRecord",
    components: {
        PanelRecordTDay,
        Panel,
        RecordPopup
    },
    // created: function() {
    //     this.load();
    // },
    mounted: function() {
        this.loadIfNeed();
        this.$refs.panelRecordT.addEventListener("scroll", () => {
            this.emptyDayCount = 0;
            this.loadIfNeed();
        });
    },
    data: function() {
        return {
            recordsByDay: [],
            lastLoadDate: null,
            isLoading: false,
            emptyDayCount: 0,
            recordPopupShow: false
        };
    },
    methods: {
        showRecordPopup: function() {
            this.$refs.recordPopup.show();
        },
        reload: function() {
            console.log("reload");
            this.recordsByDay = [];
            this.lastLoadDate = null;
            this.emptyDayCount = 0;
            setTimeout(() => {
                this.loadIfNeed();
            }, 100);
        },
        loadIfNeed: function() {
            let scrollTop = this.$refs.panelRecordT.scrollTop; // 顶部距离
            let scrollHeight = this.$refs.panelRecordT.scrollHeight; // 内容高度
            let clientHeight = this.$refs.panelRecordT.clientHeight; // 高度
            if(scrollHeight <= clientHeight + scrollTop + 100) {
                this.load(this.loadIfNeed);
            }
        },
        load: function(successCallback) {
            if(this.isLoading) {
                return;
            }
            this.isLoading = true;
            let date;
            if(this.lastLoadDate == null) {
                date = this.moment();
            } else {
                date = this.moment(this.lastLoadDate).subtract(1, "days");
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
                            alert(result.msg);
                            return;
                        }
                        if(result.data.length > 0) {
                            this.recordsByDay.push({
                                date: date,
                                records: result.data,
                                sum: this.sumAmount(result.data)
                            });
                            this.emptyDayCount = 0;
                        } else {
                            this.emptyDayCount++;
                        }
                        this.lastLoadDate = date;
                        this.isLoading = false;
                        if(successCallback && this.emptyDayCount <= 30) {
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
        },
        formatDate: function(date) {
            let thisMonth = this.moment().add(1, "months").date(1);
            // 当月内，只显示日
            if(thisMonth.diff(date, "months") < 1) {
                return date.format("D日");
            }
            let thisYear = this.moment().add(1, "years").month(1).date(1);
            // 当年内，显示月日
            if(thisYear.diff(date, "years") < 1) {
                return date.format("M月D日");
            }
            // 其他，显示年月日
            return date.format("YYYY年M月D日");
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
    box-shadow: none;
    outline: none;
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
</style>