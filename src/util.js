export default {
    sleep: ms => {
        return new Promise(function(resolve) {
            setTimeout(resolve, ms);
        })
    },
    Arrays: {
        groupBy: (array, keyGetter, itemGenerator) => {
            let resultMap = new Map();
            array.forEach(item => {
                let key = keyGetter(item);
                let value = resultMap.get(key);
                if(!value) {
                    value = [];
                    resultMap.set(key, value);
                }
                value.push(item);
            });
            let result = [];
            resultMap.forEach((value, key) => {
                result.push(itemGenerator(key, value));
            });
            return result;
        }
    }
}