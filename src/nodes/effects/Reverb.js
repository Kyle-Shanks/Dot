import DotAudioNode from 'nodes/core/DotAudioNode'
import Gain from 'nodes/core/Gain'
import Convolver from 'nodes/core/Convolver'
import reverbBase64 from 'src/util/reverbBase64String'
import { base64ToArrayBuffer } from 'src/util/util'

const defaultProps = {
    amount: 0,
    buffer: null,
    normalize: false,
}

/**
 * A convolusion reverb effect to adds width and space effects to the incoming signal.
 *
 * @extends DotAudioNode
 * @param {AudioContext} AC - Audio context
 * @param {Object} opts - Initialization options
 * @param {Number} opts.amount - The dry/wet amount of the node
 * @param {AudioBuffer} opts.buffer - The buffer value of the convolver node
 * @param {Boolean} opts.normalize - The normalize value of the convolver node
 * @returns {Reverb} Reverb Node
 */
class Reverb extends DotAudioNode {
    constructor(AC, opts = {}) {
        super(AC)
        this.name = 'Reverb'
        this.dryGain = new Gain(this.AC)
        this.convolver = new Convolver(this.AC)
        this.wetGain = new Gain(this.AC)

        this.amount = 0
        this.params = {}
        this.inputs = [this.dryGain, this.convolver]
        this.outputs = [this.dryGain, this.wetGain]

        // Initialize
        const initProps = { ...defaultProps, ...opts }

        this.setAmount(initProps.amount)
        this.setBuffer(initProps.buffer)
        this.setNormalize(initProps.normalize)

        // Load default buffer if none
        if (!this.getBuffer()) {
            this.AC.decodeAudioData(
                base64ToArrayBuffer(reverbBase64),
                buffer => this.setBuffer(buffer),
                e => console.error('Error decoding reverb data: ' + e.err)
            )
        }

        // Connections
        this.convolver.connect(this.wetGain)
    }

    // - Getters -
    /**
     * Get the dry/wet amount of the node.
     * @returns {Number} Dry/set amount
     */
    getAmount = () => this.amount

    /**
     * Get the current audio buffer of the convolver node.
     * @returns {AudioBuffer} Audio buffer
     */
    getBuffer = () => this.convolver.getParams().buffer

    /**
     * Get the current normalize value of the convolver node.
     * @returns {Boolean} Normalize value
     */
    getNormalize = () => this.convolver.getParams().normalize

    // - Setters -
    /**
     * Set the dry/wet amount of the node.
     * Uses dryWetUpdate method to allow for changes over time.
     * @param {Number} val - Dry/set amount
     * @param {Number} [time] - update time in seconds (optional)
     * @returns
     */
    setAmount = (val, time) => {
        this.amount = val
        this._dryWetUpdate(
            this.dryGain.getParams().gain,
            this.wetGain.getParams().gain,
            val,
            time,
        )
    }

    /**
     * Set the audio buffer of the convolver node.
     * Calls the setBuffer method on the convolver node.
     * @param {AudioBuffer} val - Audio buffer
     * @returns
     */
    setBuffer = (val) => this.convolver.setBuffer(val)

    /**
     * Set the normalize value of the convolver node.
     * Calls the setNormalize method on the convolver node.
     * @param {Boolean} val - Normalize value
     * @returns
     */
    setNormalize = (val) => this.convolver.setNormalize(val)
}

export default Reverb
