import DotAudioNode from '../DotAudioNode.js'

class Source extends DotAudioNode {
    constructor(AC) {
        super(AC)
        this.name = 'Source'
        this.source = this.AC.createConstantSource()

        this.params = {}
    }

    start = () => this.source.start()
    start = () => this.source.stop()

    // Getters
    getOutputs = () => [this.source]
}

export default Source
