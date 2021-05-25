import DotAudioNode from 'nodes/core/DotAudioNode'
import Gain from 'nodes/core/Gain'
import WaveShaper from 'nodes/core/WaveShaper'

const defaultProps = {
    amount: 0,
    distortion: 0,
}

const createDistCurve = (gain = 0) => {
    const sampleNum = 44100
    const curve = new Float32Array(sampleNum)

    return curve.map((_, i) => {
        const x = i * 2 / sampleNum - 1
        return (3 + gain) * Math.atan(Math.sinh(x * 0.25) * 5) / (Math.PI + gain * Math.abs(x))
    })
}

/**
 * A Distortion effect used to clip/distort the incoming signal.
 *
 * @example
 * const synth = new Dot.Synth(AC)
 * const distortion = new Dot.Distortion(AC, { distortion: 10, amount: 0.1 })
 *
 * Dot.chain(synth, distortion, AC.destination)
 *
 * @extends DotAudioNode
 * @param {AudioContext} AC - Audio context
 * @param {Object} opts - Initialization options
 * @param {Number} opts.amount - The dry/wet amount for the node (default: 0)
 * @param {Number} opts.distortion - The distortion amount to generate the waveshaping curve (default: 0)
 * @returns {Distortion} Distortion Node
 */
class Distortion extends DotAudioNode {
    constructor(AC, opts = {}) {
        super(AC)
        this.name = 'Distortion'
        this.dryGain = new Gain(this.AC)
        this.waveShaper = new WaveShaper(this.AC)
        this.wetGain = new Gain(this.AC)

        this.distortion = 0
        this.params = {}
        this.inputs = [this.dryGain, this.waveShaper]
        this.outputs = [this.dryGain, this.wetGain]

        // Initialize
        const initProps = { ...defaultProps, ...opts }

        this.setAmount(initProps.amount)
        this.setDistortion(initProps.distortion)

        // Connections
        this.waveShaper.connect(this.wetGain)

        return this
    }

    // - Getters -
    /**
     * Get the dry/wet amount level of the node.
     * @returns {Number} Dry/wet amount
     */
    getAmount = () => this.wetGain.getGain()

    /**
     * Get the distortion value of the node.
     * @returns {Number} Distortion value
     */
    getDistortion = () => this.distortion

    // - Setters -
    /**
     * Set the dry/wet amount of the node.
     * Uses linearFadeUpdate method to evenly fade and to allow for changes over time.
     * @param {Number} val - Dry/set amount
     * @param {Number} [time] - update time in seconds (optional)
     */
    setAmount = (val, time) => {
        this._linearFadeUpdate(
            this.dryGain.getParams().gain,
            this.wetGain.getParams().gain,
            val,
            time,
        )
    }

    /**
     * Set the distortion value of the node.
     * @param {Number} val - Distortion value
     */
    setDistortion = (val) => {
        this.waveShaper.setCurve(createDistCurve(val))
        this.distortion = val
    }
}

export default Distortion
