import DotAudioNode from 'nodes/core/DotAudioNode'

const defaultProps = {
    threshold: -24,
    ratio: 12,
    knee: 30,
    attack: 0.003,
    release: 0.25,
}

/**
 * A Node used to reduce the dynamic range of a signal.
 * Wrapper class for the native Compressor audio node.
 *
 * @example
 * const synth = new Dot.PolySynth(AC)
 * const chorus = new Dot.Chorus(AC, { amount: 0.4 })
 * const compressor = new Dot.Compressor(AC, { threshold: -32, ratio: 8 })
 *
 * Dot.chain(synth, chorus, compressor, AC.destination)
 *
 * @extends DotAudioNode
 * @param {AudioContext} AC - Audio context
 * @param {Object} opts - Initialization options
 * @param {Number} opts.threshold - Initial compression threshold in dB
 * @param {Number} opts.ratio - Initial compression ratio
 * @param {Number} opts.knee - Initial compression knee value
 * @param {Number} opts.attack - Initial compression attack time
 * @param {Number} opts.release - Initial compression release time
 * @params
 * threshold - Compressor threshold
 * ratio - Compressor ratio
 * knee - Compressor knee value
 * attack - Compressor attack time
 * release - Compressor release time
 * @returns {Compressor} Compressor Node
 */
class Compressor extends DotAudioNode {
    constructor(AC, opts = {}) {
        super(AC)
        this.name = 'Compressor'
        this.compressor = this.AC.createDynamicsCompressor()

        this.params = {
            threshold: this.compressor.threshold,
            ratio: this.compressor.ratio,
            knee: this.compressor.knee,
            attack: this.compressor.attack,
            release: this.compressor.release,
        }
        this.inputs = [this.compressor]
        this.outputs = [this.compressor]

        // Initialize
        const initProps = { ...defaultProps, ...opts }

        this.setThreshold(initProps.threshold)
        this.setRatio(initProps.ratio)
        this.setKnee(initProps.knee)
        this.setAttack(initProps.attack)
        this.setRelease(initProps.release)
    }

    // - Getters -
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
     * Get the current knee value.
     * @returns {Number}
     */
    getKnee = () => this.params.knee.value

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
    getReduction = () => this.compressor.reduction

    // - Setters -
    /**
     * Set the threshold.
     * Uses timeUpdate method to allow for changes over time.
     * @param {Number} val - target value
     * @param {Number} [time] - update time in seconds (optional)
     * @returns
     */
    setThreshold = (val, time) => this._timeUpdate(this.params.threshold, val, time)

    /**
     * Set the compression ratio.
     * Uses timeUpdate method to allow for changes over time.
     * @param {Number} val - target value
     * @param {Number} [time] - update time in seconds (optional)
     * @returns
     */
    setRatio = (val, time) => this._timeUpdate(this.params.ratio, val, time)

    /**
     * Set the knee value.
     * Uses timeUpdate method to allow for changes over time.
     * @param {Number} val - target value
     * @param {Number} [time] - update time in seconds (optional)
     * @returns
     */
    setKnee = (val, time) => this._timeUpdate(this.params.knee, val, time)

    /**
     * Set the attack time.
     * @param {Number} val - target value
     * @param {Number} [time] - update time in seconds (optional)
     * @returns
     */
    setAttack = (val, time) => this._timeUpdate(this.params.attack, val, time)

    /**
     * Set the release time.
     * @param {Number} val - target value
     * @param {Number} [time] - update time in seconds (optional)
     * @returns
     */
    setRelease = (val, time) => this._timeUpdate(this.params.release, val, time)
}

export default Compressor
