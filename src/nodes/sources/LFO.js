import DotAudioNode from 'nodes/DotAudioNode'
import Gain from 'nodes/core/Gain'
import Oscillator from 'nodes/sources/Oscillator'
import { clamp } from 'src/util/util'

const MAX_RATE = 100
const defaultProps = {
    rate: 1,
    depth: 1,
    detune: 0,
    type: 'sine',
    start: false,
}

class LFO extends DotAudioNode {
    constructor(AC, opts = {}) {
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
        this.inputs = null
        this.outputs = [this.depth]

        // Initialize
        const initProps = { ...defaultProps, ...opts }

        this.setRate(initProps.rate)
        this.setDepth(initProps.depth)
        this.setDetune(initProps.detune)
        this.setType(initProps.type)

        // Connections
        this.osc.connect(this.depth)
        if (initProps.start) this.start()
    }

    start = () => this.osc.start()
    stop = () => this.osc.stop()

    // - Getters -
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
