export default {
    /* 睡眠n毫秒 */
    sleep: ms => {
        return new Promise(function(resolve) {
            setTimeout(resolve, ms);
        })
    }
}