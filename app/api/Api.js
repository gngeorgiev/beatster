import PlayerApi from './PlayerApi';
import AutocompleteApi from './AutocompleteApi';

class Api {
    constructor(address = 'http://localhost', port = 8085) {
        this.url = `${address}:${port}`;

        this.player = new PlayerApi(this.url);
        this.autocomplete = new AutocompleteApi(this.url);
    }
}

// export default new Api('http://46.101.123.48', 80);
export default new Api();