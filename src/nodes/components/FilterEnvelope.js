import Envelope from 'nodes/components/Envelope'
import Filter from 'nodes/core/Filter'

const defaultProps = {
    frequency: 2000,
    q: 0,
    detune: 0,
    gain: 0,
    type: 'lowpass',
}

/**
 * An envelope connected to a filter node.
 * Can be used to modulate the sound and tone of the incoming signal over time.
 *
 * @extends Envelope
 * @param {AudioContext} AC - Audio context
 * @param {Object} opts - Initialization options
 * @param {Number} opts.frequency - Initial frequency of the filter in Hz
 * @param {Number} opts.q - Initial q factor of the filter
 * @param {Number} opts.detune - Initial detune of the filter
 * @param {Number} opts.gain - Initial gain value of the filter
 * @param {Number} opts.type - Initial fitler type
 * @params
 * frequency - Frequency of the filter node
 * q - Q factor of the filter node
 * detune - Detune of the filter node
 * gain - Gain of the filter node
 * @returns {FilterEnvelope} FilterEnvelope Node
 */
class FilterEnvelope extends Envelope {
    constructor(AC, opts = {}) {
        super(AC, opts)
        this.name = 'FilterEnvelope'
        this.filter = new Filter(this.AC)

        this.params = {
            frequency: this.filter.getParams().frequency,
            detune: this.filter.getParams().detune,
            q: this.filter.getParams().q,
            gain: this.filter.getParams().gain,
        }
        this.inputs = [this.filter]
        this.outputs = [this.filter]

        // Initialize
        const initProps = { ...defaultProps, ...opts }

        this.setFrequency(initProps.frequency)
        this.setQ(initProps.q)
        this.setDetune(initProps.detune)
        this.setGain(initProps.gain)
        this.setType(initProps.type)

        // Connections
        this.source.connect(this.filter.getParams().frequency)
    }

    // - Getters -
    /**
     * Get the cutoff frequency of the filter node.
     * @returns {Number} Frequency value
     */
    getFrequency = () => this.params.frequency.value

    /**
     * Get the q factor of the filter node.
     * @returns {Number} Q factor value
     */
    getQ = () => this.params.q.value

    /**
     * Get the detune value of the filter node.
     * @returns {Number} Detune value
     */
    getDetune = () => this.params.detune.value

    /**
     * Get the gain value of the filter node.
     * @returns {Number} Gain value
     */
    getGain = () => this.params.gain.value

    /**
     * Get the filter node's type.
     * @returns {String} Filter tpye
     */
    getType = () => this.filter.getType()

    // - Setters -
    /**
     * Set the cutoff frequency of the filter node.
     * Calls the setFrequency method on the filter.
     * @param {Number} val - frequency value
     * @param {Number} [time] - update time in seconds (optional)
     * @returns
     */
    setFrequency = (val, time) => this.filter.setFrequency(val, time)

    /**
     * Set the q factor value of the filter node.
     * Calls the setQ method on the filter.
     * @param {Number} val - q factor value
     * @param {Number} [time] - update time in seconds (optional)
     * @returns
     */
    setQ = (val, time) => this.filter.setQ(val, time)

    /**
     * Set the detune value of the filter node.
     * Calls the setDetune method on the filter.
     * @param {Number} val - detune value
     * @param {Number} [time] - update time in seconds (optional)
     * @returns
     */
    setDetune = (val, time) => this.filter.setDetune(val, time)

    /**
     * Set the gain value of the filter node.
     * Calls the setGain method on the filter.
     * @param {Number} val - gain value
     * @param {Number} [time] - update time in seconds (optional)
     * @returns
     */
    setGain = (val, time) => this.filter.setGain(val, time)

    /**
     * Set the filter node's type.
     * @param {String} val - filter type
     * @returns
     */
    setType = (val) => this.filter.setType(val)
}

export default FilterEnvelope
