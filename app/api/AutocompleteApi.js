import BaseApi from './BaseApi';

export default class AutocompleteApi extends BaseApi {
    complete(text) {
        return this._fetchJson(`autocomplete/complete?q=${text}`);
    }
}