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
    mounted: function() {
        this.loadIfNeed();
        this.$refs.panelRecordT.addEventListener("scroll", () => {
            this.loadIfNeed();
        });
    },
    data: function() {
        return {
            recordPopupShow: false
        };
    },
    computed: {
        recordsByDay() {
            return this.$store.getters.recordsGroupByDay;
        }
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
            console.log(successCallback);
            this.$store.dispatch("loadRecord");
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