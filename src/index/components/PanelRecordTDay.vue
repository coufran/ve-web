<template>
    <template>
        <div class="panel-record-t-title" :key="recordsByDayItem.date.format()">
            <div class="panel-record-t-left">{{formatDate(recordsByDayItem.date)}}</div>
            <div class="panel-record-t-middle"><span></span></div>
            <div class="panel-record-t-right">{{numeral(recordsByDayItem.sum/100).format("0.00")}}</div>
        </div>
        <!-- 收支记录 -->
        <PanelRecordTDayItem v-for="record in recordsByDayItem.records"
                             :record="record" :key="record.id"></PanelRecordTDayItem><!-- 收支记录 -->
    </template>
</template>

<script>
import PanelRecordTDayItem from "@/index/components/PanelRecordTDayItem";

export default {
    name: "PanelRecordTDay",
    comments: {
        PanelRecordTDayItem
    },
    props: {
        recordsByDayItem: Object
    }
}
</script>

<style scoped>

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