import DotAudioNode from 'nodes/core/DotAudioNode'

const defaultProps = {
    pan: 0,
}

/**
 * A Node used to adjust the pan of the incoming signal.
 * Wrapper class for the native StereoPanner audio node.
 *
 * @example
 * const synth = new Dot.Synth(AC)
 * const panner = new Dot.StereoPanner(AC, { pan: 0.5 })
 *
 * Dot.chain(synth, panner, AC.destination)
 *
 * @extends DotAudioNode
 * @param {AudioContext} AC - Audio context
 * @param {Object} opts - Initialization options
 * @param {Number} opts.pan - Pan value [-1 for full left pan, 1 for full right pan] (default: 0)
 * @params
 * pan - Node pan value
 * @returns {Pan} Pan Node
 */
class StereoPanner extends DotAudioNode {
    constructor(AC, opts = {}) {
        super(AC)
        this.name = 'StereoPanner'
        this.panner = this.AC.createStereoPanner()

        this.params = {
            pan: this.panner.pan,
        }
        this.inputs = [this.panner]
        this.outputs = [this.panner]

        // Initialize
        const initProps = { ...defaultProps, ...opts }

        this.setPan(initProps.pan)
    }

    // - Getters -
    /**
     * Get the current pan value.
     * @returns {Number} Pan value
     */
    getPan = () => this.params.pan.value

    // - Setters -
    /**
     * Set the pan of the node.
     * Uses timeUpdate method to allow for changes over time.
     * @param {Number} val - New pan value
     * @param {Number} [time] - update time in seconds (optional)
     */
    setPan = (val, time) => this._timeUpdate(this.params.pan, val, time)
}

export default StereoPanner
