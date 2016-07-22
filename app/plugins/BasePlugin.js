import cheerio from 'cheerio';

export default class BasePlugin {
    constructor(domain, icon) {
        this.domain = domain;
        this.icon = icon;
    }

    async fetchJson(url) {
        const res = await fetch(url);
        return await res.json();
    }

    async fetchHtml(url) {
        const res = await fetch(url);
        const html = await res.text();
        return cheerio.load(html);
    }

    search(query) {
        throw 'search must be overriden'
    }

    resolve(track) {
        throw 'resolve must be overriden';
    }
}