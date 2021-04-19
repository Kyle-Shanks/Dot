import Node from './Node.js';
import { FILTER_TYPE } from '../util/util.js';

class Filter extends Node {
    constructor(AC) {
        super(AC);
        this.filter = this.AC.createBiquadFilter();

        this.params = {
            frequency: this.filter.frequency,
            q: this.filter.q,
            gain: this.filter.gain,
            detune: this.filter.detune,
            type: this.filter.type,
        };
    }

    // Getters
    getInputs = () => [this.filter];
    getOutputs = () => [this.filter];

    getFreq = () => this.params.frequency.value;
    getQ = () => this.params.Q.value;
    getGain = () => this.params.gain.value;
    getDetune = () => this.params.detune.value;
    getType = () => this.params.type;

    // Setters
    setFreq = (val, time) => this._timeUpdateFunc(this.params.frequency, val, time);
    setQ = (val, time) => this._timeUpdateFunc(this.params.frequency, val, time);
    setGain = (val, time) => this._timeUpdateFunc(this.params.gain, val, time);
    setDetune = (val, time) => this._timeUpdateFunc(this.params.detune, val, time);
    setType = (type) => {
        if (FILTER_TYPE.includes(type)) this.params.type = type;
    }
}

export default Filter;
