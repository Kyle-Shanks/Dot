import DotAudioNode from '../DotAudioNode.js'
import Gain from '../core/Gain.js'
import Oscillator from './Oscillator.js'
import { clamp } from '../../util/util.js'

const MAX_RATE = 100

class LFO extends DotAudioNode {
    constructor(AC) {
        super(AC)
        this.name = 'LFO'
        this.depth = new Gain(this.AC)
        this.osc = new Oscillator(this.AC)

        this.params = {
            rate: this.osc.getParams().frequency,
            detune: this.osc.getParams().detune,
            depth: this.depth.getParams().gain,
            type: this.osc.getParams().type,
        }

        // Initialize
        this.osc.connect(this.depth)
    }

    start = () => this.osc.start()
    stop = () => this.osc.stop()

    // - Getters -
    getOutputs = () => [this.depth]

    getRate = () => this.params.rate.value
    getDetune = () => this.params.detune.value
    getDepth = () => this.params.depth.value
    getType = () => this.params.type

    // - Setters -
    setRate = (val, time) => this.osc.setFrequency(clamp(val, 0, MAX_RATE), time)
    setDetune = (val, time) => this.osc.setDetune(val, time)
    setDepth = (val, time) => this.depth.setGain(val, time)
    setType = (val) => {
        this.osc.setType(val)
        this.params.type = val
    }
}

export default LFO
