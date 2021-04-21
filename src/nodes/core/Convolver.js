import DotAudioNode from '../DotAudioNode.js'

class Convolver extends DotAudioNode {
    constructor(AC) {
        super(AC)
        this.name = 'Convolver'
        this.convolver = this.AC.createConvolver()

        this.params = {
            buffer: this.convolver.buffer,
            normalize: this.convolver.normalize,
        }
    }

    // Getters
    getInputs = () => [this.convolver]
    getOutputs = () => [this.convolver]

    getBuffer = () => this.params.buffer
    getNormalize = () => this.params.normalize

    // Setters
    setBuffer = (val) => {
        this.convolver.buffer = val
        this.params.buffer = val
    }
    setNormalize = (val) => {
        this.convolver.normalize = val
        this.params.normalize = val
    }
}

export default Convolver
