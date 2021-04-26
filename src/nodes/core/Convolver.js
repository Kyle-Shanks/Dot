import DotAudioNode from '../DotAudioNode.js'

const defaultProps = {
    buffer: null,
    normalize: false,
}

class Convolver extends DotAudioNode {
    constructor(AC, opts = {}) {
        super(AC)
        this.name = 'Convolver'
        this.convolver = this.AC.createConvolver()

        this.params = {}

        // Initialize
        const initProps = {
            ...defaultProps,
            ...opts,
        }

        this.setBuffer(initProps.buffer)
        this.setNormalize(initProps.normalize)
    }

    // - Getters -
    getInputs = () => [this.convolver]
    getOutputs = () => [this.convolver]

    getBuffer = () => this.convolver.buffer
    getNormalize = () => this.convolver.normalize

    // - Setters -
    setBuffer = (val) => this.convolver.buffer = val
    setNormalize = (val) => this.convolver.normalize = val
}

export default Convolver
