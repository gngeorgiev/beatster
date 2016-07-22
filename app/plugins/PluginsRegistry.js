import YouTubePlugin from './YouTubePlugin';

class PluginsRegistry {
    constructor(plugins){
        this.plugins = plugins;
    }

    getPlugins() {
        return this.plugins;
    }
}

export default new PluginsRegistry([
    new YouTubePlugin()
]);