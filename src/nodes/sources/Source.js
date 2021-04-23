import DotAudioNode from '../DotAudioNode.js'

class Source extends DotAudioNode {
    constructor(AC) {
        super(AC)
        this.name = 'Source'
        this.source = this.AC.createConstantSource()

        this.params = {
            offset: this.source.offset,
        }
    }

    start = () => this.source.start()
    stop = () => this.source.stop()

    // Getters
    getOutputs = () => [this.source]
    getOffset = () => this.params.offset

    // Setters
    setOffset = (val, time) => this._timeUpdate(this.params.offset, val, time)
}

export default Source
