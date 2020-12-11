class DataStore {
    constructor() {
        this.dataRepositories = new Map();
    }

    getRepository(name) {
        let repository = this.dataRepositories.get(name);
        if(repository == null) {
            repository = new Repository();
            this.dataRepositories.set(name, repository);
        }
        return repository;
    }

    get(name, key) {
        return this.getRepository(name).get(key);
    }

    set(name, key, value) {
        this.getRepository(name).set(key, value);
    }

}

class Repository {
    constructor() {
        this.data = new Map();
    }

    put(key, value) {
        this.data.set(key, value);
    }

    get(key) {
        return this.data.get(key);
    }
}

const dataStore = new DataStore();
console.log(dataStore);

let repository = dataStore.getRepository("test");
console.log(repository);

let testValue = repository.get("test-key");
console.log(testValue);
repository.put("test-key", "test-value");
testValue = repository.get("test-key");
console.log(testValue);
repository.put("test-key", "test-value2");
testValue = repository.get("test-key");
console.log(testValue);

console.log(dataStore.dataRepositories.test)

// export default dataStore;