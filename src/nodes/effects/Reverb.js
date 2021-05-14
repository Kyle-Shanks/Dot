import DotAudioNode from 'nodes/core/DotAudioNode'
import Gain from 'nodes/core/Gain'
import Convolver from 'nodes/core/Convolver'
import ChannelMerger from 'nodes/core/ChannelMerger'
import NoiseGenerator from 'nodes/sources/NoiseGenerator'

const defaultProps = {
    amount: 0,
    buffer: null,
    normalize: false,
}

/**
 * A convolusion reverb effect to adds width and space effects to the incoming signal.
 * A default impulse response will be generated if one is not provided.
 *
 * @extends DotAudioNode
 * @param {AudioContext} AC - Audio context
 * @param {Object} opts - Initialization options
 * @param {Number} opts.amount - The dry/wet amount of the node (default: 0)
 * @param {AudioBuffer} opts.buffer - The buffer value of the convolver node (default: null)
 * @param {Boolean} opts.normalize - The normalize value of the convolver node (default: false)
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

        // Generate a default buffer if one is not provided
        if (!this.getBuffer()) this._generateBuffer()

        // Connections
        this.convolver.connect(this.wetGain)
    }

    // --- Public Methods ---
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
     */
    setBuffer = (val) => this.convolver.setBuffer(val)

    /**
     * Set the normalize value of the convolver node.
     * Calls the setNormalize method on the convolver node.
     * @param {Boolean} val - Normalize value
     */
    setNormalize = (val) => this.convolver.setNormalize(val)

    // --- Private Methods ---
    // Generate a default buffer
    _generateBuffer = () => {
        const preDelay = 0.01
        const decay = 0.5
        const sampleRate = 44100

        // Use noise generators to create the impulse
        const context = new OfflineAudioContext(2, (preDelay + decay) * 5 * sampleRate, sampleRate)
        const noiseL = new NoiseGenerator(context, { start: true })
        const noiseR = new NoiseGenerator(context, { start: true })
        const channelMerger = new ChannelMerger(context)
        const gain = new Gain(context)

        noiseL.connect(channelMerger, 0, 0)
        noiseR.connect(channelMerger, 0, 1)
        channelMerger.connect(gain)
        gain.connect(context.destination)

        // Set envelope for the gain node
        gain.getParams().gain.setValueAtTime(0, context.currentTime)
        gain.getParams().gain.setTargetAtTime(0.05, context.currentTime, preDelay)
        gain.getParams().gain.setTargetAtTime(0, context.currentTime + preDelay, decay)

        // render and set the buffer
        context.startRendering().then((buffer) => this.setBuffer(buffer))
    }
}

export default Reverb
