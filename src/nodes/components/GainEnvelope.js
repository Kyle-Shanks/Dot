import Envelope from 'nodes/components/Envelope'
import Gain from 'nodes/core/Gain.js'

const defaultProps = {
    gain: 0,
}

/**
 * An envelope connected to a gain node.
 * Can be used to modulate the gain of the incoming signal over time.
 *
 * @example
 * const gainEnv = new Dot.GainEnvelope(AC, { decay: 0.4, sustain: 0 })
 * const osc = new Dot.Osc(AC)
 *
 * Dot.chain(osc, gainEnv, AC.destination)
 *
 * gainEnv.triggerAttack()
 *
 * @extends Envelope
 * @param {AudioContext} AC - Audio context
 * @param {Object} opts - Initialization options
 * @param {Number} opts.gain - The base gain of the gain node (default: 0)
 * @params
 * gain - Gain of the gain node
 * @returns {GainEnvelope} GainEnvelope Node
 */
class GainEnvelope extends Envelope {
    constructor(AC, opts = {}) {
        super(AC, opts)
        this.name = 'GainEnvelope'
        this.gain = new Gain(this.AC)

        this.params = {
            gain: this.gain.getParams().gain
        }
        this.inputs = [this.gain]
        this.outputs = [this.gain]

        // Initialize
        const initProps = { ...defaultProps, ...opts }

        this.setGain(initProps.gain)

        // Connections
        this.source.connect(this.gain.getParams().gain)

        return this
    }

    // - Getters -
    /**
     * Get the base gain value on the gain node.
     * @returns {Number} Gain value
     */
    getGain = () => this.params.gain.value

    // - Setters -
    /**
     * Set the base gain value of the gain node.
     * Calls the setGain method on the gain node.
     * @param {Number} val - gain value
     * @param {Number} [time] - update time in seconds (optional)
     */
    setGain = (val, time) => this.gain.setGain(val, time)
}

export default GainEnvelope
