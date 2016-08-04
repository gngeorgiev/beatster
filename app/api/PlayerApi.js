import BaseApi from './BaseApi';

export default class PlayerApi extends BaseApi {
    resolve(id, provider) {
        return this._fetchJson(`player/resolve?id=${id}&provider=${provider}`);
    }

    search(query) {
        return this._fetchJson(`player/search?q=${encodeURI(query)}`);
    }
}