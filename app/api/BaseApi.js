export default class BaseApi {
    constructor(url) {
        this.url = url;
    }

    _fetch(path, params) {
        const url = `${this.url}/${path}`;
        return fetch(url, params);
    }

    async _fetchJson(path, params) {
        try {
            const res = await this._fetch(path, params);
            return await res.json();
        } catch (e) {
            console.log(e);
        }
    }
}