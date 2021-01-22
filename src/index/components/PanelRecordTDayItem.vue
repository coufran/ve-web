<template>
    <div v-if="record.expend || record.income" class="panel-record-t-item">
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
</template>

<script>
export default {
    name: "PanelRecordTDayItem",
    props: {
        record: Object
    }
}
</script>

<style scoped>

</style>