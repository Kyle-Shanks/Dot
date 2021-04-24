import DotAudioNode from '../DotAudioNode.js'
import { FILTER_TYPE } from '../../util/util.js'

class Filter extends DotAudioNode {
    constructor(AC) {
        super(AC)
        this.name = 'Filter'
        this.filter = this.AC.createBiquadFilter()

        this.params = {
            frequency: this.filter.frequency,
            q: this.filter.q,
            gain: this.filter.gain,
            detune: this.filter.detune,
        }
    }

    // - Getters -
    getInputs = () => [this.filter]
    getOutputs = () => [this.filter]

    getFreq = () => this.params.frequency.value
    getQ = () => this.params.Q.value
    getGain = () => this.params.gain.value
    getDetune = () => this.params.detune.value
    getType = () => this.filter.type

    // - Setters -
    setFreq = (val, time) => this._timeUpdate(this.params.frequency, val, time)
    setQ = (val, time) => this._timeUpdate(this.params.frequency, val, time)
    setGain = (val, time) => this._timeUpdate(this.params.gain, val, time)
    setDetune = (val, time) => this._timeUpdate(this.params.detune, val, time)
    setType = (val) => {
        if (FILTER_TYPE.includes(val)) this.filter.type = val
    }
}

export default Filter
