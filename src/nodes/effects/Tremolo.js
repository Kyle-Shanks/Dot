import DotAudioNode from 'nodes/core/DotAudioNode'
import Gain from 'nodes/core/Gain'
import LFO from 'nodes/sources/LFO'

const defaultProps = {
    depth: 1,
    rate: 1,
    type: 'sine',
}

/**
 * An Tremolo effect used to modulate the gain of the incoming signal at an adjustable rate and depth.
 * Composed of an LFO connected to a Gain node.
 *
 * @example
 * const synth = new Dot.Synth(AC)
 * const tremolo = new Dot.Tremolo(AC)
 *
 * Dot.chain(synth, tremolo, AC.destination)
 *
 * @extends DotAudioNode
 * @param {AudioContext} AC - Audio context
 * @param {Object} opts - Initialization options
 * @param {Number} opts.depth - The depth of the gain modulation (default: 1)
 * @param {Number} opts.rate - The rate of the gain modulation (default: 1)
 * @param {Number} opts.type - The type of the LFO (default: 'sine')
 * @params
 * rate - Rate of the LFO connected to the gain
 * depth - Depth of the LFO connected to the gain
 * @returns {Tremolo} Tremolo Node
 */
class Tremolo extends DotAudioNode {
    constructor(AC, opts = {}) {
        super(AC)
        this.name = 'Tremolo'
        this.LFO = new LFO(AC, { start: true })
        this.gain = new Gain(AC, { gain: 0 })

        this.params = {
            rate: this.LFO.getParam('rate'),
            depth: this.LFO.getParam('depth'),
        }
        this.inputs = [this.gain]
        this.outputs = [this.gain]

        // Initialize
        const initProps = { ...defaultProps, ...opts }

        this.setRate(initProps.rate)
        this.setDepth(initProps.depth)
        this.setType(initProps.type)

        // Connections
        this.LFO.connect(this.gain.getParam('gain'))

        return this
    }

    // - Getters -
    /**
     * Get the depth of the gain modulation.
     * @returns {Number} Modulation depth
     */
    getDepth = () => this.LFO.getDepth()

    /**
     * Get the rate of the gain modulation.
     * @returns {Number} Modulation rate
     */
    getRate = () => this.LFO.getRate()

    /**
     * Get the waveform of the gain modulation.
     * @returns {Number} Modulation waveform
     */
    getType = () => this.LFO.getType()

    // - Setters -
    /**
     * Set the depth of the gain modulation.
     * Calls the setDepth method of the lfo.
     * @param {Number} val - depth
     * @param {Number} [time] - update time in seconds (optional)
     */
    setDepth = (val, time) => this.LFO.setDepth(val, time)

    /**
     * Set the rate of the gain modulation.
     * Calls the setRate method of the lfo.
     * @param {Number} val - rate
     * @param {Number} [time] - update time in seconds (optional)
     */
    setRate = (val, time) => this.LFO.setRate(val, time)

    /**
     * Set the waveform of the gain modulation.
     * Calls the setType method of the lfo.
     * @param {Number} val - lfo type
     */
    setType = (val) => this.LFO.setType(val)
}

export default Tremolo
