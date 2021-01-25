<template>
    <div>
        <div class="panel-record-t-title">
            <div class="panel-record-t-left">{{formatDate(recordsByDayItem.date)}}</div>
            <div class="panel-record-t-middle"><span></span></div>
            <div class="panel-record-t-right">{{numeral(recordsByDayItem.sumAmount/100).format("0.00")}}</div>
        </div>
        <!-- 收支记录 -->
        <PanelRecordTDayItem v-for="record in recordsByDayItem.records"
                             :record="record" :key="record.id"></PanelRecordTDayItem><!-- 收支记录 -->
    </div>
</template>

<script>
import PanelRecordTDayItem from "@/index/components/PanelRecordTDayItem";

export default {
    name: "PanelRecordTDay",
    components: {
        PanelRecordTDayItem
    },
    props: {
        recordsByDayItem: Object
    },
    methods: {
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