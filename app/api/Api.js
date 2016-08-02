import PlayerApi from './PlayerApi';

class Api {
    constructor(address = 'http://localhost', port = 8085) {
        this.url = `${address}:${port}`;

        this.player = new PlayerApi(this);
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
            console.error(e);
        }
    }
}

export default new Api('http://46.101.123.48', 80);
// export default new Api();