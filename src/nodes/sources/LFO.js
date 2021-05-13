import DotAudioNode from 'nodes/core/DotAudioNode'
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

/**
 * A source node that outputs low frequency oscillations for updating audio params.
 * Consists of an oscilator connected to a gain node.
 *
 * @extends DotAudioNode
 * @param {AudioContext} AC - Audio context
 * @param {Object} opts - Initialization options
 * @param {AudioBuffer} opts.rate - Initial lfo rate
 * @param {AudioBuffer} opts.depth - Initial depth value
 * @param {AudioBuffer} opts.detune - Initial detune value
 * @param {AudioBuffer} opts.type - Initial waveform
 * @param {Boolean} opts.start - Property to autostart the source node
 * @params
 * rate - Frequency of the oscillator
 * depth - Gain of the gain node
 * detune - Detune value of the oscillator
 * @returns {LFO} LFO Node
 */
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

    /**
     * Starts the oscillator
     */
    start = () => this.osc.start()

    /**
     * Stops the oscillator
     */
    stop = () => this.osc.stop()

    // - Getters -
    /**
     * Get the rate of the LFO
     * @returns {Number} LFO Rate
     */
    getRate = () => this.params.rate.value

    /**
     * Get the detune of the LFO
     * @returns {Number} Detune
     */
    getDetune = () => this.params.detune.value

    /**
     * Get the depth of the LFO
     * @returns {Number} Depth
     */
    getDepth = () => this.params.depth.value

    /**
     * Get the waveform of the LFO
     * @returns {String} Waveform
     */
    getType = () => this.osc.getType()

    // - Setters -
    /**
     * Set the rate of the lfo.
     * Calls the setFrequency method on the oscillator.
     * Frequency max is set to 100Hz.
     * @param {Number} val - rate
     * @param {Number} [time] - update time in seconds (optional)
     */
    setRate = (val, time) => this.osc.setFrequency(clamp(val, 0, MAX_RATE), time)

    /**
     * Set the detune of the lfo.
     * Calls the setDetune method on the oscillator.
     * @param {Number} val - detune
     * @param {Number} [time] - update time in seconds (optional)
     */
    setDetune = (val, time) => this.osc.setDetune(val, time)

    /**
     * Set the depth of the lfo.
     * Calls the setGain method on the gain node.
     * @param {Number} val - depth
     * @param {Number} [time] - update time in seconds (optional)
     */
    setDepth = (val, time) => this.depth.setGain(val, time)

    /**
     * Set the waveform of the lfo.
     * Calls the setType method on the oscillator.
     * @param {String} val - Waveform
     */
    setType = (val) => this.osc.setType(val)
}

export default LFO
