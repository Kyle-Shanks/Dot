import DotAudioNode from 'nodes/core/DotAudioNode'
import { WAVEFORM } from 'src/util/constants'

const defaultProps = {
    type: 'sine',
    frequency: 440,
    detune: 0,
    start: false,
}

/**
 * A source node that outputs signal of different waveforms and frequencies.
 * Wrapper class for the native Oscillator audio node.
 *
 * For more information, refer to the web audio api documentation.
 * (https://developer.mozilla.org/en-US/docs/Web/API/Oscillator)
 *
 * @example
 * const oscillator = new Dot.Oscillator(AC, { type: 'triangle' })
 *
 * @extends DotAudioNode
 * @param {AudioContext} AC - Audio context
 * @param {Object} opts - Initialization options
 * @param {String} opts.type - The waveform of the oscillator (default: 'sine')
 * @param {Number} opts.frequency - The frequency of the oscillator in Hz (default: 440)
 * @param {Number} opts.detune - The detune of the oscillator in cents. [100 cents/semitone, 1200 cents/octave] (default: 0)
 * @param {Boolean} opts.start - Property to autostart the source node (default: false)
 * @params
 * frequency - Frequency of the oscillator
 * detune - Detune value of the oscillator
 * @returns {Oscillator} Oscillator Node
 */
class Oscillator extends DotAudioNode {
    constructor(AC, opts = {}) {
        super(AC)
        this.name = 'Oscillator'
        this.osc = this.AC.createOscillator()

        this.params = {
            frequency: this.osc.frequency,
            detune: this.osc.detune,
        }
        this.inputs = null
        this.outputs = [this.osc]

        // Initialize
        const initProps = { ...defaultProps, ...opts }

        this.setType(initProps.type)
        this.setFrequency(initProps.frequency)
        this.setDetune(initProps.detune)

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
     * Get the oscillator frequency
     * @returns {Number} Frequency
     */
    getFrequency = () => this.params.frequency.value

    /**
     * Get the detune of the oscillator
     * @returns {Number} Oscillator detune
     */
    getDetune = () => this.params.detune.value

    /**
     * Get the waveform of the oscillator (Alias for getType)
     * @returns {String} Oscillator waveform
     */
    getWaveform = () => this.getType()

    /**
     * Get the waveform of the oscillator
     * @returns {String} Oscillator waveform
     */
    getType = () => this.osc.type

    // - Setters -
    /**
     * Set the frequency of the oscillator
     * Uses timeUpdate method to allow for changes over time
     *
     * @param {Number} val - Frequency
     * @param {Number} [time] - update time in seconds (optional)
     */
    setFrequency = (val, time) => this._timeUpdate(this.params.frequency, val, time)

    /**
     * Set the detune of the oscillator
     * Uses timeUpdate method to allow for changes over time
     *
     * @param {Number} val - Detune
     * @param {Number} [time] - update time in seconds (optional)
     */
    setDetune = (val, time) => this._timeUpdate(this.params.detune, val, time)

    /**
     * Set the waveform of the oscillator (Alias for setType)
     * @param {String} val - Waveform
     */
    setWaveform = (val) => this.setType(val)

    /**
     * Set the waveform of the oscillator
     * @param {String} val - Waveform
     */
    setType = (val) => {
        if (WAVEFORM.includes(val)) this.osc.type = val
    }
}

export default Oscillator
