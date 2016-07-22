import BasePlugin from './BasePlugin';
import {find} from 'lodash';
import ytdl from 'ytdl-core';

export default class YouTubePlugin extends BasePlugin {
    constructor() {
        super('youtube.com', '');
    }

    _getSearchUrl(query) {
        return `https://www.youtube.com/results?q=${escape(query)}&sp=EgIQAQ%253D%253D`;
    }

    async search(query) {
        const searchUrl = this._getSearchUrl(query);
        const $ = await super.fetchHtml(searchUrl);
        //TODO: do we need to search more than the first page?
        const results = $('.yt-lockup-video').map((i, el) => {
            const icon = this.icon;
            const $video = $(el);

            const $title = $video.find('a.yt-uix-tile-link');
            const title = $title.text();
            const url = `https://${this.domain}${$title.attr('href')}`;

            const id = url.split('v=')[1];
            const thumbnail = `https://i.ytimg.com/vi/${id}/hqdefault.jpg?custom=true&w=320&h=180&stc=true&jpg444=true&jpgq=90`;

            const $length = $video.find('.video-time');
            const length = $length.text();

            return {
                title, url, thumbnail, length, icon, id,
                source: 'YouTube'
            };
        }).toArray();

        return results;
    }

    async resolve(track) {
        const {url} = track;

        return new Promise((resolve, reject) => {
            ytdl.getInfo(url, (err, info) => {
                if (err) {
                    return reject(err);
                }

                try {
                    const format = find(info.formats, format => format.container === 'mp4' && !format.resolution && format.type.includes('audio/'));
                    const {url} = format;

                    return resolve(Object.assign({}, track, {
                        streamUrl: url
                    }));
                } catch (e) {
                    return reject(e);
                }
            });
        });
    }
}