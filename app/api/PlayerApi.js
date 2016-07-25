export default class PlayerApi {
    constructor(api) {
        this.api = api;
    }

    resolve(id, provider) {
        return this.api._fetchJson(`player/resolve?id=${id}&provider=${provider}`);
    }

    search(query) {
        return this.api._fetchJson(`player/search?q=${encodeURI(query)}`);
    }
}