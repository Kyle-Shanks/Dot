import DotAudioNode from 'nodes/core/DotAudioNode'
import StereoPanner from 'nodes/core/StereoPanner'
import LFO from 'nodes/sources/LFO'

const defaultProps = {
    depth: 1,
    rate: 1,
    type: 'sine',
}

/**
 * An Autopan effect used to pan the incoming signal back and forth at an adjustable rate and depth.
 * Composed of an LFO connected to a StereoPanner node.
 *
 * @example
 * const synth = new Dot.Synth(AC)
 * const autoPan = new Dot.AutoPan(AC)
 *
 * Dot.chain(synth, autoPan, AC.destination)
 *
 * @extends DotAudioNode
 * @param {AudioContext} AC - Audio context
 * @param {Object} opts - Initialization options
 * @param {Number} opts.depth - The depth of the pan modulation (default: 1)
 * @param {Number} opts.rate - The rate of the pan modulation (default: 1)
 * @param {Number} opts.type - The type of the LFO (default: 'sine')
 * @params
 * rate - Rate of the LFO connected to the pan
 * depth - Depth of the LFO connected to the pan
 * @returns {AutoPan} AutoPan Node
 */
class AutoPan extends DotAudioNode {
    constructor(AC, opts = {}) {
        super(AC)
        this.name = 'AutoPan'
        this.LFO = new LFO(AC, { start: true })
        this.panner = new StereoPanner(AC)

        this.params = {
            rate: this.LFO.getParam('rate'),
            depth: this.LFO.getParam('depth'),
        }
        this.inputs = [this.panner]
        this.outputs = [this.panner]

        // Initialize
        const initProps = { ...defaultProps, ...opts }

        this.setRate(initProps.rate)
        this.setDepth(initProps.depth)
        this.setType(initProps.type)

        // Connections
        this.LFO.connect(this.panner.getParam('pan'))

        return this
    }

    // - Getters -
    /**
     * Get the depth of the pan modulation.
     * @returns {Number} Modulation depth
     */
    getDepth = () => this.LFO.getDepth()

    /**
     * Get the rate of the pan modulation.
     * @returns {Number} Modulation rate
     */
    getRate = () => this.LFO.getRate()

    /**
     * Get the waveform of the pan modulation.
     * @returns {Number} Modulation waveform
     */
    getType = () => this.LFO.getType()

    // - Setters -
    /**
     * Set the depth of the pan modulation.
     * Calls the setDepth method of the lfo.
     * @param {Number} val - depth
     * @param {Number} [time] - update time in seconds (optional)
     */
    setDepth = (val, time) => this.LFO.setDepth(val, time)

    /**
     * Set the rate of the pan modulation.
     * Calls the setRate method of the lfo.
     * @param {Number} val - rate
     * @param {Number} [time] - update time in seconds (optional)
     */
    setRate = (val, time) => this.LFO.setRate(val, time)

    /**
     * Set the waveform of the pan modulation.
     * Calls the setType method of the lfo.
     * @param {Number} val - lfo type
     */
    setType = (val) => this.LFO.setType(val)
}

export default AutoPan
