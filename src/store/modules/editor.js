import * as types from "../mutation-type"
import { StateItem, StateStore, StateValue } from 'ontology-ts-vm';

export class DebugStateStore {
    constructor() {
        this.data = new Map();
    }
    add(prefix, key, value) {
        const k = buildWholeKey(prefix, key);
        this.data.set(k, value);
    }
    getOrAdd(prefix, key, value) {
        const k = buildWholeKey(prefix, key);
        if (this.data.has(k)) {
            return this.data.get(k);
        }
        else {
            this.add(prefix, key, value);
            return value;
        }
    }
    get(prefix, key) {
        const k = buildWholeKey(prefix, key);
        const item = this.data.get(k);
        if (item === undefined) {
            return undefined;
        }
        return {
            prefix,
            key,
            value: item,
            state: 0
        };
    }
    delete(prefix, key) {
        const k = buildWholeKey(prefix, key);
        this.data.delete(k);
    }
    find(prefix, key) {
        try {
            const item = this.get(prefix, key);
            if (item !== undefined) {
                return [item];
            }
            else {
                return [];
            }
        }
        catch (e) {
            return [];
        }
    }
}

function buildWholeKey(prefix, key) {
    const prefixBuffer = new Buffer(1);
    prefixBuffer.writeUInt8(prefix, 0);
    if (prefix == 0x05) {
        key = Buffer.from('0000000000000000000000000000000000000000' + key.toString('hex').substr(40), 'hex');
    }
    return Buffer.concat([prefixBuffer, key]).toString('hex');
}

export default {
    state: {
        OntEditor: {},
        Store: new DebugStateStore()
    },

    mutations: {
        [types.SET_EDITOR](state, payload) {
            state.OntEditor = payload.editor
        }
    }

}
