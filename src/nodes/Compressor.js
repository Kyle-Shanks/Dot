import Node from './Node.js';

class Compressor extends Node {
    constructor(AC) {
        super(AC);
        this.compressor = this.AC.createDynamicsCompressor();

        this.params = {
            knee: this.compressor.knee,
            threshold: this.compressor.threshold,
            ratio: this.compressor.ratio,
            attack: this.compressor.attack,
            release: this.compressor.release,
        };
    }

    // Getters
    getInputs = () => [this.compressor];
    getOutputs = () => [this.compressor];

    getKnee = () => this.params.knee.value;
    getThreshold = () => this.params.threshold.value;
    getRatio = () => this.params.ratio.value;
    getAttack = () => this.params.attack.value;
    getRelease = () => this.params.release.value;

    // Setters
    setKnee = (val, time) => this._timeUpdateFunc(this.params.knee, val, time);
    setThreshold = (val, time) => this._timeUpdateFunc(this.params.threshold, val, time);
    setRatio = (val, time) => this._timeUpdateFunc(this.params.ratio, val, time);
    setAttack = (val, time) => this._timeUpdateFunc(this.params.attack, val, time);
    setRelease = (val, time) => this._timeUpdateFunc(this.params.release, val, time);
}

export default Compressor;
