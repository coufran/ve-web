export default {
    sleep: ms => {
        return new Promise(function(resolve) {
            setTimeout(resolve, ms);
        })
    }
}