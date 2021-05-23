import DotAudioNode from 'nodes/core/DotAudioNode'

const defaultProps = {
    buffer: null,
    normalize: false,
}

/**
 * Wrapper class for the native Convolver audio node.
 *
 * For more information, refer to the web audio api documentation.
 * (https://developer.mozilla.org/en-US/docs/Web/API/ConvolverNode)
 *
 * @example
 * const convolver = new Dot.Convolver(AC, { buffer: impulseResponseBuffer })
 *
 * @extends DotAudioNode
 * @param {AudioContext} AC - Audio context
 * @param {Object} opts - Initialization options
 * @param {AudioBuffer} opts.buffer - Audio buffer containing the impulse response (default: null)
 * @param {Boolean} opts.normalize - Setting to determine whether to scale the buffer by an equal-power normalization when it is set (default: false)
 * @returns {Convolver} Convolver Node
 */
class Convolver extends DotAudioNode {
    constructor(AC, opts = {}) {
        super(AC)
        this.name = 'Convolver'
        this.convolver = this.AC.createConvolver()

        this.params = {}
        this.inputs = [this.convolver]
        this.outputs = [this.convolver]

        // Initialize
        const initProps = { ...defaultProps, ...opts }

        this.setBuffer(initProps.buffer)
        this.setNormalize(initProps.normalize)
    }

    // - Getters -
    /**
     * Get the current buffer value.
     * @returns {AudioBuffer}
     */
    getBuffer = () => this.convolver.buffer

    /**
     * Get the current normalize value.
     * @returns {Boolean}
     */
    getNormalize = () => this.convolver.normalize

    // - Setters -
    /**
     * Set the convolver's buffer.
     * @param {AudioBuffer} val - buffer
     */
    setBuffer = (val) => this.convolver.buffer = val
    /**
     * Sets the normalize value.
     * @param {Boolean} val - normalize value
     */
    setNormalize = (val) => this.convolver.normalize = val
}

export default Convolver
