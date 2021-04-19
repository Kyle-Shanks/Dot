import Node from './Node.js';
import Gain from './Gain.js';
import Oscillator from './Oscillator.js';

const MAX_RATE = 100;

class LFO extends Node {
    constructor(AC) {
        super(AC);
        this.depth = new Gain(this.AC);
        this.osc = new Oscillator(this.AC);

        this.params = {
            rate: this.osc.getParams().frequency,
            depth: this.depth.getParams().gain,
            type: this.osc.getParams().type,
        };

        this.osc.setType('sine');
        this.osc.connect(this.depth);
    }

    start = () => this.osc.start();
    stop = () => this.osc.stop();

    // Getters
    getOutputs = () => [this.depth];
    getParams = () => this.params;

    getRate = () => this.params.rate.value;
    getDepth = () => this.params.depth.value;
    getType = () => this.params.type;

    // Setters
    setRate = (val, time) => this.osc.setFreq(clamp(val, 0, MAX_RATE), time);
    setDepth = (val, time) => this.depth.setGain(val, time);
    setType = type => this.osc.setType(type);
}

export default LFO;
