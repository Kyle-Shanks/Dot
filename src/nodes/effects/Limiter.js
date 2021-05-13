import DotAudioNode from 'nodes/core/DotAudioNode'
import Compressor from 'nodes/core/Compressor'
import Gain from 'nodes/core/Gain'

const defaultProps = {
    threshold: -6,
    ratio: 20,
    knee: 0,
    attack: 0.003,
    release: 0.01,
    gain: 0.75
}

/**
 * A Limiter effect used to limit the dynamic range of the incoming signal.
 * Built using a Compressor node with more aggressive settings connected to a Gain node.
 *
 * @extends DotAudioNode
 * @param {AudioContext} AC - Audio context
 * @param {Object} opts - Initialization options
 * @param {Number} opts.threshold - Compression threshold in dB (default: -16)
 * @param {Number} opts.ratio - Compression ratio (default: 20)
 * @param {Number} opts.knee - Compression knee value (default: 0)
 * @param {Number} opts.attack - Compression attack time (default: 0.003)
 * @param {Number} opts.release - Compression release time (default: 0.01)
 * @param {Number} opts.gain - Output gain value (default: 0.75)
 * @params
 * threshold - Compressor threshold
 * ratio - Compressor ratio
 * knee - Compressor knee value
 * attack - Compressor attack time
 * release - Compressor release time
 * gain - Gain value of the gain node
 * @returns {Limiter} Limiter Node
 */
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
        this.inputs = [this.limiter]
        this.outputs = [this.gain]

        // Initialize
        const initProps = { ...defaultProps, ...opts }

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
    // Compressor
    /**
     * Get the current knee value.
     * @returns {Number}
     */
    getKnee = () => this.params.knee.value

    /**
     * Get the threshold in dB.
     * @returns {Number}
     */
    getThreshold = () => this.params.threshold.value

    /**
     * Get the compression ratio.
     * @returns {Number}
     */
    getRatio = () => this.params.ratio.value

    /**
     * Get the attack time.
     * @returns {Number}
     */
    getAttack = () => this.params.attack.value

    /**
     * Get the release time.
     * @returns {Number}
     */
    getRelease = () => this.params.release.value

    /**
     * Get the current gain reduction in dB.
     * @returns {Number}
     */
    getReduction = () => this.limiter.reduction

    // Gain
    /**
     * Get the gain value of the output gain.
     * @returns {Number}
     */
    getGain = () => this.params.gain.value

    // - Setters -
    // Compressor
    /**
     * Set the knee value.
     * Calls the setKnee method of the compressor.
     * @param {Number} val - knee value
     * @param {Number} [time] - update time in seconds (optional)
     */
    setKnee = (val, time) => this.limiter.setKnee(val, time)

    /**
     * Set the threshold.
     * Calls the setThreshold method of the compressor.
     * @param {Number} val - threshold
     * @param {Number} [time] - update time in seconds (optional)
     */
    setThreshold = (val, time) => this.limiter.setThreshold(val, time)

    /**
     * Set the compression ratio.
     * Calls the setRatio method of the compressor.
     * @param {Number} val - ratio
     * @param {Number} [time] - update time in seconds (optional)
     */
    setRatio = (val, time) => this.limiter.setRatio(val, time)

    /**
     * Set the attack time.
     * Calls the setAttack method of the compressor.
     * @param {Number} val - attack time
     * @param {Number} [time] - update time in seconds (optional)
     */
    setAttack = (val, time) => this.limiter.setAttack(val, time)

    /**
     * Set the release time.
     * Calls the setRelease method of the compressor.
     * @param {Number} val - release time
     * @param {Number} [time] - update time in seconds (optional)
     */
    setRelease = (val, time) => this.limiter.setRelease(val, time)

    // Gain
    /**
     * Set the gain value of the output.
     * Calls the setGain method of the output gain node.
     * @param {Number} val - gain value
     * @param {Number} [time] - update time in seconds (optional)
     */
    setGain = (val, time) => this.gain.setGain(val, time)
}

export default Limiter
