import DotAudioNode from '../DotAudioNode.js'

class Convolver extends DotAudioNode {
    constructor(AC) {
        super(AC)
        this.name = 'Convolver'
        this.convolver = this.AC.createConvolver()

        this.params = {}
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
