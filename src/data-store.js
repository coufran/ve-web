import Vue from './ve-vue'
import Vuex from 'vuex';
import moment from "moment";
import util from "@/util";

// 启用Vuex
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        records: [],
        lastLoadDate: null,
        isLoading: false
    },
    getters: {
        recordsGroupByDay: state => {
            return util.Arrays.groupBy(state.records, record => {
                return record.time;
            }, (key, value) => {
                return {
                    date: moment(key),
                    records: value,
                    sumAmount: (records => {
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
                    })(value)
                }
            });
        }
    },
    mutations: {
        addRecord(state, records) {
            records.forEach(record => {
                state.records.push(record);
            })
        }
    },
    actions: {
        loadRecord(context) {
            if(context.state.isLoading) {
                return;
            }
            context.state.isLoading = true;
            let date;
            if(context.state.lastLoadDate == null) {
                date = moment();
            } else {
                date = moment(context.state.lastLoadDate).subtract(1, "days");
            }
            Vue.prototype.axios
                .get("/record/list", {
                    params: {
                        startTime: moment(date).subtract(60, "days").format("YYYY/MM/DD"),
                        endTime: date.format("YYYY/MM/DD")
                    }
                })
                .then(result => {
                    if(!result.success) {
                        alert(result.msg);
                        return;
                    }
                    context.commit("addRecord", result.data);
                    context.state.lastLoadDate = moment(date).subtract(60, "days");
                    context.state.isLoading = false;
                    // if(successCallback && this.emptyDayCount <= 30) {
                    //     successCallback();
                    // }
                });
        }
    }
});

export default store;