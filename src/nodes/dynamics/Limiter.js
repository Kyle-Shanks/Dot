import DotAudioNode from 'nodes/DotAudioNode'
import { Compressor, Gain } from 'nodes'

const defaultProps = {
    threshold: -6,
    ratio: 20,
    knee: 0,
    attack: 0.003,
    release: 0.01,
    gain: 0.75
}

class Limiter extends DotAudioNode {
    constructor(AC, opts = {}) {
        super(AC)
        this.name = 'Limiter'
        this.limiter = new Compressor(this.AC)
        this.gain = new Gain(this.AC)

        this.params = {
            knee: this.limiter.getParams().knee,
            threshold: this.limiter.getParams().threshold,
            ratio: this.limiter.getParams().ratio,
            attack: this.limiter.getParams().attack,
            release: this.limiter.getParams().release,
            gain: this.gain.getParams().gain
        }

        // Initialize
        const initProps = {
            ...defaultProps,
            ...opts,
        }

        this.setThreshold(initProps.threshold)
        this.setRatio(initProps.ratio)
        this.setKnee(initProps.knee)
        this.setAttack(initProps.attack)
        this.setRelease(initProps.release)
        this.setGain(initProps.gain)

        // Connections
        this.limiter.connect(this.gain)
    }

    // - Getters -
    getInputs = () => [this.limiter]
    getOutputs = () => [this.gain]

    // Compressor
    getKnee = () => this.params.knee.value
    getThreshold = () => this.params.threshold.value
    getRatio = () => this.params.ratio.value
    getAttack = () => this.params.attack.value
    getRelease = () => this.params.release.value
    getReduction = () => this.limiter.reduction
    // Gain
    getGain = () => this.params.gain.value

    // - Setters -
    // Compressor
    setKnee = (val, time) => this.limiter.setKnee(val, time)
    setThreshold = (val, time) => this.limiter.setThreshold(val, time)
    setRatio = (val, time) => this.limiter.setRatio(val, time)
    setAttack = (val, time) => this.limiter.setAttack(val, time)
    setRelease = (val, time) => this.limiter.setRelease(val, time)
    // Gain
    setGain = (val, time) => this.gain.setGain(val, time)
}

export default Limiter
